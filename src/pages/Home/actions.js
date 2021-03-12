import { deleteContact, getContact, postContact } from '../../utils/fetch';
import {
  CONTACT_FETCHED,
  DELETE_SUCCESS,
  SUBMIT_SUCCESS,
  LOADING_CONTACT,
  LOADING_DELETE,
  LOADING_SUBMIT } from './constants';

export function fetchContact() {
  return (dispatch) => {
    dispatch(loadingContact(true));

    getContact()
      .then((res) => {
        dispatch(dataContactFetched(res.data));
      })
      .catch(() => {
        dispatch(dataContactFetched([]));
      });
  };
}

export function createContact(payload) {
  return dispatch => {
    const data = JSON.stringify(payload);

    dispatch(loadingSubmit(true));

    postContact(data)
      .then(() => {
        dispatch(successSubmit(''));
        location.href='/';
      })
      .catch(err => {
        let message = 'Contact Fail Added';
        if (err.code !== 400) {
          message = err.message;
          dispatch(successSubmit(message));
        }
      });
  };
}

export function deleteData(id) {
  return (dispatch) => {
    dispatch(loadingDelete());

    deleteContact(id)
      .then(() => {
        dispatch(deleteSuccess('Contact Deleted Successfully'));
      })
      .catch((err) => {
        let message = 'Contact Failed to Delete';
        if (err.code !== 400) {
          message = err.message;
        }
        dispatch(deleteSuccess(message));
        dispatch(dataContactFetched([]));
      });
  };
}

function dataContactFetched(dataContact) {
  return {
    type: CONTACT_FETCHED,
    dataContact,
  };
}

function deleteSuccess(errMessageDelete) {
  return {
    type: DELETE_SUCCESS,
    errMessageDelete,
  };
}

function successSubmit(errorMessage) {
  return { type: SUBMIT_SUCCESS, errorMessage };
}

function loadingSubmit(isLoadingSubmit) {
  return { type: LOADING_SUBMIT, isLoadingSubmit };
}


function loadingContact(isLoadingContact) {
  return { type: LOADING_CONTACT, isLoadingContact };
}

function loadingDelete() {
  return { type: LOADING_DELETE };
}
