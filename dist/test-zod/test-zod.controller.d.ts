import { TestZodService } from './test-zod.service';
import { UpdateTestZodDto } from './dto/update-test-zod.dto';
export declare class TestZodController {
    private readonly testZodService;
    constructor(testZodService: TestZodService);
    create(createUserDto: any): {
        message: string;
        data: any;
    };
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTestZodDto: UpdateTestZodDto): string;
    remove(id: string): string;
}
