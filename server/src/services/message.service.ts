import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Message } from 'src/models/message';

@Injectable()
export class MessageService {

  
  private changeObservable = new Subject<Message>();

  private messages: Message[] = [
    { id: 'mesg-1', username: 'rob', name: 'Rob Hope', createdDate: new Date(), lastModifiedDate: new Date(), text: `Jeepers now that's a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.`, votes:0},
    { id: 'mesg-2', username: 'sophie', name: 'Sophie Brecht', createdDate: new Date(), lastModifiedDate: new Date(), text: `Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)`, votes: 0},
    { id: 'mesg-3', username: 'cameron', name: 'Cameron Lawrence', createdDate: new Date(), lastModifiedDate: new Date(), text: `Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I'll be recommending then...`, votes: 0}
];

  findById(id: string) {
    return this.messages.find(m => m.id === id);
  }

  findAll(): Message[] {
    return this.messages;
  }

  save(message: Message): Message {
    message.lastModifiedDate = new Date();
    if(message.id == null) {
      message.id = `mesg-${new Date().toISOString()}`;
      message.votes = 0;
      message.createdDate = new Date();
    } else {
      const index = this.messages.map(m => m.id).indexOf(message.id);
      if(index >= 0) {
        this.messages.splice(index, 1);
      }
    }
    this.messages.push(message);
    this.messages.sort((a, b) => {
      let result = b.votes - a.votes; // Sort by votes
      return result != 0 ? result : a.lastModifiedDate.getTime() - b.lastModifiedDate.getTime(); // or by time of last modification if votes are equal
    });
    
    this.onMessageChange(message);
    return message;
  }

  messageChanges(): Observable<Message> {
    return this.changeObservable;
  }

  private onMessageChange(message: Message) {
    this.changeObservable.next(message);
  }
}
