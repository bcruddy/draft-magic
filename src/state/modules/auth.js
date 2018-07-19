import fetch from '@/utils/fetch';
import {AUTH_ROLES} from '../constants';

export const state = {
    user: {
        role: AUTH_ROLES.unauthenticated
    }
};

export const mutations = {
    setUser (state, {user}) {
        state.user = user;
    }
};

export const actions = {
    async login ({commit}, {username, password}) {
        const config = {
            method: 'POST',
            body: JSON.stringify({username, password, role: 30})
        };

        return fetch('/api/login', config)
            .then(user => {
                commit('setUser', {user});
            });
    },
    logout ({commit}) {
        commit('setUser', {
            user: {
                role: AUTH_ROLES.unauthenticated
            }
        });
    }
};
