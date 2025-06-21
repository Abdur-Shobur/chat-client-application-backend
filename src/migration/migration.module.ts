import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MigrationService } from './migration.service';
import { Role, RoleSchema } from 'src/role/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [MigrationService],
  exports: [MigrationService],
})
export class MigrationModule {}
