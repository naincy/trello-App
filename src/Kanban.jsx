import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Boards from './Boards';
import Board from './Board';

export default class Kanban extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Boards} />
          <Route exact path="/boards/:boardId" render={(props) => <Board id={props.match.params.boardId} /> } />
        </Fragment>
      </Router>
    );
  }
}
