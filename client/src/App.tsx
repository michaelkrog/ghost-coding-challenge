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
      <h1>Discussion</h1>
        <div className="comment-input">
            <Avatar username='rob'></Avatar>
            <input className="comment-input__input" placeholder="What are your thoughts?" type="text"></input>
            <button className="comment-input__button">Comment</button>
        </div>

        <hr></hr>

        <div className="comments">
          <Comment message={message}></Comment>
        </div>
    </div>
  );
}

export default App;
