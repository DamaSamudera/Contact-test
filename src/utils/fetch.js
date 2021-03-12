import axios from 'axios';

const API = (endpoint) => `https://simple-contact-crud.herokuapp.com/${endpoint}`;

const fetch = (url, method, param1, param2) => {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then((res) => resolve(res.data))
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.',
        };

        if (!err.response) {
          reject(defaultError);
        } else if (!err.response.data) {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
};

export const getContact = async (id) =>
  fetch(`${API('contact')}`, 'get', id, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const postContact = async (data) =>
  fetch(`${API('contact')}`, 'post', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteContact = async (id) =>
  fetch(`${API(`contact`)}`, 'delete', {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      id: id
    }
  });

export const updateContact = async (data) =>
  fetch(`${API('contact')}`, 'put', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
