
import User from '../../utils/User';

const REGISTER_NEW_MESSAGE_LISTEN = 'chat/REGISTER_NEW_MESSAGE_LISTEN';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';
const UPDATE_MESSAGES_LIST = 'chat/UPDATE_MESSAGES_LIST';
const GET_USER = 'chat/GET_USER';
const CONNECTIONS_UPDATED = 'chat/CONNECTIONS_UPDATED';

export const sendMessage = (socket, userName, message) => dispatch => {
  const newMessage = { userName, message };
  dispatch({ type: SEND_MESSAGE });
  socket.emit('send_message', newMessage);
  dispatch({ type: UPDATE_MESSAGES_LIST, payload: { newMessage  } });
};

export const getUser = (socket) => dispatch => {
  const { name, color } = User.getUser();
  dispatch({ type: GET_USER, payload: { name, color } });
};

export const listenNewMessage = (socket) => dispatch => {
  dispatch({ type: REGISTER_NEW_MESSAGE_LISTEN });
  socket.on('new_message', newMessage => {
    dispatch({ type: UPDATE_MESSAGES_LIST , payload: { newMessage } })
  });
};

export const listenConnections = (socket) => dispatch => {
  socket.on('connections', connections => {
    dispatch({ type: CONNECTIONS_UPDATED , payload: { connections } })
  });
};

const initialState = {
  userName: '',
  messagesList: [],
  connections: 0
};

export default function reducer(state = initialState, action){
  switch (action.type) {
    case GET_USER:
      const { name, color } = action.payload;

      return {
        ...state,
        userName: name,
        userColor: color
      }
    case UPDATE_MESSAGES_LIST:
      const { newMessage } = action.payload;

      return {
        ...state,
        messagesList: [
          ...state.messagesList,
          newMessage
        ]
      }
    case CONNECTIONS_UPDATED:
      const { connections } = action.payload;

      return {
        ...state,
        connections
      }
    default: return state
  }
};
