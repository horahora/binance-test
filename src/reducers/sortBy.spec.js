import { triggerSort } from '../actions'
import sortBy from './sortBy'

describe('sortBy reducer', () => {
  it('should handle TRIGGER_SORT', () => {
    expect(sortBy('s', triggerSort('h', 'DESC'))).toEqual('h')
  })
})
