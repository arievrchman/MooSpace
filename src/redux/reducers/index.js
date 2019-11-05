import {combineReducers} from 'redux';

import auth from './auth';
import room from './room';
import customer from './customer';
import order from './order';

const appReducers = combineReducers({
  auth: auth,
  room: room,
  customer: customer,
  order: order,
});

const rootReducers = (state, action) => {
  if (action.type === 'LOGGED_OUT') {
    state = undefined;
  }

  return appReducers(state, action);
};

export default rootReducers;
