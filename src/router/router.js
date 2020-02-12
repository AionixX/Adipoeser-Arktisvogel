import Vue from 'vue';
import VueRouter from 'vue-router';
import Start from '../views/Start';
import Game from "../views/Game";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/views/Start',
            name: 'Start',
            component: Start
        },
        {
            path: '/views/Game',
            name: 'Game',
            component: Game
        },
        {
            path: '*',
            redirect: '/views/Start'
        }
    ]
})