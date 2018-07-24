<template>
    <div class="draft-board">
        <div class="col-md-6">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Pos</th>
                        <th>Bye</th>
                        <th>ADP</th>
                        <th>vsADP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="player in availablePlayers"
                        :key="player.id">
                        <td>{{player.Rank}}</td>
                        <td>{{player.Overall}}</td>
                        <td>{{player.Pos}}</td>
                        <td>{{player.Bye}}</td>
                        <td>{{player.ADP}}</td>
                        <td>{{player.vsADP}}</td>
                        <td>
                            <button @click="draft({player})">Draft</button>
                        </td>
                        <td>
                            <button @click="taken({player})">Taken</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import fetch from '@/utils/fetch';

export default {
    name: 'DraftBoard',
    computed: {
        ...mapState({
            availablePlayers: state => state.drafts.availablePlayers,
            draftedPlayers: state => state.drafts.draftedPlayers,
            takenPlayer: state => state.drafts.takenPlayers
        })
    },
    async created () {
        this.getAvailablePlayers();
    },
    methods: {
        ...mapActions({
            getAvailablePlayers: 'drafts/getAvailablePlayers',
            draft: 'drafts/draftPlayer',
            taken: 'drafts/markPlayerDrafted'
        })
    }
};
</script>

<style scoped lang="scss">
</style>
