import { Model } from 'mongoose';
import { RoleDocument } from 'src/role/schemas/role.schema';
export declare class MigrationService {
    private readonly roleModel;
    private readonly logger;
    constructor(roleModel: Model<RoleDocument>);
    addMissingTypeField(): Promise<void>;
}
