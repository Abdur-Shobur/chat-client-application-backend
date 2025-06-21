import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IGroup, IGroupStatus } from '../interfaces/group.interfaces';
import { User } from 'src/user/schemas/user.schema';
import { Tag } from 'src/tag/schemas/tag.schema';

// Define the type for Group document
export type GroupDocument = HydratedDocument<Group>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Group implements IGroup {
  // name
  @Prop({
    unique: true,
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  name: string;

  // description
  @Prop({
    required: false,
    minlength: [2, 'description must be at least 2 characters long'],
    maxlength: [120, 'description must be at most 120 characters long'],
  })
  description: string;

  // iconUrl
  @Prop({
    required: false,
    minlength: [1, 'icon must be at least 1 characters long'],
    maxlength: [120, 'icon must be at most 120 characters long'],
  })
  iconUrl?: string;

  // createdBy
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: User.name,
  })
  createdBy: string;

  // joinType
  @Prop({ enum: ['public', 'private'], default: 'public' })
  joinType?: 'public' | 'private';

  // joinLink
  @Prop({ required: false })
  joinLink?: string;

  // joinApprovalType
  @Prop({ enum: ['auto', 'admin'] })
  joinApprovalType?: 'auto' | 'admin';

  @Prop()
  welcomeMessage: string;

  // members
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: User.name,
  })
  members?: string[];

  // pendingMembers
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: User.name,
  })
  pendingMembers?: string[];

  // tags
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: Tag.name,
  })
  tags?: string[];

  // status
  @Prop({
    enum: {
      values: [
        IGroupStatus.Active,
        IGroupStatus.Inactive,
        IGroupStatus.Deleted,
      ],
      message: '{VALUE} is not a valid status',
    },
    default: IGroupStatus.Active,
  })
  status?: IGroupStatus;
}

// Create the schema
export const GroupSchema = SchemaFactory.createForClass(Group);
