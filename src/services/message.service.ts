import { Injectable } from '@nestjs/common';
import { Message } from 'src/models/message';

@Injectable()
export class MessageService {

  private messages: Message[] = [
    { username: 'rob', name: 'Rob Hope', timestamp: new Date(), text: `Jeepers now that's a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.`},
    { username: 'sophie', name: 'Sophie Brecht', timestamp: new Date(), text: `Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)`},
    { username: 'cameron', name: 'Cameron Lawrence', timestamp: new Date(), text: `Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I'll be recommending then...`}
];

  findAll(): Message[] {
    return this.messages;
  }

  save(message: Message): Message {
    if(message.id == null) {
      message.id = `mesg-${new Date().toISOString()}`;
    } else {
      const index = this.messages.map(m => m.id).indexOf(message.id);
      if(index >= 0) {
        this.messages.splice(index, 1);
      }
    }
    this.messages.push(message);
    this.messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    return message;
  }
}
