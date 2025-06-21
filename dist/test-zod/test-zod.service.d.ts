import { CreateTestZodDto } from './dto/create-test-zod.dto';
import { UpdateTestZodDto } from './dto/update-test-zod.dto';
export declare class TestZodService {
    create(createTestZodDto: CreateTestZodDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTestZodDto: UpdateTestZodDto): string;
    remove(id: number): string;
}
