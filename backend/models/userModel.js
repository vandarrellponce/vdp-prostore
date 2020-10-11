import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

// SET UP A STATIC FUNCTION FOR USER MODEL
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) throw new Error('Email address is incorrect')

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) throw new Error('Password is incorrect')

	return user
}
// SET METHOD FOR USER INSTANCE
/* Generate Auth token from jsonwebtoken */
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'secretkey', {
		expiresIn: '1 day',
	})

	user.tokens = user.tokens.concat({ token: token })
	await user.save()
	return token
}
/* Override toJSON method of a user - TO HIDE PASSWORD AND TOKEN */
userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

// SET UP MIDDLEWARE FOR USERSCHEMA
/* Hash user password before saving to database */
userSchema.pre('save', async function (next) {
	const user = this
	if (user.isModified('password'))
		user.password = await bcrypt.hash(user.password, 8)
	next()
})
/* Delete user tasks when user is removed */
userSchema.pre('remove', async function (next) {
	const user = this
	await Task.deleteMany({ user: user._id })
	next()
})

// CREATE USER MODEL
const User = mongoose.model('User', userSchema)

export default User
