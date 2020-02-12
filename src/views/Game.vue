<template>
    <v-container fill-height class="pa-0">
        <NavigationBar v-if="!loading" style="position: fixed; top: 0; width: 100%"></NavigationBar>
        <LoadingScreen v-if="loading"></LoadingScreen>
        <v-row v-if="!loading" justify="center" align="center" class="ma-0">
            <div style="width: 2em" >
                <v-btn icon v-if="actualQuestion > 0" @click.stop="actualQuestion--">
                    <v-icon size="2em">mdi-chevron-left</v-icon>
                </v-btn>
            </div>
            <div style="width: 80%" class="blue-background">
                <div class="animated-background">
                    <v-card class="text-center overlay" min-height="70vh">
                        <v-row justify="center" v-if="questions.length > 0">
                            <v-card-title>{{questions[actualQuestion].Katalog}}</v-card-title>
                        </v-row>
                        <v-divider v-if="questions.length > 0"></v-divider>
                        <v-row style="height: 40vh" align="center" v-if="questions.length > 0">
                            <v-card-text><strong>{{questions[actualQuestion].Frage}}</strong></v-card-text>
                        </v-row>
                        <v-row justify="center" v-if="questions.length == 0">
                            <v-card-title>Nope</v-card-title>
                        </v-row>
                        <v-divider v-if="questions.length == 0"></v-divider>
                        <v-row style="height: 40vh" align="center" v-if="questions.length == 0">
                            <v-card-text><strong>Du hast keine Sammlungen ausgewählt</strong></v-card-text>
                        </v-row>
                    </v-card>
                </div>
            </div>
            <div style="width: 2em">
                <v-btn icon @click.stop="actualQuestion++">
                    <v-icon size="2em">mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-container>


</template>

<script>
    import NavigationBar from "../components/NavigationBar";
    import LoadingScreen from "../components/LoadingScreen";
    import firebase from 'firebase';
    import {db} from '@/main';

    export default {
        name: "Game",
        components: {
            NavigationBar,
            LoadingScreen
        },
        data: function() {
            return {
                loading: true,
                questions: [],
                actualQuestion: 0,
                ownQuestions: [],
                ownQuestionsChecked: []
            }
        },
        methods: {
            fetchData: function() {
                let self = this;
                firebase.auth();
                db.collection('Fragen').get().then((res) => {
                    for(let i in res.docs){
                        switch (res.docs[i].data().Katalog) {
                            case 'Auf der Bettkannte':{
                                if(localStorage.getItem('AufDerBettkannte') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            case 'Kontrolllisten':{
                                if(localStorage.getItem('Kontrollliste') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            case 'Entweder oder':{
                                if(localStorage.getItem('EntwederOder') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            case 'Beziehungsfragen':{
                                if(localStorage.getItem('Beziehungsfragen') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            case 'Das Leben ist kurz':{
                                if(localStorage.getItem('DasLebenIstKurz') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            case 'Körper und Seele':{
                                if(localStorage.getItem('KoerperUndSeele') === 'true'){
                                    self.questions.push(res.docs[i].data());
                                }
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                    self.randomize();
                    self.loading = false;
                    self.getOwnQuestions();
                })
            },
            getOwnQuestions() {
                let self = this;
                let ownCollection = JSON.parse(localStorage.getItem('collections'));
                let ownCollectionChecked = JSON.parse(localStorage.getItem('collectionsChecked'));
                firebase.auth();
                if(ownCollection){
                    for(let c of ownCollectionChecked){
                        if(c){
                            for(let i in ownCollection){
                                db.collection('UserFragen').doc(ownCollection[i]).collection('Fragen').get().then((res) => {
                                    for(let x of res.docs){
                                        self.questions.push(x.data());
                                    }
                                })
                            }
                        }
                    }
                }

                self.randomize();
                self.loading = false;

            },
            randomize: function() {
                let temp = this.questions;
                for(let i = this.questions.length; i >= 0; i--){
                    let randomNumber = this.getRandomNumber(this.questions.length);
                    temp.push(this.questions[randomNumber]);
                    this.questions.splice(randomNumber, 1);
                }
                this.questions = temp;
            },
            getRandomNumber: function(max){
                return Math.floor(Math.random() * max);
            },
            navigateTo(destiny){
                this.$emit('navigate-to', destiny);
            }
        },
        mounted() {
            this.fetchData();
        },
        watch: {
            actualQuestion: function() {
                if(this.actualQuestion === this.questions.length){
                    this.randomize();
                    this.actualQuestion = 0;
                }
            }
        }
    }
</script>

<style scoped>
    .animated-background{
        background-color: #6394f7;
        background: url("../assets/penguins.gif");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: bottom;
    }
    .overlay{
        background: rgba(255, 255, 255, 0.5);
    }
    .blue-background{
        background-color: #6394f7;
    }
</style>