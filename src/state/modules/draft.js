import fetch from '@/utils/fetch';
import keyBy from 'lodash/keyBy';

export const state = {
    active: null,
    list: [],
    map: {}
};

export const mutations = {
    addCreatedDraft (state, {draft}) {
        const mapItem = {
            [draft.id]: draft
        };

        state.list = state.list.concat(draft);
        state.map = Object.assign({}, state.map, mapItem);
    },
    setActive (state, {draft}) {
        state.active = draft;
    },
    setList (state, {list}) {
        state.list = list;
    },
    setLoading (state, {loading}) {
        state.loading = loading;
    },
    setMap (state, {map}) {
        state.map = map;
    }
};

export const actions = {
    async fetch ({commit}) {
        commit('setLoading', {loading: true});

        try {
            const list = await fetch('/api/drafts');

            commit('setList', {list});
            commit('setMap', {map: keyBy(list, 'id')});
        }
        finally {
            commit('setLoading', {loading: false});
        }
    },
    async create ({commit}, {draft}) {
        commit('setLoading', {loading: true});
        commit('setActive', {draft});

        try {
            const created = await fetch('/api/drafts', {
                type: 'POST',
                body: JSON.stringify(draft)
            });

            commit('addCreatedDraft', {draft: created});
        }
        finally {
            commit('setLoading', {loading: false});
        }
    }
};
