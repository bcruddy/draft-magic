<template>
    <div class="landing">
        <h1>welcome {{user.email}}</h1>
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="card">
                    <button @click="createDraft">Create Draft</button>
                </div>
                <div class="card">
                    <h3>Past Drafts</h3>
                    <p v-if="!drafts.length">
                        No previous drafts.
                    </p>
                    <ul class="draft-list">
                        <li
                            v-for="d in drafts"
                            :key="d.id"
                            class="draft-item">
                            <router-link
                                :to="'/draft/' + d.id">
                                {{d.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: 'Landing',
    data () {
        return {
            draft: {
                name: 'hooray!',
                position: 1,
                ppr: false,
                size: 10,
                snapshot: {}
            }
        };
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            drafts: state => state.drafts.list || []
        })
    },
    methods: {
        ...mapActions({
            fetchDrafts: 'drafts/fetch',
            _createDraft: 'drafts/create'
        }),
        async createDraft () {
            this.draft.userId = this.user.id;

            await this._createDraft({draft: this.draft});
        }
    },
    async created () {
        try {
            await this.fetchDrafts();
        }
        catch (ex) {
            console.error(ex);
        }
    }
};
</script>
