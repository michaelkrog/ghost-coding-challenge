import React from 'react';
import './App.css';
import Avatar from './components/avatar/Avatar';
import Comment from './components/comment/Comment';
import { Message } from './models/message';

function App() {

  const message: Message = {
    createdDate: new Date(),
    lastModifiedDate: new Date(),
    name: 'Rob Hope',
    username: 'rob',
    text: 'Qwerty 12345',
    votes: 0
  };

  return (
    <div className="App">
      <Avatar username='rob'></Avatar>
      <input></input>
      <button>Button</button>
      <button className="text">Text button</button>
      <hr></hr>
      <Comment message={message}></Comment>
    </div>
  );
}

export default App;
