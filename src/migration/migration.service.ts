import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRoleType } from 'src/role/interfaces/role.interfaces';
import { Role, RoleDocument } from 'src/role/schemas/role.schema';
// import { Role, RoleDocument } from './schemas/role.schema';
// import { IRoleType } from './interfaces/role.interfaces';

@Injectable()
export class MigrationService {
  private readonly logger = new Logger(MigrationService.name);

  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  // Migration method to add 'type' field with default if missing
  async addMissingTypeField(): Promise<void> {
    this.logger.log('Starting migration: addMissingTypeField');

    // Update roles that do not have the 'type' field
    // Set the default type to IRoleType.User
    const result = await this.roleModel.updateMany(
      { type: { $exists: false } }, // Filter roles missing 'type'
      { $set: { type: IRoleType.User } }, // Set default type
    );

    this.logger.log(
      `Migration completed: matched ${result.matchedCount}, modified ${result.modifiedCount}`,
    );
  }

  // Add more migration methods here in future
}
