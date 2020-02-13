<template>
    <v-container fill-height class="justify-center">
        <NavigationBar style="position: fixed; top: 0; width: 100vw; left: 0; right: 0"></NavigationBar>
        <v-row justify="center" class="mt-0">
            <v-col cols="12">
                <v-row justify="center" class="ma-0">
                    <v-col cols="10" style="background-color: white; border-radius: 2em">
                        <h1>Sammlungen</h1>
                        <v-checkbox dense v-model="AufDerBettkannte" label="Auf der Bettkannte" class="ma-0 pa-0 mt-2" @change="changeOwn"></v-checkbox>
                        <v-checkbox dense v-model="Kontrollliste" label="Kontrollliste" class="ma-0 pa-0" @change="changeOwn"></v-checkbox>
                        <v-checkbox dense v-model="EntwederOder" label="Entweder oder" class="ma-0 pa-0" @change="changeOwn"></v-checkbox>
                        <v-checkbox dense v-model="Beziehungsfragen" label="Beziehungsfragen" class="ma-0 pa-0" @change="changeOwn"></v-checkbox>
                        <v-checkbox dense v-model="DasLebenIstKurz" label="Das Leben ist kurz" class="ma-0 pa-0" @change="changeOwn"></v-checkbox>
                        <v-checkbox dense v-model="KoerperUndSeele" label="Körper und Seele" class="ma-0 pa-0" @change="changeOwn"></v-checkbox>
                    </v-col>
                </v-row>
                <v-divider class="ma-4"></v-divider>
                <v-row justify="center">
                    <v-col cols="10" style="background-color: white; border-radius: 2em">
                        <h2 class="mb-2">Eigene Sammlungen</h2>
                        <v-row v-for="(col, index) in ownCollection" :key="index" justify="center" align="center">
                            <v-col cols="10" class="pa-0">
                                <v-checkbox dense v-model="ownCollectionChecked[index]" :label="ownCollectionNames[index]" @change="change" class="ma-0 pa-0 mt-0"></v-checkbox>
                            </v-col>
                            <v-col cols="2" class="pa-0">
                                <v-btn icon @click.stop="navigateTo(ownCollection[index])">
                                    <v-icon>mdi-settings</v-icon>
                                </v-btn>
                            </v-col>
                            <v-divider></v-divider>
                        </v-row>
                        <span v-if="ownCollection == null || ownCollection.length === 0" style="color: gray; font-size: 0.8em">Leider hast du noch keine eigenen Sammlungen...</span>
                        <v-divider></v-divider>
                        <v-btn text style="width: 90%" class="mt-2" @click.stop="showAddCollection = true">
                            <v-icon class="mr-2">mdi-plus-circle</v-icon>
                            <span>Hinzufügen</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <AddCollection v-if="showAddCollection" @safe="getCollections" @close="showAddCollection = false"></AddCollection>
    </v-container>
</template>

<script>
    import NavigationBar from '../components/NavigationBar';
    import AddCollection from "../components/AddCollection";
    import {db} from '@/main';
    import firebase from 'firebase';

    export default {
        name: "Collections",
        components:{
            NavigationBar,
            AddCollection
        },
        data: function(){
            return {
                AufDerBettkannte: true,
                Kontrollliste: true,
                EntwederOder: true,
                Beziehungsfragen: true,
                DasLebenIstKurz: true,
                KoerperUndSeele: true,
                ownCollection: [],
                ownCollectionNames: [],
                ownCollectionChecked: [],
                showAddCollection: false
            }
        },
        methods: {
            getCollections: function() {
                //localStorage.clear();
                this.ownCollection = JSON.parse(localStorage.getItem('collections'));
                this.ownCollectionChecked = JSON.parse(localStorage.getItem('collectionsChecked'));
                this.getNames();
            },
            change: function() {
                localStorage.setItem('collectionsChecked', JSON.stringify(this.ownCollectionChecked));
            },
            changeOwn: function() {
                localStorage.setItem('AufDerBettkannte', this.AufDerBettkannte + '');
                localStorage.setItem('Kontrollliste', this.Kontrollliste + '');
                localStorage.setItem('EntwederOder', this.EntwederOder + '');
                localStorage.setItem('Beziehungsfragen', this.Beziehungsfragen + '');
                localStorage.setItem('DasLebenIstKurz', this.DasLebenIstKurz + '');
                localStorage.setItem('KoerperUndSeele', this.KoerperUndSeele + '');
            },
            load: function() {
                if(localStorage.getItem('AufDerBettkannte') == null){
                    localStorage.setItem('AufDerBettkannte', 'true');
                }else{
                    this.AufDerBettkannte = localStorage.getItem('AufDerBettkannte') == 'true';
                }
                if(localStorage.getItem('Kontrollliste') == null){
                    localStorage.setItem('Kontrollliste', 'true');
                }else{
                    this.Kontrollliste = localStorage.getItem('Kontrollliste') == 'true'
                }
                if(localStorage.getItem('EntwederOder') == null){
                    localStorage.setItem('EntwederOder', 'true');
                }else {
                    this.EntwederOder = localStorage.getItem('EntwederOder') == 'true'
                }
                if(localStorage.getItem('Beziehungsfragen') == null){
                    localStorage.setItem('Beziehungsfragen', 'true');
                }else {
                    this.Beziehungsfragen = localStorage.getItem('Beziehungsfragen') == 'true'
                }
                if(localStorage.getItem('DasLebenIstKurz') == null){
                    localStorage.setItem('DasLebenIstKurz', 'true');
                }else {
                    this.DasLebenIstKurz = localStorage.getItem('DasLebenIstKurz') == 'true'
                }
                if(localStorage.getItem('KoerperUndSeele') == null){
                    localStorage.setItem('KoerperUndSeele', 'true');
                }else {
                    this.KoerperUndSeele = localStorage.getItem('KoerperUndSeele') == 'true'
                }
            },
            getNames: function(){
                let self = this;
                self.ownCollectionNames = [];
                for(let i in this.ownCollection){
                    firebase.auth();
                    db.collection('UserFragen').doc(self.ownCollection[i]).get().then((res)=> {
                        self.ownCollectionNames.push(res.data().name)
                    })
                }
            },
            navigateTo(id){
                this.$router.push({name: 'CollectionView', params: {collectionID: id}});
            }
        },
        mounted() {
            this.getCollections();
            this.load();
        },
        computed: {

        }
    }
</script>

<style scoped>

</style>