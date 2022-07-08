import React, { Component } from 'react';
import './App.css';
import Avatar from './components/avatar/Avatar';
import Comment from './components/comment/Comment';
import { Message } from './models/message';

class App extends Component<{}, { messages: Message[] }> {

  state = { messages: [] };

  componentDidMount() {
    fetch('/api/messages', { headers: { accept: 'application/json' }, cache: 'no-cache' })
      .then(response => response.json())
      .then(messages => this.setState({ messages }));
  }

  render() {
    return (

      <div className="App">
        <h1>Discussion</h1>
        <div className="comment-input">
          <Avatar username='rob'></Avatar>
          <input className="comment-input__input" placeholder="What are your thoughts?" type="text"></input>
          <button className="comment-input__button">Comment</button>
        </div>

        <hr></hr>

        <div className="comments">
          {this.state.messages.map((message: Message) => <Comment key={message.id} message={message}></Comment>)}
        </div>
      </div>
    );
  }
}

export default App;
