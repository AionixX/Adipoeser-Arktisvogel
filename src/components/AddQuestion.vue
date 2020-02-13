<template>
    <v-container class="overlay fill-height justify-center" ripple>
        <v-card style="z-index: 10; border-radius: 1em">
            <v-card-title style="background: #6394f7; color: white">Neue Frage hinzufügen</v-card-title>
            <v-card-text class="pb-0 mt-4">
                <v-row>
                    <v-text-field v-model="question" dense outlined label="Frage"></v-text-field>
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
        name: "AddQuestion",
        data: function() {
            return {
                question: null,
                showSnackbar: null,
                timeout: 2000,
                message: null,
                msgColor: 'green',
            }
        },
        props: {
            id: String
        },
        methods: {
            safe() {
                if(this.question != null){
                    let self = this;
                    firebase.auth();
                    db.collection('UserFragen').doc(self.id).get().then((res) => {
                        db.collection('UserFragen').doc(self.id).collection('Fragen').add({
                            Frage: self.question,
                            Katalog: res.data().name
                        }).then(() => {
                            self.question = null;
                            self.message = 'Frage erfolgreich erstellt'
                            self.showSnackbar = true;
                            self.$emit('safe');
                        })
                    }).catch((err) => {
                        self.message = err.message;
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