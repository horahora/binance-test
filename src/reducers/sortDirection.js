import { TRIGGER_SORT } from '../constants/ActionTypes'

function sortDirection(state = 'DESC', action) {
  switch (action.type) {
    case TRIGGER_SORT:
      return action.sortDirection
    default:
      return state
  }
}

export default sortDirection
