import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Card from './Card';

const styles = {
  flexContainer: {
    display: 'flex',
    color: 'blue'
  },
  flexItem: {
    width: '300px',
    height: '75px',
    padding: '0.5em'
  }
}

class Board extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    currentBoard: PropTypes.object,
    getCurrentBoard: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      addingList: false,
      addListTitle: ''
    };
  }

  componentDidMount() {
    this.props.getCurrentBoard(this.props.id);
  }

  handleCreateList(event) {
    event.preventDefault();
    const list = {
      id: Math.random()*879979224,
      name: this.state.addListTitle,
      cards: []
    };
    const pos = this.props.currentBoard.lists.length;

    this.setState({addListTitle: ''});
    // this.saveBoard();
    this.props.createList({
      list,
      pos
    })
  }

  handleCreateCard(listId, cardText) {
    this.props.addCard({
      listId,
      text: cardText,
    });
  }

  handleAddListBlur() {
    this.setState({addingList: false});
  }

  handleAddListButton() {
    this.setState({addingList: true});
  }

  handleTitleChange(event) {
    this.setState({addListTitle: event.target.value});
  }

  /* For List */

  mapStateToPropsList(state) {
    return function(listId) {
        return {
          data: state.currentBoard.lists.find( list => list.id === listId)
        }
      
    }
  }

  mapDisptachToPropsList(dispatch) {
    return function(listId) {
      return {
        onCreateCard: (text) => dispatch({
          type: 'UPDATE_STORE',
          payload: {
            listId,
            text,
            type: 'ADD_CARD'
          }
        }),
        onListUpdate: (name) => dispatch({
          type: 'UPDATE_STORE',
          payload: {
            id: listId,
            name,
            type: 'EDIT_LIST'
          }
        }),
      }
    }
  }
  /* For Card */
  mapStateToPropsCard(card) {
    return {
      data: card
    }
  }

  mapDispatchToPropsCard(dispatch) {
    return function({listId, cardId}) {
      return {
          onCardUpdate: (text) => dispatch({
          type: 'UPDATE_STORE',
          payload: {
            cardId,
            listId,
            text,
            type: 'EDIT_CARD'
          }
        }),
      }
    }
  }

  render() {
    const lists = this.props.currentBoard ? this.props.currentBoard.lists : [];

    return (
      <Fragment>
        <div style={styles.flexContainer}>
          {lists.map(list => {
            const Container = connect((state) => {
              return this.mapStateToPropsList(state)(list.id)
            }, (dispatch) => {
              return this.mapDisptachToPropsList(dispatch)(list.id)
            })(List);
            return (
            <Container
              styles={styles.flexItem}
              key={list.id}
            >
            {list.cards.map(card => {
              const CardContainer = connect(
                () => {
                  return this.mapStateToPropsCard(card)
                },
                (dispatch) => {
                  return this.mapDispatchToPropsCard(dispatch)({listId: list.id, cardId:card.id})
                }
              )(Card);
              return (
                <CardContainer
                  key={card.id}
                  style={styles.children}
                />
              )
            })}
            </Container>
          )})}

          {this.state.addingList ? (
            <form onSubmit={this.handleCreateList.bind(this)}>
              <TextField
                style={styles.flexItem}
                autoFocus
                fullWidth
                value={this.state.addListTitle}
                onChange={this.handleTitleChange.bind(this)}
                onBlur={this.handleAddListBlur.bind(this)}
                placeholder="List Name"
              />
            </form>
          ) : (
            <Button
              color="secondary"
              fullWidth
              style={styles.flexItem}
              onClick={this.handleAddListButton.bind(this)}
            >
              New List
            </Button>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBoard: state.currentBoard
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentBoard: (boardId) => dispatch({
    type: 'GET_CURRENT_BOARD',
    payload: {boardId}}),
  createList: ({list, pos}) => dispatch({
    type: 'UPDATE_STORE',
    payload: {
      newlist: list,
      pos,
      type: 'CREATE_LIST'
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
