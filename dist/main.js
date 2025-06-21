"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_service_1 = require("./config/config.service");
const mongo_exception_filter_1 = require("./helper/mongo-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_service_1.CustomConfigService);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: (origin, callback) => {
            const allowedOrigins = configService.frontEndUrls;
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error(`CORS blocked for origin: ${origin}`));
            }
        },
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
        allowedHeaders: 'Content-Type,Authorization',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        exceptionFactory: (errors) => {
            console.log('Validation errors:', errors);
            return errors;
        },
    }));
    app.useGlobalFilters(new mongo_exception_filter_1.MongooseExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
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
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory, {
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
    await app.listen(configService.port);
    console.log('run at=> ' + ((await app.getUrl()) + '/api'));
}
bootstrap();
//# sourceMappingURL=main.js.map