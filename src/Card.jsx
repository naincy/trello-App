import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {default as MaterialCard} from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class Card extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onCardUpdate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: props.data.text
    }
  }

  handleCardClick() {
    this.setState({editing: true})
  }

  handleCardBlur() {
    this.setState({editing: false});
  }

  handleCardTextChange(event) {
    this.setState({text: event.target.value});
  }

  handleCardChange(event) {
    event.preventDefault();

    this.props.onCardUpdate(this.state.text);
    this.setState({editing: false});
  }

  render() {
    return (
      <MaterialCard style={this.props.style}>
        <CardContent onClick={this.handleCardClick.bind(this)}>
          {this.state.editing ? (
              <form onSubmit={this.handleCardChange.bind(this)}>
                <TextField
                  fullWidth
                  autoFocus
                  onBlur={this.handleCardBlur.bind(this)}
                  onChange={this.handleCardTextChange.bind(this)}
                  value={this.state.text}
                />
              </form>
            ) : (
              <Typography variant="body1">
                {this.props.data ? this.props.data.text : null}
              </Typography>
            )
          }
        </CardContent>
      </MaterialCard>
    );
  }
}
