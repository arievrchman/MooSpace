const initialState = {
  email: '',
  token: '',
  isLogin: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGGED_IN':
      return {
        user: payload.email,
        token: payload.access_token,
        isLogin: true,
      };

    case 'LOGGED_OUT':
      return {
        user: '',
        token: '',
        isLogin: false,
      };

    default:
      return state;
  }
};
