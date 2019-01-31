export default async (parent, args, context) => {
  let user = new context.UserModel(args);
  user.save();
  
  return true
}