const initialState = {
  orders: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FIND_ALL_ORDERS':
      return {
        orders: payload,
        isLoading: false,
      };

    case 'CHECKED_IN':      
      return {
        orders: payload,
        isLoading: false,
      };

    case 'CHECKED_OUT':
      return {
        orders: payload,
        isLoading: false,
      };

    case 'ORDER_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
