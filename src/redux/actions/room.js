import axios from '../../services/api';

export const findAllRooms = token => dispatch => {
  dispatch({
    type: 'ROOM_PENDING',
  });
  axios({
    method: 'GET',
    url: '/room',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'FIND_ALL_ROOMS',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};

export const addRoom = (name, token) => dispatch => {
  dispatch({
    type: 'ROOM_PENDING',
  });
  axios({
    method: 'POST',
    url: '/room',
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'ADD_ROOM',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};

export const updateRoom = (id, name, token) => dispatch => {
  dispatch({
    type: 'ROOM_PENDING',
  });
  axios({
    method: 'PUT',
    url: '/room/' + id,
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'UPDATE_ROOM',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};
