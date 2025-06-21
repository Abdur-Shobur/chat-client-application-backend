import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { TestZodService } from './test-zod.service';
import { CreateTestZodDto } from './dto/create-test-zod.dto';
import { UpdateTestZodDto } from './dto/update-test-zod.dto';
import { ZodValidationPipe } from 'src/helper/zod-validation-pipe';
import { CreateUserSchema } from './zod/test-zod';

@Controller('test-zod')
export class TestZodController {
  constructor(private readonly testZodService: TestZodService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  create(@Body() createUserDto: any) {
    return {
      message: 'User created successfully!',
      data: createUserDto,
    };
  }

  @Get()
  findAll() {
    return this.testZodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testZodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestZodDto: UpdateTestZodDto) {
    return this.testZodService.update(+id, updateTestZodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testZodService.remove(+id);
  }
}
