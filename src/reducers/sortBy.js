import { TRIGGER_SORT } from '../constants/ActionTypes'

function sortBy(state = 'q', action) {
  switch (action.type) {
    case TRIGGER_SORT:
      return action.sortBy
    default:
      return state
  }
}

export default sortBy
