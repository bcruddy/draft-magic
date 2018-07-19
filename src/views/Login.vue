<template>
    <div class="login">
        <h1>login</h1>
        <div class="login-form">
            <input
                v-model="username"
                type="text"
                placeholder="foo@bar.com" />
            <input
                v-model="password"
                type="password"
                placeholder="password" />
            <button @click="login(username, password)">
                Login
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        ...mapActions({
            _login: 'auth/login'
        }),
        login (username, password) {
            return this._login({username, password})
                .then(() => {
                    this.$router.push('/');
                });
        }
    }
};
</script>

<style scoped lang="scss">
    input,
    button {
        display: block;
        margin-bottom: 20px;
        width: 50%;
        margin: 15px auto;
    }
</style>
