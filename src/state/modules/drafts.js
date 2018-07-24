import fetch from '@/utils/fetch';
import findIndex from 'lodash/findIndex';
import keyBy from 'lodash/keyBy';

export const state = {
    active: null,
    list: [],
    map: {},
    availablePlayers: [],
    draftedPlayers: [],
    takenPlayers: []
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
    setAvailablePlayers (state, {availablePlayers}) {
        state.availablePlayers = availablePlayers;
    },
    setList (state, {list}) {
        state.list = list;
    },
    setLoading (state, {loading}) {
        state.loading = loading;
    },
    setMap (state, {map}) {
        state.map = map;
    },
    setPlayerDrafted (state, {player}) {
        const index = findIndex(state.availablePlayers, {Rank: player.Rank});
    
        state.availablePlayers.splice(index, 1);
        state.draftedPlayers.push(player);
    },
    setPlayerTaken (state, {player}) {
        const index = findIndex(state.availablePlayers, {Rank: player.Rank});
    
        state.availablePlayers.splice(index, 1);
        state.draftedPlayers.push(player);
    }
};

export const actions = {
    async fetch ({commit}) {
        commit('setLoading', {loading: true});

        try {
            const created = await fetch('/api/v1/drafts');

            commit('setList', {list: created.drafts});
            commit('setMap', {map: keyBy(created.drafts, 'id')});
        }
        finally {
            commit('setLoading', {loading: false});
        }
    },
    async create ({commit}, {draft}) {
        commit('setLoading', {loading: true});
        

        try {
            const created = await fetch('/api/v1/draft', {
                method: 'POST',
                body: JSON.stringify(draft)
            });

            commit('setActive', {draft: created.draft});
            commit('addCreatedDraft', {draft: created.draft});
        }
        finally {
            commit('setLoading', {loading: false});
        }
    },
    async getAvailablePlayers ({commit}) {
        commit('setLoading', {loading: true});

        try {
            const availablePlayers = await fetch('/api/v1/draft/board');
            
            commit('setAvailablePlayers', {availablePlayers});
        }
        finally {
            commit('setLoading', {loading: false});
        }
    },
    async draftPlayer ({commit}, {player}) {
        commit('setPlayerDrafted', {player});
    },
    async markPlayerDrafted ({commit}, {player}) {
        commit('setPlayerTaken', {player});
    }
};
