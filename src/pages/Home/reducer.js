import {
  CONTACT_FETCHED,
  DELETE_SUCCESS,
  SUBMIT_SUCCESS,
  LOADING_CONTACT,
  LOADING_DELETE,
  LOADING_SUBMIT
} from './constants';

const initialState = {
  dataContact: [],
  errorMessage: '',
  errMessageDelete: '',
  isLoadingContact: true,
  isLoadingDelete: false,
};

export default function reducer(state = initialState, action = {}) {
  const {
    type,
    dataContact,
    errorMessage,
    errMessageDelete,
    isLoadingContact,
    isLoadingDelete,
    isLoadingSubmit } = action;

  switch (type) {
    case CONTACT_FETCHED:
      return {
        ...state,
        dataContact,
        isLoadingContact: false,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        isLoadingDelete,
        errMessageDelete,
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        errorMessage,
        isLoadingSubmit: false
      };
    case LOADING_CONTACT:
      return {
        ...state,
        isLoadingContact,
      };
    case LOADING_DELETE:
      return {
        ...state,
        isLoadingDelete: true,
      };
    case LOADING_SUBMIT:
      return {
        ...state,
        isLoadingSubmit
      };
    default:
      return state;
  }
}
