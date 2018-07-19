module.exports = {
    lintOnSave: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4300',
                secure: false
            }
        }
    }
};
