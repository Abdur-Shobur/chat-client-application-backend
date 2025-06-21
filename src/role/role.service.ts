import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IRoleStatus } from './interfaces/role.interfaces';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private RoleModel: Model<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const lengthOfItem = await this.RoleModel.countDocuments();

    const result = await this.RoleModel.create({
      ...createRoleDto,
      position: lengthOfItem + 1,
    });
    return result;
  }

  async findAll(status?: string) {
    const query: Record<string, any> = {};
    if (status === 'active' || status === 'inactive' || status === 'deleted') {
      query.status = status;
    }

    // Fetch from the database
    const result: any = await this.RoleModel.find(query)
      .sort({ position: 1 })
      .populate({
        path: 'permissions', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'category', // The field to populate (category)
          select: 'name status', // Specify the fields to select from the category model
        },
      })
      .lean()
      .exec();
    return result;
  }

  async findOne(id: string) {
    return await this.RoleModel.findById(id)
      .populate({
        path: 'permissions', // Populate the permissions array
        populate: {
          // Populate the category field within permissions
          path: 'category', // The field to populate (category)
          select: 'name status', // Specify the fields to select from the category model
        },
      })
      .lean()
      .exec();
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // Update the record with the new data
    return await this.RoleModel.findByIdAndUpdate(id, updateRoleDto);
  }

  /**
   * Update the  Status
   */
  async updateStatus(id: string, status: IRoleStatus) {
    return await this.RoleModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }, // `new: true` returns the updated document
    );
  }

  async remove(id: string) {
    // Now delete the Role document itself
    return await this.RoleModel.findByIdAndDelete(id);
  }
}
