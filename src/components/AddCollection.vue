<template>
    <v-container class="overlay fill-height justify-center" ripple>
        <v-card style="z-index: 10">
            <v-card-title style="background: #6394f7">Neue Sammlung hinzufügen</v-card-title>
            <v-card-text class="pb-0 mt-4">
                <v-row>
                    <v-text-field v-model="name" dense outlined label="Name der neuen Sammlung"></v-text-field>
                </v-row>
                <v-row align="center">
                    <v-divider></v-divider>
                    <span class="ml-4 mr-4">Oder</span>
                    <v-divider></v-divider>
                </v-row>
                <v-row class="mt-6">
                    <v-text-field v-model="code" dense outlined label="Gib einen Code ein"></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-center mt-0">
                <v-btn color="error" style="color: white" @click.stop="close">
                    Abbrechen
                </v-btn>
                <v-btn color="black" style="color: white" @click.stop="safe">
                    Speichern
                </v-btn>

            </v-card-actions>
        </v-card>
        <v-snackbar absolute bottom v-model="showSnackbar" :timeout="timeout" :color="msgColor">{{message}}</v-snackbar>
    </v-container>
</template>

<script>
    import {db} from '@/main';
    import firebase from 'firebase';

    export default {
        name: "AddCollection",
        data: function() {
            return {
                name: null,
                code: null,
                showSnackbar: null,
                timeout: 2000,
                message: null,
                msgColor: 'green'
            }
        },
        methods: {
            safe() {
                if(this.code != null){
                    let self = this;
                    firebase.auth();
                    db.collection('UserFragen').doc(this.code).get().then((res) => {
                        self.add(res.id);
                        this.name = null;
                        this.code = null;
                        this.$emit('safe');
                        this.close();
                    }).catch(() => {
                        self.message = 'Der angegebene Code konnte nicht gefunden werden';
                        self.msgColor = 'error';
                        self.showSnackbar = true;
                    })
                }else if(this.name != null) {
                    let self = this;
                    firebase.auth();
                    db.collection('UserFragen').add({
                        name: this.name
                    }).then((res) => {
                        self.add(res.id);
                        this.name = null;
                        this.code = null;
                        this.$emit('safe');
                        this.close();
                    }).catch(() => {
                        self.message = 'Ups da ist etwas schiefgelaufen';
                        self.msgColor = 'error';
                        self.showSnackbar = true;
                    })
                }
            },
            add: function(id){
                let temp = JSON.parse(localStorage.getItem('collections'));
                let tempChecked = JSON.parse(localStorage.getItem('collectionsChecked'));

                if(temp == null){
                    temp = [id];
                    tempChecked = [true];
                }else {
                    temp.push(id);
                    tempChecked.push(true);
                }
                localStorage.setItem('collections', JSON.stringify(temp));
                localStorage.setItem('collectionsChecked', JSON.stringify(tempChecked));

                this.message = 'Die Sammlung wurde erfolgrech erstellt';
                this.msgColor = 'success';
                this.showSnackbar = true;
            },
            close() {
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(50, 50, 50, 0.5);
    }
    .v-text-field__details {
        display: none !important;
    }
</style>