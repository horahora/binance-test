import { triggerSort } from '../actions'
import sortDirection from './sortDirection'

describe('sortDirection reducer', () => {
  it('should handle TRIGGER_SORT', () => {
    expect(sortDirection('DESC', triggerSort('h', 'ASC'))).toEqual('ASC')
  })
})
