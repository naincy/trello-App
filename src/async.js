const { createStore, applyMiddleware } = require('redux');
const createSagaMiddleware = require('redux-saga').default;
const { takeLatest, takeEvery } = require('redux-saga');
const { call, put } = require('redux-saga/effects');
const axios = require('axios');

const TrelloApp = require('./TrelloApp');

const currState = {
  currentBoard: {}
}

const action = {
  type: 'GET_CURRENT_BOARD',
  payload: {
    boardId: 1
  }
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(TrelloApp, currState, applyMiddleware(sagaMiddleware));

function getBoard(boardId) {
  return axios.get(`http://localhost:3000/api/board/${boardId}`).then(result => new Promise((resolve, reject) => resolve(result.data)));
}

function* getCurrentBoard(action) {
  const board = yield call(getBoard, action.payload.boardId);
  yield put({
    type: 'SET_CURRENT_BOARD',
    payload: board
  });
}

function* saveToServer() {

}

sagaMiddleware.run(function* () {
  console.log('Registering Watchers');
  yield takeLatest('GET_CURRENT_BOARD', getCurrentBoard);
  yield takeEvery('ADD_CARD', saveToServer);
});

store.subscribe(() => {
  console.log('Updated State:', store.getState());
});

store.dispatch(action);
store.dispatch(action);
