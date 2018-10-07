import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  listPaper: {
    padding: '0.2em',
    backgroundColor: '#e4e4e4'
  }
}

export default class Lists extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onCreateCard: PropTypes.func.isRequired,
    onListUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      addCardText: '',
      addingCard: false,
      editing: false,
      name: props.data.name
    }
  }

  handleAddCardButton() {
    this.setState({addingCard: true});
  }

  handleAddCardBlur() {
    this.setState({addingCard: false});
  }

  handleListTextChange(event) {
    this.setState({name: event.target.value});
  }

  handleListUpdate(event) {
    event.preventDefault();
    this.props.onListUpdate(this.state.name);
    this.setState({editing: false});
  }

  handleTextChange(event) {
    this.setState({addCardText: event.target.value});
  }

  handleCreateCard(event) {
    event.preventDefault();
    if(!this.state.addCardText) { return; }
    this.props.onCreateCard(this.state.addCardText);
    this.setState({addCardText: ''});
  }

  handleEditList() {
    this.setState({editing: true});
  }

  handleEditListBlur() {
    this.setState({editing: false});
  }

  render() {
    return (
      <div style={this.props.styles}>
        <Paper style={styles.listPaper}>
          <Typography variant="title" onClick={this.handleEditList.bind(this)}>
            {
              this.state.editing ? (
                <form onSubmit={this.handleListUpdate.bind(this)}>
                  <TextField
                    autoFocus
                    fullWidth
                    placeholder="Type List name"
                    value={this.state.name}
                    onChange={this.handleListTextChange.bind(this)}
                    onBlur={this.handleEditListBlur.bind(this)}
                  />
                </form>
              ) : this.props.data.name
            }
          </Typography>
          {this.props.children}
          {this.state.addingCard ? (
              <form onSubmit={this.handleCreateCard.bind(this)}>
                <TextField
                  autoFocus
                  fullWidth
                  placeholder="Add Card"
                  onBlur={this.handleAddCardBlur.bind(this)}
                  value={this.state.addCardText}
                  onChange={this.handleTextChange.bind(this)}
                />
              </form>
            ) : (
              <Button
                color="primary"
                fullWidth
                onClick={this.handleAddCardButton.bind(this)}
              >
                Add card
              </Button>
            )}
        </Paper>
      </div>
    );
  }
}
