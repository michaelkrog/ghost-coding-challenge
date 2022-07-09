import React, { Component } from 'react';
import './App.css';
import CommentInput from './components/comment-input/CommentInput';
import Comment from './components/comment/Comment';
import { Message } from './models/message';

class App extends Component<{}, { messages: Message[] }> {

  state = { messages: [] };
  eventSource = new EventSource('/api/messages/actions/stream');

  componentDidMount() {
    this.eventSource.onmessage = ({ data }) => {
      this.fetchMessages();
    };
    this.fetchMessages();
  }

  mapDates(message: Message) {
    message.createdDate = new Date(message.createdDate);
    message.lastModifiedDate = new Date(message.lastModifiedDate);
    return message;
  }

  fetchMessages() {
    return fetch('/api/messages', { headers: { accept: 'application/json' }, cache: 'no-cache' })
      .then(response => response.json() as Promise<Message[]>)
      .then(messages => messages.map(m => this.mapDates(m)))
      .then(messages => this.setState({ messages }));
  }

  postMessage(message: Message): Promise<Message> {
    const options = {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return fetch('/api/messages', options)
      .then(response => response.json() as Promise<Message>)
      .then(message => this.mapDates(message));
  }

  vote(id: string) {
    return fetch(`/api/messages/${id}/actions/vote`, { method: 'POST' });
  }

  onVote(message: Message) {
    this.vote(message.id!).then(() => this.fetchMessages());
  }

  onMessage(message: Message) {
    this.postMessage(message);
  }

  renderComment(message: Message, children: Message[]) {
    return <Comment
      key={message.id}
      message={message}
      onVote={m => this.onVote(m)}
      onReply={m => this.onMessage(m)}
      children={children}></Comment>;
  }

  render() {
    return (

      <div className="app">
        <h1>Discussion</h1>
        <CommentInput onMessage={message => this.onMessage(message)}></CommentInput>

        <hr></hr>

        <div className="comments">
          {this.state.messages.filter((message: Message) => message.parentId == null).map((message: Message) =>
            this.renderComment(message, this.state.messages.filter((child: Message) => child.parentId === message.id))
          )}
        </div>
      </div>
    );
  }
}

export default App;
