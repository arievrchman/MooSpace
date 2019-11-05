const initialState = {
  customers: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FIND_ALL_CUSTOMERS':
      return {
        customers: payload,
        isLoading: false,
      };

    case 'ADD_CUSTOMER':
      return {
        customers: [...state.customers, payload],
        isLoading: false,
      };

    case 'EDIT_CUSTOMER':
      const updateState = state.customers.map(item => {
        if (item.id == payload.id) {
          Object.assign(item, payload);
        }
        return item;
      });
      return {
        customers: updateState,
        isLoading: false,
      };

    case 'CUSTOMER_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
