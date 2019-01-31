import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (parent, args, context) => {
  console.log(context, args)
  const user = await context.UserModel.findOne({email: args.email}) // find user on args email
  if (!user) {
    throw new Error('Not user with that email')
  }

  const valid = bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('password not valid')
  }

  const token = jwt.sign(
    {
      user: {id: user._id.toString(), username: user.username}
    },
    context.SECRET,
    {
      expiresIn: '1m'
    }
  )

  return token
}