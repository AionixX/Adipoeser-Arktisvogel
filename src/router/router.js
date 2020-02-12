import Vue from 'vue';
import VueRouter from 'vue-router';
import Start from '../views/Start';
import Game from "../views/Game";
import Collections from "../views/Collections";
import CollectionView from "../views/CollectionView";

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
            path: '/views/Collections',
            name: 'Collections',
            component: Collections
        },
        {
            path: '/views/CollectionView',
            name: 'CollectionView',
            component: CollectionView
        },
        {
            path: '*',
            redirect: '/views/Start'
        }
    ]
})