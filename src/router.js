import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Draft from './views/Draft.vue';
import {store, constants} from '../src/state/';

const {AUTH_ROLES} = constants;

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: authCheck(AUTH_ROLES.user)
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        beforeEnter: authCheck(AUTH_ROLES.user)
    },
    {
        path: '/draft',
        name: 'draft',
        component: Draft,
        beforeEnter: authCheck(AUTH_ROLES.user)
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

export default new Router({
    routes,
    mode: 'history'
});

// no need for `beforeEnter` on un-authenticated routes
export function authCheck (minimumRole = AUTH_ROLES.user) {
    return (to, from, next) => {
        const {user} = store.state.auth;

        if (user.role === AUTH_ROLES.unauthenticated) {
            return next('/login');
        }

        if (minimumRole > user.role) {
            return next('/unauthorized');
        }

        return next();
    };
}
