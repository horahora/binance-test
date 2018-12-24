import { put, call, fork, all, take, takeEvery, select } from 'redux-saga/effects'
// import { pingRequested } from '../actions'
import { fetchPing } from '../services/api'
import { PING_REQUESTED, PING_SUCCEEDED, PING_FAILED } from '../constants/ActionTypes'

function* pingTest() {
  try {
    console.log(fetchPing);
    const data = yield call(fetchPing)
    console.log('lll',data);
    yield put({type: PING_SUCCEEDED, data})
  } catch (error) {
    yield put({type: PING_FAILED, error })
  }

}

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()
    console.log('action', action)
    console.log('state after', state)
  }
}

function* watchPingTest() {
  while (true) {
    yield take(PING_REQUESTED)
    yield call(pingTest)
  }
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export default function* rootSaga() {
  yield all([
    fork(watchPingTest),
    fork(watchAndLog)
  ])
}
