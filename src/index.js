import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './App.css';
import TypeArea from './components/TypeArea';
import MessagesList from './components/MessagesList';
import Header from './components/Header/Header.js';
import { WithRedux, initStore } from './Ducks';
import { Provider } from 'react-redux';

const SOCKET_PORT = process.env.PORT ? 'https://zan-chat.herokuapp.com/' : 'http://localhost:8080/';
const store = initStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io.connect(SOCKET_PORT);
    this.lastScrollPosition = null;
  }

  componentDidUpdate() {
    const div = document.getElementById('messages-list');
    if (!this.lastScrollPosition || this.lastScrollPosition === div.scrollTop) {
      const newPos = div.scrollHeight - div.clientHeight;
      div.scrollTop = newPos;
      this.lastScrollPosition = newPos;
    }
  }

  render() {
    const { userName } = this.props;
    const { sendMessage } = this.props.actions;

    return (
      <div className="app">
        <div className="app-chat">
          <Header connections={this.props.connections}/>
          <div className="messages-list" id="messages-list">
            <MessagesList messages={this.props.messagesList} />
          </div>
          <TypeArea
            onEnterPress={message => sendMessage(this.socket, userName, message)}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { listenNewMessage, getUser, listenConnections } = this.props.actions;

    listenConnections(this.socket);
    listenNewMessage(this.socket);
    getUser(this.socket);
  }
}

const Main = WithRedux(App);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
);
