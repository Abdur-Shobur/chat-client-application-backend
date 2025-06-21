import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomConfigService } from './config/config.service';
import { MongooseExceptionFilter } from './helper/mongo-exception.filter';
import { MigrationService } from './migration/migration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get the custom configuration service
  const configService = app.get(CustomConfigService);

  // Middleware to handle form-data (urlencoded)
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());

  // set global prefix
  app.setGlobalPrefix('api/v1');

  // Enable CORS with specific options
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = configService.frontEndUrls;

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH', // Allowed HTTP methods
    credentials: true, // If you need to send cookies or Authorization headers
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  });

  // Apply ValidationPipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true, // Automatically transforms payloads to match DTOs
      exceptionFactory: (errors) => {
        console.log('Validation errors:', errors);
        return errors;
      },
    }),
  );

  // Apply the custom exception filter globally
  app.useGlobalFilters(new MongooseExceptionFilter());

  // setup swagger
  const config = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('The Test API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'apiKey',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // setup swagger ui
  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'Backend Generator',
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  /* ****
   * Uncomment the following 2 lines to run migrations if needed

    const migrationService = app.get(MigrationService);
    await migrationService.addMissingTypeField();

   * **** */

  // Start the server
  await app.listen(configService.port);

  // Log the server URL
  console.log('run at=> ' + ((await app.getUrl()) + '/api'));
}
bootstrap();
