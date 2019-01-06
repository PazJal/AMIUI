import authReducer from '../../reducers/auth';

test('Should set default statea' , () => {
  const state = authReducer(undefined , {type: '@@INIT'});
  expect(state).toEqual({});
});

test('Should set state when login in.' , () => {
  const uid = '1234';
  const action = {
    type: 'LOGIN',
    uid
  }
  const state = authReducer({} ,action );
  expect(state).toEqual({uid});
});

test('should reset the state when login out.' , () => {
  const action = {
    type: 'LOGOUT'
  }
  const state = authReducer({uid:'test'} , action);
  expect(state).toEqual({});
});