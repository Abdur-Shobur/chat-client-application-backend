import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, IUserStatus } from '../interfaces/user.interfaces';
import { Role } from 'src/role/schemas/role.schema';

// Define the type for User document
export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  toJSON: {
    transform: (_doc, ret) => {
      delete ret.password; // Remove password from the response
      return ret;
    },
  },
})
export class User implements IUser {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  name: string;

  // phone
  @Prop({
    unique: true,
    required: false,
    maxlength: [15, 'phone must be at most 15 characters long'],
  })
  phone: string;

  //   email
  @Prop({
    required: true,
    unique: true,
    // match: [
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    //   'Please enter a valid email address',
    // ],
    maxlength: [120, 'email must be at most 120 characters long'],
  })
  email: string;

  // password
  @Prop({
    required: true,
    maxlength: [120, 'password must be at most 120 characters long'],
  })
  password: string;

  //   UserType
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
  })
  role: string;

  // position
  @Prop({
    required: [true, 'Position is required'],
    min: [0, 'Position must be a positive number'],
    default: 0,
  })
  position: number;

  // status
  @Prop({
    enum: {
      values: [IUserStatus.Active, IUserStatus.Inactive, IUserStatus.Deleted],
      message: '{VALUE} is not a valid status',
    },
    default: IUserStatus.Inactive,
  })
  status?: IUserStatus;
}

// Create the schema
export const UserSchema = SchemaFactory.createForClass(User);
