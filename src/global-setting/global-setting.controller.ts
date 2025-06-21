import { Controller, Get, Body, Post, UseGuards, Global } from '@nestjs/common';
import { ResponseHelper } from 'src/helper';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';
import { GlobalSettingService } from './global-setting.service';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';

@UseGuards(AuthGuard)
@Controller('global-setting')
export class GlobalSettingController {
  constructor(private readonly GlobalSettingService: GlobalSettingService) {}

  @Post()
  @Roles(Role.GLOBAL_SETTING_UPDATE)
  async create(@Body() createGlobalSettingDto: CreateGlobalSettingDto) {
    const result = await this.GlobalSettingService.create(
      createGlobalSettingDto,
    );

    if (!result) {
      return ResponseHelper.error('Site Setting not created');
    }

    return ResponseHelper.success(result, 'Site Setting created successfully');
  }

  @Get()
  @Roles(Role.GLOBAL_SETTING_ALL)
  async findAll() {
    const result = await this.GlobalSettingService.findAll();

    // if not found
    if (!result) {
      return ResponseHelper.error('Data not found');
    }

    // if found
    return ResponseHelper.success(result);
  }
}
