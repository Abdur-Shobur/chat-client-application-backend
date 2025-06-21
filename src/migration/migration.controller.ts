import { Controller, Post } from '@nestjs/common';
import { MigrationService } from './migration.service';

@Controller('migration')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Post('role')
  async runMigration() {
    await this.migrationService.addMissingTypeField();
    return { message: 'Migration executed successfully' };
  }
}
