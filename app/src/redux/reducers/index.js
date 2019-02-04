import {scheme} from '../store/scheme';
import {API_CALL_SUCCESS, API_CALL_FAILURE, SET_SEARCH, SET_PAGE, SIGN} from '../actions/actions';

export function reducer(state = scheme, action) {
  switch (action.type) {
    case API_CALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case API_CALL_FAILURE:
      return {
        ...state,
        loading: false
      };
    case SIGN:
      return {
        ...state,
        isSignedIn: action.payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        page: 1,
        items: []
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
        loading: true
      };
    default:
      return state;
  }
}