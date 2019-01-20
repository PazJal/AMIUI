import {createStore , combineReducers , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import queueReducer from '../reducers/queues';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      queue: queueReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}


