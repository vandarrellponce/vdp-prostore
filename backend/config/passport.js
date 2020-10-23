import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/userModel.js'

passport.serializeUser((user, cb) => {
	cb(null, user)
})
passport.deserializeUser((user, cb) => {
	cb(null, user)
})

passport.use(
	new GoogleStrategy(
		{
			// options for the google strat
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/redirect',
		},
		async (accessToken, refreshToken, profile, next) => {
			// passport callback function

			return next(null, profile)
		}
	)
)
