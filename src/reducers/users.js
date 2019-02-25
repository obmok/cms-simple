import { LOAD_USERS, ADD_USER, EDIT_USER, DELETE_USER, INSERT_USER, UPDATE_USER, CANCEL_USER } from '../constants'
import { arrToMap } from './utils'
import { Record } from 'immutable'

const UserRecord = Record({
  id: null,
  name: null,
  lastname: null,
  email: null,
  login: null
})

const ReducerRecord = new Record({
  entities: arrToMap([], UserRecord),
  loading: false,
  loaded: false,
  error: null,
  currentUserId: null,
  editing: false
})

export default (
  usersState = new ReducerRecord(), 
  action
) => {
  const {type, payload, response} = action
  switch (type){
    case ADD_USER:
      return usersState.set('editing', true)
        .set('currentUserId', null)
    
    case EDIT_USER:
      return usersState.set('editing', true)
        .set('currentUserId', payload.id)

    case DELETE_USER:
      return usersState.deleteIn(['entities',payload.id])

    case UPDATE_USER:
      return usersState.updateIn(
          ['entities', payload.id],
          () => payload)
        .set('editing', false)
        .set('currentUserId', null)
        
    case INSERT_USER:
      return usersState.setIn(
          ['entities', payload.id],
          new UserRecord({...payload})
        )
        .set('editing', false)
        .set('currentUserId', null)

    case CANCEL_USER:
      return usersState.set('editing', false)
        .set('currentUserId', null)

    case LOAD_USERS:
        return usersState
        .update('entities', (entities) => arrToMap(response, UserRecord)
        )
        .set('loading', false)
        .set('currentUserId', null)

    default:
      return usersState
  }
}


