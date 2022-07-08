import React, { Component } from 'react';
import './App.css';
import CommentInput from './components/comment-input/CommentInput';
import Comment from './components/comment/Comment';
import { Message } from './models/message';

class App extends Component<{}, { messages: Message[] }> {

  state = { messages: [] };

  componentDidMount() {
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
      .then(messages => this.setState({messages}));
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
    this.postMessage(message).then(() => {
      this.fetchMessages();
    });
  }

  render() {
    return (

      <div className="App">
        <h1>Discussion</h1>
        <CommentInput onMessage={message => this.onMessage(message)}></CommentInput>

        <hr></hr>

        <div className="comments">
          {this.state.messages.map((message: Message) => <Comment key={message.id} message={message}></Comment>)}
        </div>
      </div>
    );
  }
}

export default App;
