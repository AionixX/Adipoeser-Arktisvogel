<template>
    <v-row justify="center">
        <NavigationBar style="width: 100vw"></NavigationBar>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center" style="color: white">{{name}}</h1>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-card style="width: 90vw; border-radius: 1em">
                <v-row justify="center">
                    <v-col cols="11">
                        <v-card class="ma-1" style="border-radius: 1em">
                            <v-row justify="center" align="center">
                                <v-col cols="10" class="pa-0">
                                    <v-card-text>
                                        <strong>Sammlungs ID: {{collectionID}}</strong>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon color="black" width="1" v-clipboard:copy="collectionID" v-clipboard:success="copy" v-clipboard:error="copyError">
                                        <v-icon>
                                            mdi-content-copy
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-divider class="ma-4"></v-divider>
                        <v-card v-for="(card, index) in questions" :key="index" class="ma-1" style="border-radius: 1em">
                            <v-row justify="center" align="center">
                                <v-col cols="10" class="pa-0">
                                    <v-card-text >
                                        {{questions[index]}}
                                    </v-card-text>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn icon color="error" width="1" @click.stop="deleteQuestion(index)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn icon color="error" @click.stop="deleteCollection">
                        <v-icon>
                            mdi-delete
                        </v-icon>
                        <span>Sammlung Löschen</span>
                    </v-btn>
                </v-row>
            </v-card>
        </v-row>
        <v-btn icon class="fixed" @click.stop="add = true">
            <v-icon size="4em" color="white">
                mdi-plus-circle
            </v-icon>
        </v-btn>
        <AddQuestion v-if="add" @close="add = false" :id="this.$route.params.collectionID" @safe="getQuestions"></AddQuestion>
        <v-snackbar style="color: white" :color="snackBarColor" :timeout="timeout" v-model="snackBar">{{snackBarMessage}}</v-snackbar>
    </v-row>
</template>

<script>
    import firebase from "firebase";
    import {db} from '@/main';
    import NavigationBar from "../components/NavigationBar";
    import AddQuestion from "../components/AddQuestion";

    export default {
        name: "CollectionView",
        components:{
            NavigationBar,
            AddQuestion
        },
        data: function() {
            return {
                name: null,
                questions: [],
                questionID: [],
                add: false,
                collectionID: this.$route.params.collectionID,
                snackBarColor: 'success',
                snackBar: false,
                snackBarMessage: null,
                timeout: 2000
            }
        },
        methods: {
            getName: function(){
                let self = this;
                firebase.auth();
                db.collection('UserFragen').doc(self.$route.params.collectionID).get().then((res)=> {
                    self.name = res.data().name;
                })
            },
            getQuestions: function(){
                let self = this;
                firebase.auth();
                self.questions = [];
                self.questionID = [];
                db.collection('UserFragen').doc(self.$route.params.collectionID).collection('Fragen').get().then((res) => {
                    for(let i in res.docs){
                        self.questions.push(res.docs[i].data().Frage)
                        self.questionID.push(res.docs[i].id)
                    }
                }).catch((err) => {
                    self.message = err.message;
                    self.msgColor = 'error';
                    self.showSnackbar = true;
                })
            },
            deleteQuestion: function(index) {
                let self = this;
                firebase.auth();
                db.collection('UserFragen').doc(self.$route.params.collectionID).collection('Fragen').doc(self.questionID[index]).delete();
                self.questions.splice(index, 1);
                self.questionID.splice(index,1);
            },
            deleteCollection: function() {
                let self = this;
                firebase.auth();
                //db.collection('UserFragen').doc(self.$route.params.collectionID).delete();
                let collection = JSON.parse(localStorage.getItem('collections'));
                let collectionChecked = JSON.parse(localStorage.getItem('collectionsChecked'));
                let tempIndex = null;
                for(let i in collection){
                    if(collection[i] == self.$route.params.collectionID){
                        tempIndex = i;
                    }
                }
                collection.splice(tempIndex, 1);
                collectionChecked.splice(tempIndex, 1);
                localStorage.setItem('collections', JSON.stringify(collection));
                localStorage.setItem('collectionsChecked', JSON.stringify(collectionChecked));
                this.$router.go(-1);
            },
            copy: function() {
                this.snackBarMessage = 'Code wurde in der Zwischenablage gespeichert';
                this.snackBarColor = 'success';
                this.snackBar = true;
            },
            copyError: function(e) {
                this.snackBarMessage = 'Upsda ist ein Fehler aufgetreten: ' + e.text;
                this.snackBarColor = 'error';
                this.snackBar = true;
            }
        },
        mounted() {
            this.getName();
            this.getQuestions();
        }
    }
</script>

<style scoped>
    .fixed{
        position: fixed;
        bottom: 2em;
    }
</style>