import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ITagStatus } from './interfaces/tag.interfaces';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private TagModel: Model<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    const lengthOfItem = await this.TagModel.countDocuments();

    const result = await this.TagModel.create({
      ...createTagDto,
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
    const result: any = await this.TagModel.find(query)
      .sort({ position: 1 })
      .lean()
      .exec();
    return result;
  }

  async findOne(id: string) {
    return await this.TagModel.findById(id).lean().exec();
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    // Update the record with the new data
    return await this.TagModel.findByIdAndUpdate(id, updateTagDto);
  }

  /**
   * Update the  Status
   */
  async updateStatus(id: string, status: ITagStatus) {
    return await this.TagModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }, // `new: true` returns the updated document
    );
  }

  async remove(id: string) {
    // Now delete the Tag document itself
    return await this.TagModel.findByIdAndDelete(id);
  }
}
