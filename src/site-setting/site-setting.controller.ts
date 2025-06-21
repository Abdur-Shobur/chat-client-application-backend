import {
  Controller,
  Get,
  Body,
  UseInterceptors,
  UploadedFiles,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { createUploadInterceptorDifferentName } from 'src/upload/upload.interceptor-different-name';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { ResponseHelper } from 'src/helper';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';

@UseGuards(AuthGuard)
@Controller('site-setting')
export class SiteSettingController {
  constructor(private readonly siteSettingService: SiteSettingService) {}

  @Post()
  @Roles(Role.SITE_SETTING_UPDATE)
  @UseInterceptors(
    createUploadInterceptorDifferentName({
      fields: [
        { name: 'logo', maxCount: 1 }, // 1 file for profileImage
        { name: 'favicon', maxCount: 1 }, // 1 file for coverImage
      ],
      destination: './uploads/site-settings',
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    }),
  )
  async create(
    @UploadedFiles() files: { [key: string]: Express.Multer.File[] },
    @Body() createSiteSettingDto: CreateSiteSettingDto,
  ) {
    // Get the uploaded files
    const logoFile = files['logo']?.[0];
    const faviconFile = files['favicon']?.[0];

    // Prepare new file paths
    const logo = logoFile ? logoFile.path : null;
    const favicon = faviconFile ? faviconFile.path : null;

    const result = await this.siteSettingService.create({
      ...createSiteSettingDto,
      logo,
      favicon,
    });

    if (!result) {
      return ResponseHelper.error('Site Setting not created');
    }

    return ResponseHelper.success(result, 'Site Setting created successfully');
  }

  @Get()
  @Roles(Role.SITE_SETTING_ALL)
  async findAll() {
    const result = await this.siteSettingService.findAll();

    // if not found
    if (!result) {
      return ResponseHelper.error('Menu not found');
    }

    // if found
    return ResponseHelper.success(result);
  }
}
