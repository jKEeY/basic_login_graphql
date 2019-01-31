import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	}
})

userSchema.pre('save', async function (next) {
	let self = this
	self.password = await bcrypt.hash(self.password, 20)
	next()
})

export default mongoose.model('User', userSchema)