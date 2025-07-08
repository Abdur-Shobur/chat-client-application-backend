import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserStatus } from './interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
import { CustomConfigService } from 'src/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private readonly config: CustomConfigService,
  ) {}

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
    return await this.UserModel.findByIdAndUpdate(id, updateUserDto, {
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
  // Find user by id  Only User
  async findByIdOnlyUser(id: string): Promise<UserDocument | null> {
    return this.UserModel.findById(id)
      .select('_id name email phone status role') // select root user fields
      .populate({
        path: 'role',
        select: '_id name permissions', // only select these fields from Role
        populate: {
          path: 'permissions',
          select: '_id name status', // only these fields from Permission
        },
      })
      .exec();
  }

  async updateProfile(userId: string, data: Partial<User>) {
    // Check for duplicate email
    if (data.email) {
      const emailExists = await this.UserModel.findOne({
        email: data.email,
        _id: { $ne: userId },
      });
      if (emailExists) throw new Error('Email already in use');
    }

    // Check for duplicate phone
    if (data.phone) {
      const phoneExists = await this.UserModel.findOne({
        phone: data.phone,
        _id: { $ne: userId },
      });
      if (phoneExists) throw new Error('Phone number already in use');
    }

    return this.UserModel.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.UserModel.findById(userId).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(this.config.hashSalt), // same as your register logic
    );

    user.password = hashedPassword;
    await user.save();
  }

  // delete user by id
  async delete(id: string): Promise<UserDocument | null> {
    return await this.UserModel.findByIdAndDelete(id).exec();
  }

  /**
   * Update the  Status
   */
  async updateStatus(id: string, status: IUserStatus) {
    return await this.UserModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }, // `new: true` returns the updated document
    );
  }
}
