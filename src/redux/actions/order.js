import axios from '../../services/api';

export const findAllOrders = token => dispatch => {
  dispatch({
    type: 'ORDER_PENDING',
  });
  axios({
    method: 'GET',
    url: '/checkin',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'FIND_ALL_ORDERS',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error, '==== find');
    });
};

export const checkIn = (data, token) => dispatch => {
  dispatch({
    type: 'ORDER_PENDING',
  });
  axios({
    method: 'POST',
    url: '/checkin',
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'CHECKED_IN',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};

export const checkOut = (id, token) => dispatch => {
  dispatch({
    type: 'ORDER_PENDING',
  });
  axios({
    method: 'PUT',
    url: '/order/' + id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      console.log(data);
      dispatch({
        type: 'CHECKED_OUT',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};
