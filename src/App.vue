<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/draft">Draft</router-link> |
            <router-link
                v-if="!isLoggedIn"
                to="/login">
                Log In
            </router-link>
            <a 
                v-else
                @click="logout">
                Log out
            </a>
        </div>
        <router-view/>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {AUTH_ROLES} from './state/constants';

export default {
    computed: {
        ...mapState({
            user: state => state.auth.user,
            isLoggedIn: state => state.auth.user.role > AUTH_ROLES.unauthenticated
        })
    },
    methods: {
        ...mapActions({
            _logout: 'auth/logout'
        }),
        logout () {
            this._logout();
            this.$router.push('/login');
        }
    }
};
</script>

<style lang="scss">
@import '~flexboxgrid/css/flexboxgrid.css';

html,
body {
    font-size: 16px;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: auto 2em;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

button,
p,
input,
select {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1em;
}
</style>
