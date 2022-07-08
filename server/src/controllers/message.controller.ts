import { Body, Controller, Get, MessageEvent, Param, Post, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
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
  async create(@Body() message: Message): Promise<Message> {
    return this.messageService.save(message);
  }

  @Post(':id/actions/vote')
  async vote(@Param('id') id: string): Promise<void> {
    const message = this.messageService.findById(id);
    if(message != null) {
      message.votes++;
    }
    this.messageService.save(message);
  }

  @Sse('actions/stream')
  sse(): Observable<MessageEvent> {
    console.log('subscribe');
    return this.messageService.messageChanges().pipe(map(m => { return {data: m} as MessageEvent}));
  }
}
