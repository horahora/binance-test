import { connect } from 'react-redux'
import TickerTable from '../../components/TickerTable'
import { triggerSort } from '../../actions'

function mapStateToProps(state) {
  const { sortBy, sortDirection } = state
  return {
    sortBy,
    sortDirection
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    sort: ({sortBy, sortDirection}) => dispatch(triggerSort(sortBy, sortDirection)),
    handleTickerClick: (e) => ownProps.history.push(`/trade/${e.rowData.s}`)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TickerTable)
