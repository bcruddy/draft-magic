import findIndex from 'lodash/findIndex';
import standardRankings from '../../../data/2018-09-04_standard.json';
import pprRankings from '../../../data/2018-09-04_ppr.json';

export const state = {
    leagueSize: 12,
    type: 'standard',
    round: 1,
    pick: 1,
    availablePlayers: [],
    draftedPlayers: [],
    takenPlayers: []
};

export const mutations = {
    setConfig (state, {type, size}) {
        state.type = type;
        state.leagueSize = size;
    },
    setAvailablePlayers (state, {availablePlayers}) {
        state.availablePlayers = availablePlayers;
    },
    setPlayerDrafted (state, {player}) {
        const index = findIndex(state.availablePlayers, {rank: player.rank});

        state.availablePlayers.splice(index, 1);
        state.draftedPlayers.push(player);
    },
    setPlayerTaken (state, {player}) {
        const index = findIndex(state.availablePlayers, {rank: player.rank});

        state.availablePlayers.splice(index, 1);
        state.takenPlayers.push(player);
    }
};

export const actions = {
    init ({commit}) {
        const config = (window.location.search || '')
            .slice(1) // remove `?`
            .split('&')
            .map(kv => kv.split('='))
            .reduce((memo, [key, value]) => {
                memo[key] = value;

                return memo;
            }, {
                type: 'standard',
                size: 12
            });

        commit('setConfig', config);
    },
    async getAvailablePlayers ({state, commit}) {
        const availablePlayers = state.type === 'standard' ? standardRankings : pprRankings;

        commit('setAvailablePlayers', {availablePlayers});
    },
    async draftPlayer ({commit}, {player}) {
        commit('setPlayerDrafted', {player});
    },
    async markPlayerDrafted ({commit}, {player}) {
        commit('setPlayerTaken', {player});
    }
};
