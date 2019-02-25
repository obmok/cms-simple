import { createSelector } from 'reselect'

export const usersMapSelector = (state) => state.users.entities

export const userCurrentIdSelector = (state) => state.users.currentUserId

export const userEditingSelector = state => state.users.editing

export const idSelector = (_, props) => props.id

export const userCurrentSelector = createSelector(
  usersMapSelector,
  userCurrentIdSelector,
  (usersMap, id) => usersMap.get(id)
)

export const createUserSelector = () => createSelector(
  usersMapSelector,
  idSelector,
  (usersMap, id) => {
    return usersMap.get(id)
  }
)

export const usersListSelector = createSelector(
  usersMapSelector,
  (usersMap) => usersMap.valueSeq().toArray()
)