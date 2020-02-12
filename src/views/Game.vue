<template>
    <v-container fill-height class="pa-0">
        <NavigationBar v-if="!loading" style="position: fixed; top: 0; width: 100%" @navigate-to="navigateTo"></NavigationBar>
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
                        <v-row justify="center">
                            <v-card-title>{{questions[actualQuestion].Katalog}}</v-card-title>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row style="height: 40vh" align="center">
                            <v-card-text><strong>{{questions[actualQuestion].Frage}}</strong></v-card-text>
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
                actualQuestion: 0
            }
        },
        methods: {
            fetchData: function() {
                let self = this;
                firebase.auth();
                db.collection('Fragen').get().then((res) => {
                    for(let i in res.docs){
                        self.questions.push(res.docs[i].data());
                    }
                    self.randomize();
                    self.loading = false;
                })
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