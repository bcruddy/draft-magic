const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');
const {jwt_secret} = require('../config');
const {findUser} = require('./user');

const AUTH_ROLES = {
    unauthenticated: 0,
    readonly: 10,
    user: 20,
    admin: 30,
    super: 40
};

const tokenForUser = user => {
    return jwt.encode({
        id: user.id,
        email: user.email,
        role: user.role || AUTH_ROLES.user,
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
const configureJwtStrategy = ({id, email, role}, done) => {
    const user = {email, id, role};

    done(null, user);
};
const jwtLogin = new JwtStrategy(jwtOptions, configureJwtStrategy);

passport.use(localLogin);
passport.use(jwtLogin);

// middleware for defining minimum required role to perform an action
const authCheck = (minRole = AUTH_ROLES.readonly) => (req, res, next) => {
    const {user} = req;

    if (!user) {
        console.log('unauthenitcated', {user, path: req.path});

        return res.status(401).json('Unauthenticated');
    }

    if (user.role < minRole) {
        console.log('unauthorized', {user, path: req.path});

        return res.status(405).json('Unauthorized');
    }

    next();
};

module.exports = {
    AUTH_ROLES,
    authCheck,
    configureJwtStrategy,
    configureLocalStrategy,
    tokenForUser,
    requireSignIn: passport.authenticate('local', {session: false}),
    requireAuth: passport.authenticate('jwt', {session: false})
};
