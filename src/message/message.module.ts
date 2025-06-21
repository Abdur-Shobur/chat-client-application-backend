import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageSchema } from './schemas/message.schema';
import { MessageGateway } from './message.gateway';
import { GroupModule } from 'src/group/group.module';
import { Group, GroupSchema } from 'src/group/schemas/group.schema';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: Group.name, schema: GroupSchema }, // ✅ Add this line
    ]),
    GroupModule,
    UserModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
})
export class MessageModule {}
