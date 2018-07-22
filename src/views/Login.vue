<template>
    <div class="login">
        <h1>login</h1>
        <div class="login-form">
            <input
                v-model="email"
                type="text"
                placeholder="foo@bar.com" />
            <input
                v-model="password"
                type="password"
                placeholder="password" />
            <button @click="login(email, password)">
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
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions({
            _login: 'auth/login'
        }),
        login (email, password) {
            return this._login({email, password})
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
