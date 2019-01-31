export default (user) => {
  user.id = user._id.toString()
  return user
}