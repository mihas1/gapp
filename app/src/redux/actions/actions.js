export const SIGN = "SIGN";
export const SET_SEARCH = "SET_SEARCH";
export const SET_PAGE = "SET_PAGE";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";

export function signInAction(signed) {
  return {
    type: SIGN,
    payload: signed,
  }
}

export function setSearchAction(string) {
  return {
    type: SET_SEARCH,
    payload: string,
  }
}

export function setPageAction(page) {
  return {
    type: SET_PAGE,
    payload: page,
  }
}

export function apiRequestSuccessAction(items) {
  return {
    type: API_CALL_SUCCESS,
    payload: items
  }
}

export function apiRequestFailureAction() {
  return {
    type: API_CALL_FAILURE
  }
}
