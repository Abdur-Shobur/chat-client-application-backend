import { PartialType } from '@nestjs/swagger';
import { CreateDevPermissionSubCategoryDto } from './create-dev-permission-sub-category.dto';

export class UpdateDevPermissionSubCategoryDto extends PartialType(
  CreateDevPermissionSubCategoryDto,
) {}
