import {login , logout} from '../../actions/auth';

test('shold generate a login action with uid' , () => {
  const uid = '12345';
  const action = login(uid);
  expect(action).toEqual({
    type:'LOGIN',
    uid
  });
});

test('should generate a logout action' , () => {
  const action = logout();
  expect(action).toEqual({type:'LOGOUT'});
});