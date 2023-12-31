import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullNameSchema: Schema<TFullName> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema: Schema<TAddress> = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema: Schema<TOrder> = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema: Schema<TUser> = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema], default: undefined },
  },
  {
    versionKey: false,

    toJSON: {
      transform: function (doc, ret) {
        // Exclude the password field when converting to JSON
        delete ret.password;
      },
    },
  },
);

// pre save middleware / hook :
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

const User = model<TUser, UserModel>('User', userSchema);

export default User;
