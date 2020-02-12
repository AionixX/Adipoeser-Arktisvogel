<template>
    <v-toolbar dense class="background" color="#3C9FE8">
        <v-toolbar-title>
            <v-img v-ripple src="../assets/pinguin-logo.svg" aspect-ratio="1" contain width="2em" @click.stop="navigateTo('Start')"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title>
            Adipöser Arktisvogel
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon v-if="false">mdi-menu</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "NavigationBar",
        methods: {
            navigateTo(destiny){
                this.$emit('navigate-to', destiny)
            }
        }
    }
</script>

<style scoped>
</style>