import axios from '../../services/api';

export const findAllCustomers = token => dispatch => {
  dispatch({
    type: 'CUSTOMER_PENDING',
  });
  axios({
    method: 'GET',
    url: '/customer',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'FIND_ALL_CUSTOMERS',
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};

export const submitCustomer = (data, token, method) => dispatch => {
  const url = method == 'POST' ? '/customer' : `/customer/${data.customerId}`
  dispatch({
    type: 'CUSTOMER_PENDING',
  });
  axios({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(({data}) => {
      const type = method == 'POST' ? 'ADD_CUSTOMER' : 'EDIT_CUSTOMER';
      dispatch({
        type,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response.data.error);
    });
};

export const editCustomer = (data, token) => dispatch => {};
