import fetch from '@/utils/fetch';
import {AUTH_ROLES} from '../constants';

const {atob, localStorage} = window;

export const decodeJwt = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(atob(base64));
};

export const state = {
    token: '',
    user: {
        role: AUTH_ROLES.unauthenticated
    }
};

export const mutations = {
    setToken (state, {token}) {
        state.token = token;
        localStorage.setItem('draftmagic:jwt', token);
    },
    setUser (state, {user}) {
        console.log(user);
        state.user = user;
    }
};

export const actions = {
    async init ({commit}) {
        const token = localStorage.getItem('draftmagic:jwt');

        if (!token) {
            return;
        }

        commit('setToken', {token});
        commit('setUser', {user: decodeJwt(token)});
    },
    async login ({commit}, {email, password}) {
        const config = {
            method: 'POST',
            body: JSON.stringify({email, password})
        };

        const {user, token} = await fetch('/api/login', config);

        user.role = AUTH_ROLES.super; // TODO: roles

        commit('setUser', {user});
        commit('setToken', {token});
    },
    async register ({commit}, {email, password}) {
        const config = {
            method: 'POST',
            body: JSON.stringify({email, password})
        };

        const {user, token} = await fetch('/api/register', config);

        user.role = AUTH_ROLES.super; // TODO: roles

        commit('setUser', {user});
        commit('setToken', {token});
    },
    logout ({commit}) {
        commit('setUser', {
            user: {
                role: AUTH_ROLES.unauthenticated
            }
        });
        commit('setToken', {token: ''});
    }
};
