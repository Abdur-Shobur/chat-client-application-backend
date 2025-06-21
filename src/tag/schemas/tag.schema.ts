import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITag, ITagStatus } from '../interfaces/tag.interfaces';

// Define the type for Tag document
export type TagDocument = HydratedDocument<Tag>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Tag implements ITag {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  name: string;

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
      values: [ITagStatus.Active, ITagStatus.Inactive, ITagStatus.Deleted],
      message: '{VALUE} is not a valid status',
    },
    default: ITagStatus.Active,
  })
  status?: ITagStatus;
}

// Create the schema
export const TagSchema = SchemaFactory.createForClass(Tag);
