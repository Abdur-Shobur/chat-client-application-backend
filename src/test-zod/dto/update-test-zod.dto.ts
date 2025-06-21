import { PartialType } from '@nestjs/swagger';
import { CreateTestZodDto } from './create-test-zod.dto';

export class UpdateTestZodDto extends PartialType(CreateTestZodDto) {}
