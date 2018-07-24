import fetch from '@/utils/fetch';
import {AUTH_ROLES} from '../constants';

const {localStorage} = window;

export const state = {
    token: '',
    user: {
        role: 0
    }
};

export const mutations = {
    setToken (state, {token}) {
        state.token = token;
        localStorage.setItem('draftmagic:jwt', token);
    },
    setUser (state, {user}) {
        state.user = user;
        localStorage.setItem(
            'draftmagic:user',
            typeof user === 'object' ? JSON.stringify(user) : user
        );
    }
};

export const actions = {
    async init ({commit}) {
        const token = localStorage.getItem('draftmagic:jwt');
        const user = localStorage.getItem('draftmagic:user');

        if (!token || !user) {
            return;
        }

        commit('setToken', {token});
        commit('setUser', {user: JSON.parse(user)});
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
