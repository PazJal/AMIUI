import {createStore , combineReducers , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import queueReducer from '../reducers/queues';
import peerReducer from '../reducers/peers';
import trunkReducer from '../reducers/trunks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      queue: queueReducer,
      peer: peerReducer,
      trunks: trunkReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}


