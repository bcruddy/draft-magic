// TODO: persist auth with localStorage

import fetch from '@/utils/fetch';
import {AUTH_ROLES} from '../constants';

export const state = {
    token: '',
    user: {
        role: 0
    }
};

export const mutations = {
    setToken (state, {token}) {
        state.token = token;
        window.localStorage.setItem('draftmagic:jwt', token);
    },
    setUser (state, {user}) {
        state.user = user;
    }
};

export const actions = {
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
