import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DevPermissionCategory } from './schemas/dev-permission-category.schema';
import { Model } from 'mongoose';
import { CreateDevPermissionCategoryDto } from './dto/create-dev-permission-category.dto';
import { UpdateDevPermissionCategoryDto } from './dto/update-dev-permission-category.dto';
import { IDevPermissionCategoryStatus } from './interfaces/dev-permission-category.interfaces';
import { DevPermissionSubCategory } from 'src/dev-permission-sub-category/schemas/dev-permission-sub-category.schema';

@Injectable()
export class DevPermissionCategoryService {
  constructor(
    @InjectModel(DevPermissionCategory.name)
    private DevPermissionCategoryModel: Model<DevPermissionCategory>,
    @InjectModel(DevPermissionSubCategory.name)
    private DevPermissionSubCategoryModel: Model<DevPermissionSubCategory>,
  ) {}
  async create(createDevPermissionCategoryDto: CreateDevPermissionCategoryDto) {
    const lengthOfItem = await this.DevPermissionCategoryModel.countDocuments();

    const result = await this.DevPermissionCategoryModel.create({
      ...createDevPermissionCategoryDto,
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
    // const result: any = await this.DevPermissionCategoryModel.find(query)
    //   .sort({ position: 1 })
    //   .lean()
    //   .exec();
    // return result;
    // Fetch from the database with $lookup
    const result = await this.DevPermissionCategoryModel.aggregate([
      { $match: query }, // Filter categories by status
      { $sort: { position: 1 } }, // Sort categories by position
      {
        $lookup: {
          from: `devpermissionsubcategories`, // The name of the subcategories collection
          localField: '_id', // Field in the categories collection to match
          foreignField: 'category', // Field in the subcategories collection to match
          as: 'subcategories', // The array field to include in the result
        },
      },
      { $project: { __v: 0 } }, // Exclude the `__v` field from the results
    ]);

    return result;
  }

  async findOne(id: string) {
    return await this.DevPermissionCategoryModel.findById(id).lean().exec();
  }

  async update(
    id: string,
    updateDevPermissionCategoryDto: UpdateDevPermissionCategoryDto,
  ) {
    // Update the record with the new data
    return await this.DevPermissionCategoryModel.findByIdAndUpdate(
      id,
      updateDevPermissionCategoryDto,
    );
  }

  /**
   * Update the  Status
   */
  async updateStatus(id: string, status: IDevPermissionCategoryStatus) {
    return await this.DevPermissionCategoryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }, // `new: true` returns the updated document
    );
  }

  async remove(id: string) {
    // Now delete the DevPermissionCategory document itself
    return await this.DevPermissionCategoryModel.findByIdAndDelete(id);
  }
}
