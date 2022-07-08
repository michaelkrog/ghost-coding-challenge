import React, { Component, MouseEvent } from 'react';
import { Message } from '../../models/message';
import Avatar from '../avatar/Avatar';
import './Comment.css';
import { formatDistance } from 'date-fns';

class Comment extends Component<{ message: Message }> {

  onVote(event: MouseEvent) {
    console.log();
  }

  timeDistance() {
    return formatDistance(this.props.message.createdDate, new Date(), { addSuffix: true });
  }

  render() {
    return (
      <div className="comment">
        <Avatar username={this.props.message.username}></Avatar>
        <div className="comment__content">
          <div>
            <span className="comment__name">{this.props.message.name}</span>
            <span className="comment__timestamp">&#183; {this.timeDistance()}</span>
          </div>
          <div className="comment__content__text">{this.props.message.text}</div>
          <div className="comment__actions">
            <button className="comment__actions__upvote text" onClick={ev => this.onVote(ev)}>▲ Upvote ({this.props.message.votes})</button>
            <button className="comment__actions__reply text" disabled>Reply</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;