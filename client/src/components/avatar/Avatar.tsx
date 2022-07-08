import React, { Component } from 'react';
import './Avatar.css';

class Avatar extends Component<{username: string}> {
  render() {
    return (
      <img id="comment-avatar" alt={this.props.username} className="avatar" src={`/avatars/${this.props.username}.png`}></img>
    );
  }
}

export default Avatar;
