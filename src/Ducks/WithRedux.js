import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chatActions from './modules/chat';

export const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ ...chatActions }, dispatch)
  }
};

function mapStateToProps(state) {
  return {
    messagesList: state.chat.messagesList,
    userName: state.chat.userName,
    connections: state.chat.connections
  }
}

const WithRedux = Component => connect(mapStateToProps, mapDispatchToProps)(Component);

export default WithRedux;
