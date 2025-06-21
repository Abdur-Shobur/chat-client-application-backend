import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const result = (await this.UserModel.create(createUserDto)).toJSON();
    return result;
  }

  async findAllUser(status?: string, userId?: string) {
    const query: Record<string, any> = {};

    if (status === 'active' || status === 'inactive' || status === 'deleted') {
      query.status = status;
    }

    if (userId) {
      // Exclude the current user's ID
      query._id = { $ne: userId };
    }

    const result = await this.UserModel.find(query)
      .sort({ position: 1 })
      .select('-password')
      .populate({
        path: 'role',
        select: 'name status',
      })
      .lean()
      .exec();

    return result;
  }

  async findAll(status?: string) {
    const query: Record<string, any> = {};
    if (status === 'active' || status === 'inactive' || status === 'deleted') {
      query.status = status;
    }

    // Fetch from the database
    const result: any = await this.UserModel.find(query)
      .sort({ position: 1 })
      .populate({
        path: 'role', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'permissions', // The field to populate (category)
          select: 'name status permissionKey', // Specify the fields to select from the category model
        },
      })
      .lean()
      .exec();
    return result;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    return this.UserModel.findOneAndUpdate(
      { email }, // Find user by email
      updateUserDto, // Update data
      { new: true }, // Return the updated document
    ).exec();
  }

  // Find user by email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ email })
      .populate({
        path: 'role', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'permissions', // The field to populate (category)
          select: 'name status permissionKey', // Specify the fields to select from the category model
        },
      })
      .exec();
  }

  // Find user by phone
  async findByPhone(phone: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ phone })
      .populate({
        path: 'role', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'permissions', // The field to populate (category)
          select: 'name status permissionKey', // Specify the fields to select from the category model
        },
      })
      .exec();
  }

  // Find user by id
  async findById(id: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ _id: id })
      .populate({
        path: 'role', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'permissions', // The field to populate (category)
          select: 'name status permissionKey', // Specify the fields to select from the category model
        },
      })
      .exec();
  }
}
