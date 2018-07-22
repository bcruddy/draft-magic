import store from '@/state/store';

export default async function (endpoint, externalConfig = {}) {
    const config = {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    if (store.state.auth.token) {
        config.headers.Authorization = store.state.auth.token;
    }

    return fetch(endpoint, Object.assign({}, config, externalConfig))
        .then(res => res.json())
        .catch(err => {
            if (err.status === 401) {
                store.dispatch('auth/logout');
            }

            const error = new Error('fetch.catch');
            error.innerError = err;

            console.error(error);

            throw error;
        });
}
