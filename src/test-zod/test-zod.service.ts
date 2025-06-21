import { Injectable } from '@nestjs/common';
import { CreateTestZodDto } from './dto/create-test-zod.dto';
import { UpdateTestZodDto } from './dto/update-test-zod.dto';

@Injectable()
export class TestZodService {
  create(createTestZodDto: CreateTestZodDto) {
    return 'This action adds a new testZod';
  }

  findAll() {
    return `This action returns all testZod`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testZod`;
  }

  update(id: number, updateTestZodDto: UpdateTestZodDto) {
    return `This action updates a #${id} testZod`;
  }

  remove(id: number) {
    return `This action removes a #${id} testZod`;
  }
}
