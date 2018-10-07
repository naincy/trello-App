import { call, put, takeLatest, select } from 'redux-saga/effects';
import { getBoard, getAllBoards, saveToStore } from './services';

function* getBoardsList(action) {
  const boards = yield call(getAllBoards, null);
  console.log('BOARDS FROM SAGAS:', boards);
  yield put({ type: 'SET_BOARDS_LIST', payload: boards });
}

function* getCurrentBoard(action) {
  const board = yield call(getBoard, action.payload.boardId);
  yield put({type: 'SET_CURRENT_BOARD', payload: board});
}

function* updateStore(action) {
  yield put({
    type: action.payload.type,
    payload: action.payload,
  })

  const state = yield select();

  yield call(saveToStore, state);
}

export default function* sagas() {
  yield takeLatest('GET_BOARDS_LIST', getBoardsList);
  yield takeLatest('GET_CURRENT_BOARD', getCurrentBoard);
  yield takeLatest('UPDATE_STORE', updateStore);
}
