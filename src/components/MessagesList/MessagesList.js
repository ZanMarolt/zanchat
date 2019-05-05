import React from 'react';
import './MessagesList.css';
import User from '../../utils/User';

const MessagesList = ({ messages }) => <div>
  {
    messages.map((message, id) => {
      return (
        <div className="messages-container" key={id}>
          <p className={message.userName === User.getUsername() ? 'my-message' : 'message'}> {message.message}</p>
        </div>
      );
   })
  }
</div>

export default MessagesList;
