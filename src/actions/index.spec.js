import * as actions from './index'
import * as types from '../constants/ActionTypes'

it('should create an action to trigger sort', () => {
  const sortBy = 'h'
  const sortDirection = 'ASC'
  const expectedAction = {
    type: types.TRIGGER_SORT,
    sortBy,
    sortDirection
  }
  expect(actions.triggerSort(sortBy, sortDirection)).toEqual(expectedAction)
})
