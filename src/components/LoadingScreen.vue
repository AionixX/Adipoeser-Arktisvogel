<template>
    <v-container fluid style="height: 100vh">
            <v-row justify="center" align="center" style="height: 100%">
                <v-col cols="12" class="text-center">
                    <v-progress-circular size="100" indeterminate class="ma-10"></v-progress-circular><br>
                    <span>Laden...</span>
                </v-col>
            </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "LoadingScreen"
    }
</script>

<style scoped>
</style>