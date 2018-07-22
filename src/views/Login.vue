<template>
    <div class="login">
        <h1>
            {{mode}}
        </h1>
        <div class="login-form">
            <input
                v-model="email"
                type="text"
                placeholder="foo@bar.com" />
            <input
                v-model="password"
                type="password"
                placeholder="password" />
            <div class="helper-text">
                <p>
                    {{helperText}} <a
                        href="javascript:void(0)"
                        @click="toggleMode">{{helperToggleText}}</a>
                </p>
            </div>
            <button
                v-if="isLoginMode"
                @click="login(email, password)">
                Login
            </button>
            <button
                v-if="isRegisterMode"
                @click="register(email, password)">
                Register
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
            mode: 'register',
            email: '',
            password: ''
        };
    },
    computed: {
        isLoginMode () {
            return this.mode === 'login';
        },
        isRegisterMode () {
            return this.mode === 'register';
        },
        helperText () {
            let text = '';

            switch (this.mode) {
            case 'login':
                text = 'need an account?';
                break;
            case 'register':
                text = 'already have an account?';
                break;
            }

            return text;
        },
        helperToggleText () {
            let text = '';

            switch (this.mode) {
            case 'login':
                text = 'sign up';
                break;
            case 'register':
                text = 'sign in';
                break;
            }

            return text;
        }
    },
    methods: {
        ...mapActions({
            _login: 'auth/login',
            _register: 'auth/register'
        }),
        toggleMode () {
            this.mode = this.mode === 'register' ? 'login' : 'register';
        },
        async login (email, password) {
            await this._login({email, password});
            this.$router.push('/');
        },
        async register (email, password) {
            await this._register({email, password});
            this.$router.push('/');
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
