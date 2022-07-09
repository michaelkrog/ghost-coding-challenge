import React, { Component } from "react";
import { Message } from "../../models/message";
import Avatar from "../avatar/Avatar";
import './CommentInput.css';

type User = {
  username: string;
  name: string;
};

const USERS: User[] = [
  { username: 'rob', name: 'Rob Hope' },
  { username: 'sophie', name: 'Sophie Brecht' },
  { username: 'cameron', name: 'Cameron Lawrence' },
  { username: 'james', name: 'James' }
];

class CommentInput extends Component<{ onMessage?: (message: Message) => void }, { user: User, text: string }> {

  state = {
    user: USERS[0],
    text: ''
  };

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({ text: '' });
    this.selectRandomUser();
  }

  selectRandomUser() {
    const user = USERS[Math.floor(Math.random() * 4)];
    this.setState({ user })
  }

  onSubmit() {
    if (this.props.onMessage) {
      this.props.onMessage({
        createdDate: new Date(),
        lastModifiedDate: new Date(),
        name: this.state.user.name,
        username: this.state.user.username,
        text: this.state.text,
        votes: 0
      });
    }
    this.reset();
  }

  onInput(event: React.FormEvent) {
    this.setState({ text: (event.target as HTMLInputElement).value })
  }

  render() {
    return (
      <div className="comment-input">
        <Avatar username={this.state.user.username}></Avatar>
        <input className="comment-input__input" placeholder="What are your thoughts?" value={this.state.text} type="text" onInput={ev => this.onInput(ev)}></input>
        <button className="comment-input__button" onClick={_ => this.onSubmit()}>Comment</button>
      </div>
    );
  }
}

export default CommentInput;