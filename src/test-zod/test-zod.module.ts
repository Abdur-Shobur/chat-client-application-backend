import { Module } from '@nestjs/common';
import { TestZodService } from './test-zod.service';
import { TestZodController } from './test-zod.controller';

@Module({
  controllers: [TestZodController],
  providers: [TestZodService],
})
export class TestZodModule {}
