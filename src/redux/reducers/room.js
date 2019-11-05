const initialState = {
  rooms: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'FIND_ALL_ROOMS':
      return {
        rooms: [...payload, {}],
        isLoading: false,
      };

    case 'ADD_ROOM':
      const data = [...state.rooms];
      data.splice(data.length - 1, 0, payload);
      return {
        rooms: data,
        isLoading: false,
      };

    case 'UPDATE_ROOM':
      return {
        rooms: [...payload, {}],
        isLoading: false,
      };

    case 'ROOM_PENDING':
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
