import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user/user.interface';

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
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema], default: undefined },
  },
  { versionKey: false },
);

// userSchema.post('save', function (doc, next) {
//   delete doc.password;
//   console.log(doc);
//   next();
// });

const User = model<TUser>('User', userSchema);

export default User;
