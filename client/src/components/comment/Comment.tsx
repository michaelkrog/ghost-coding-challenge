import React, { Component, MouseEvent } from 'react';
import { Message } from '../../models/message';
import Avatar from '../avatar/Avatar';
import './Comment.css';
import { formatDistance } from 'date-fns';
import CommentInput from '../comment-input/CommentInput';

type CommentProps = {
  message: Message;
  parentId?: string;
  onVote?: (message: Message) => void;
  onReply?: (message: Message) => void;
  children?: Message[]
}

type CommentState = {
  inputActive: boolean
}

class Comment extends Component<CommentProps, CommentState> {

  state = {
    inputActive: false
  }

  onVote(message: Message) {
    if (this.props.onVote) {
      this.props.onVote(message);
    }
  }

  onReply(_: MouseEvent) {
    this.setState({ inputActive: !this.state.inputActive });
  }

  onReplySubmit(message: Message) {
    if (this.props.message.parentId != null) {
      message.parentId = this.props.message.parentId;
    } else {
      message.parentId = this.props.message.id;
    }

    if (this.props.onReply) {
      this.props.onReply(message);
    }
    this.setState({ inputActive: false });
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
            <button className="comment__actions__upvote text" onClick={ev => this.onVote(this.props.message)}>▲ Upvote ({this.props.message.votes})</button>
            <button className="comment__actions__reply text" onClick={ev => this.onReply(ev)}>Reply</button>
          </div>
          {this.props.children ? this.props.children.map(child =>
            <Comment message={child} key={child.id} parentId={child.parentId} onVote={() => this.onVote(child)} onReply={message => this.onReplySubmit(message)}></Comment>
          ) : null}
          {this.state.inputActive ? <CommentInput onMessage={message => this.onReplySubmit(message)}></CommentInput> : null}

        </div>
      </div>
    );
  }
}

export default Comment;