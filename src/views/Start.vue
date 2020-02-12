<template>
    <v-container fluid class="fill-height">
        <LoadingScreen v-if="!ready"></LoadingScreen>
        <v-row v-if="ready" justify="center" class="ma-12">
            <v-col cols="12" class="mt-n12">
            </v-col>
            <v-col cols="12" class="mt-n12">
                <v-img src="../assets/pinguin-logo.svg" aspect-ratio="1" contain></v-img>
            </v-col>
            <v-col cols="12" class="text-center mt-12">
                <v-btn color="black" class="white--text font-weight-bold" width="10em" height="3em" to="Game">
                    Start
                </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-btn color="black" class="white--text font-weight-bold" width="10em" height="3em" to="Collections">
                    Sammlungen
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LoadingScreen from "../components/LoadingScreen";

    export default {
        name: "Start",
        data:() => ({
            ready: false
        }),
        components: {
            LoadingScreen
        },
        methods: {
            navigateTo(destiny){
                this.$router.push(destiny);
            }
        },
        mounted() {
            this.ready = true;
        }
    }
</script>

<style scoped>

</style>