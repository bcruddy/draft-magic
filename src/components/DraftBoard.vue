<template>
    <div class="draft-board">
        <div class="player-column">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>ADP</th>
                        <th>Player</th>
                        <th>Pos</th>
                        <th>Bye</th>
                        <th>vsADP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <player
                        v-for="(player, index) in availablePlayers"
                        :key="player.id"
                        :player="player"
                        :index="index"
                        type="available" />
                </tbody>
            </table>
        </div>
        <div class="player-column">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>ADP</th>
                        <th>Player</th>
                        <th>Pos</th>
                        <th>Bye</th>
                        <th>vsADP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <player
                        v-for="player in draftedPlayers"
                        :key="player.id"
                        :player="player"
                        type="drafted" />
                </tbody>
            </table>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>ADP</th>
                        <th>Player</th>
                        <th>Pos</th>
                        <th>Bye</th>
                        <th>vsADP</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <player
                        v-for="player in takenPlayers"
                        :key="player.id"
                        :player="player"
                        type="taken" />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import Player from './Player.vue';

export default {
    name: 'DraftBoard',
    components: {
        Player
    },
    computed: {
        ...mapState({
            availablePlayers: state => state.drafts.availablePlayers,
            draftedPlayers: state => state.drafts.draftedPlayers,
            takenPlayers: state => state.drafts.takenPlayers
        })
    },
    async created () {
        this.getAvailablePlayers();
    },
    methods: {
        ...mapActions({
            getAvailablePlayers: 'drafts/getAvailablePlayers'
        })
    }
};
</script>

<style scoped lang="scss">
.draft-board {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    .player-column {
        flex-basis: 49%;
    }
}

table {
    width: 100%;

    th,
    td {
        text-align: left;
    }
}
</style>
