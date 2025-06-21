import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DevPermissionSubCategory } from './schemas/dev-permission-sub-category.schema';
import { Model, Types } from 'mongoose';
import { CreateDevPermissionSubCategoryDto } from './dto/create-dev-permission-sub-category.dto';
import { UpdateDevPermissionSubCategoryDto } from './dto/update-dev-permission-sub-category.dto';
import { IDevPermissionSubCategoryStatus } from './interfaces/dev-permission-sub-category.interfaces';

@Injectable()
export class DevPermissionSubCategoryService {
  constructor(
    @InjectModel(DevPermissionSubCategory.name)
    private DevPermissionSubCategoryModel: Model<DevPermissionSubCategory>,
  ) {}
  async create(
    createDevPermissionSubCategoryDto: CreateDevPermissionSubCategoryDto,
  ) {
    // Validate `category` as an ObjectId
    if (!Types.ObjectId.isValid(createDevPermissionSubCategoryDto.category)) {
      throw new BadRequestException('Invalid category');
    }

    const lengthOfItem =
      await this.DevPermissionSubCategoryModel.countDocuments();

    const result = await this.DevPermissionSubCategoryModel.create({
      ...createDevPermissionSubCategoryDto,
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
    const result: any = await this.DevPermissionSubCategoryModel.find(query)
      .sort({ position: 1 })
      .populate('category', 'name status')
      .lean()
      .exec();
    return result;
  }

  async findOne(id: string) {
    return await this.DevPermissionSubCategoryModel.findById(id)
      .populate('category', 'name status')
      .lean()
      .exec();
  }

  async update(
    id: string,
    updateDevPermissionSubCategoryDto: UpdateDevPermissionSubCategoryDto,
  ) {
    // Update the record with the new data
    return await this.DevPermissionSubCategoryModel.findByIdAndUpdate(
      id,
      updateDevPermissionSubCategoryDto,
    );
  }

  /**
   * Update the  Status
   */
  async updateStatus(id: string, status: IDevPermissionSubCategoryStatus) {
    return await this.DevPermissionSubCategoryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }, // `new: true` returns the updated document
    );
  }

  async remove(id: string) {
    // Now delete the DevPermissionSubCategory document itself
    return await this.DevPermissionSubCategoryModel.findByIdAndDelete(id);
  }
}
