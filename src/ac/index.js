import {
  LOAD_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER, 
  INSERT_USER,
  UPDATE_USER,
  CANCEL_USER
} from '../constants'


export function addUser() {
  return {
    type: ADD_USER
  }
}

export function editUser(id) {
  return {
    type: EDIT_USER,
    payload: { id }
  }
}

export function deleteUser(id) {
  return {
    type: DELETE_USER,
    payload: { id },
    callAPI: '/users',
    method: 'delete'
  }
}

export function insertUser(user) {
  return {
    type: INSERT_USER,
    payload:  user ,
    callAPI: '/users',
    method: 'post'
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload:  user ,
    callAPI: '/users',
    method: 'put'
  }
}

export function cancelUser(user) {
  return {
    type: CANCEL_USER,
    payload:  user 
  }
}

export function loadUsers() {
  return {
    type: LOAD_USERS,
    callAPI: '/users',
    method: 'get'
  }
}