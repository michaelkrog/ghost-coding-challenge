import React, { Component } from "react";
import { Message } from "../../models/message";
import Avatar from "../avatar/Avatar";
import './CommentInput.css';

class CommentInput extends Component<{onMessage?: (message: Message) => void}> {

  onSubmit() {
    if(this.props.onMessage) {
      this.props.onMessage({
        createdDate: new Date(),
        lastModifiedDate: new Date(),
        name: 'Rob Hope',
        username: 'rob',
        text: 'Qwertty',
        votes: 0
      });
    }
  }

  render() {
    return (
      <div className="comment-input">
        <Avatar username='rob'></Avatar>
        <input className="comment-input__input" placeholder="What are your thoughts?" type="text"></input>
        <button className="comment-input__button" onClick={_ => this.onSubmit()}>Comment</button>
      </div>
    );
  }
}

export default CommentInput;