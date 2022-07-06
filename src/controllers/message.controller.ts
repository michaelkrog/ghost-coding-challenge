import { Body, Controller, Get, Post } from '@nestjs/common';
import { Message } from 'src/models/message';
import { MessageService } from '../services/message.service';

@Controller('api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  list(): Message[] {
    return this.messageService.findAll();
  }

  @Post()
  create(@Body() message: Message): Message {
    return this.messageService.save(message);
  }
}
