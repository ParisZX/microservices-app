import * as mongoose from 'mongoose';

// Interface that defines the properties required
// to create a new user
interface UserAttributes {
  email: string,
  password: string
}

// Interface that defines the properties a user model
// has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attr: UserAttributes): UserDocument;
}

// Interface that defines the properties a user document
// has
interface UserDocument extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };