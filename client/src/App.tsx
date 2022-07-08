import React from 'react';
import './App.css';
import Avatar from './components/avatar/Avatar';

function App() {
  return (
    <div className="App">
      <Avatar username='rob'></Avatar>
      <input></input>
      <button>Button</button>
      <button className="text">Text button</button>
      <hr></hr>
    </div>
  );
}

export default App;
