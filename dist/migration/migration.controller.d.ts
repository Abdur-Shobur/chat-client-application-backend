import { MigrationService } from './migration.service';
export declare class MigrationController {
    private readonly migrationService;
    constructor(migrationService: MigrationService);
    runMigration(): Promise<{
        message: string;
    }>;
}
