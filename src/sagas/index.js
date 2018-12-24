import { put, call, fork, all, takeEvery } from 'redux-saga/effects'
// import { pingRequested } from '../actions'
import { fetchPing } from '../services/api'
import { PING_REQUESTED, PING_SUCCEEDED } from '../constants/ActionTypes'

function* pingTest() {
  console.log(fetchPing);
  const res = yield call(fetchPing)
  yield put({type: PING_SUCCEEDED, res})
}

function* watchPingTest() {
  yield takeEvery(PING_REQUESTED, pingTest)
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export default function* root() {
  yield all([
    fork(watchPingTest)
  ])
}
