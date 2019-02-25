import { Map } from 'immutable'

export function arrToMap(arr, DataModel) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, DataModel ? new DataModel(item) : item),
    new Map({})
  )
}
