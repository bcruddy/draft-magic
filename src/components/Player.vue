<template>
    <tr
        :class="{
            'steal-rank': isRankSteal,
            'reach-rank': isRankReach
        }"
        class="player">
        <td class="player-rank">
            {{player.rank}}
        </td>
         <td class="player-adp">
            {{player.adp}}
        </td>
        <td class="player-name">
            {{player.name}}
        </td>
        <td class="player-pos">
            {{player.pos}}
        </td>
        <td class="player-bye">
            {{player.bye}}
        </td>
        <td class="player-vsadp">
            {{player.vsadp}}
        </td>
        <td>
            <button
                v-if="showControls"
                @click="draft({player})">
                Draft
            </button>
        </td>
        <td>
            <button
                v-if="showControls"
                @click="taken({player})">
                Taken
            </button>
        </td>
    </tr>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Player',
    props: {
        index: {
            type: Number
        },
        player: {
            type: Object
        },
        type: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            isRankSteal: false,
            isRankReach: false
        };
    },
    computed: {
        showControls () {
            return type !== 'drafted' && type !== 'taken';
        }
    },
    methods: {
        ...mapActions({
            draft: 'drafts/draftPlayer',
            taken: 'drafts/markPlayerDrafted'
        })
    },
    mounted () {
        if (this.type !== 'available') {
            return;
        }

        const {rank, adp} = this.player;

        // const projectedRound = adp % 12;

        // this.isRankSteal = (rank - adp) < (-.5 * projectedRound);
        // this.isRankReach = (rank - adp) > (.5 * projectedRound);
        this.isRankSteal = (adp - rank) > 2;
        this.isRankReach = (adp - rank) < -2;
        // this.isRankSteal = vsadp.includes('-');
        // this.isRankReach = vsadp.includes('+');
    }
};
</script>

<style scoped lang="scss">
.player {
    td {
        text-align: left;
    }
}

.steal-rank {
    .player-adp,
    .player-name {
        color: green;
    }
}

.reach-rank {
    .player-adp,
    .player-name {
        color: red;
    }
}
</style>
