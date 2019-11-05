export const login = data => dispatch => {
  dispatch({
    type: 'LOGGED_IN',
    payload: data,
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: 'LOGGED_OUT',
  });
};