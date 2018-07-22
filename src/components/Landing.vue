<template>
    <div class="landing">
        <h1>welcome {{user.email}}</h1>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
    name: 'Landing',
    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    }
};
</script>
