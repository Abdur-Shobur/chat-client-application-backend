## Init Setup in APP Module

```ts
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Expose files via /uploads/<filename>
    }),
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Use Case

**Only Single File**

```ts
  // Single File Upload
  @Post('single')
  @UseInterceptors(
    createUploadInterceptor({
      fieldName: 'file',
      destination: './uploads/single',
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    }),
  )
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
     return {
      message: 'Single file uploaded successfully',
      file,
    };
  }
```

**Multiple Single File**

```ts
  // Multiple Files Upload
  @Post('multiple')
  @UseInterceptors(
    createUploadInterceptor({
      fieldName: 'files',
      destination: './uploads/multiple',
      maxFiles: 5,
      maxFileSize: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ['image/jpeg', 'image/png'],
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
     return {
      message: 'Multiple files uploaded successfully',
      files,
    };
  }
```

**Multiple File Different Name And Body Data**

```ts
  // Multiple Files different name and also body data
  @Post()
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
```
