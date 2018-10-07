import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import TrelloApp from './TrelloApp';
import Kanban from './Kanban';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(TrelloApp, {
  boardsList: [],
  currentBoard: null
}, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

// store.subscribe(() => {
//   console.log('NEW STATE:', store.getState());
// });

ReactDOM.render((<Provider store={store}>
    <Kanban />
</Provider>), document.getElementById('root'));
