const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');
const {jwt_secret} = require('../config');
const {findUser} = require('./user');

const tokenForUser = user => {
    return jwt.encode({
        sub: user.id,
        iat: Date.now()
    }, jwt_secret);
};

const localOptions = {usernameField: 'email'};
const configureLocalStrategy = async (email, password, done) => {
    try {
        const user = await findUser({email});
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
            return done(null, user);
        }

        return done(null, false);
    }
    catch (ex) {
        return done(ex, false);
    }
};
const localLogin = new LocalStrategy(localOptions, configureLocalStrategy);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwt_secret
};
const configureJwtStrategy = async ({sub}, done) => {
    try {
        const user = await findUser({id: sub.id});

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    }
    catch (ex) {
        return done(ex, false);
    }
};
const jwtLogin = new JwtStrategy(jwtOptions, configureJwtStrategy);

passport.use(localLogin);
passport.use(jwtLogin);

module.exports = {
    configureJwtStrategy,
    configureLocalStrategy,
    tokenForUser
};
