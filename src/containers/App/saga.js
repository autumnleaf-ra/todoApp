import { takeLatest, call, put } from 'redux-saga/effects';

import { getData } from '@domain/api';
import { showPopup, setLoading, setData } from '@containers/App/actions';
import { GET_DATA } from '@containers/App/constants';

function* doGetData() {
  yield put(setLoading(true));
  try {
    const response = yield call(getData);
    if (response) {
      yield put(setData(response.data));
    }
  } catch (error) {
    yield put(showPopup());
  }
  yield put(setLoading(false));
}

export default function* appSaga() {
  yield takeLatest(GET_DATA, doGetData);
}
