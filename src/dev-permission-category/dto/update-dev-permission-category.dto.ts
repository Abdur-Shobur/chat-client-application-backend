import { PartialType } from '@nestjs/swagger';
import { CreateDevPermissionCategoryDto } from './create-dev-permission-category.dto';

export class UpdateDevPermissionCategoryDto extends PartialType(
  CreateDevPermissionCategoryDto,
) {}
