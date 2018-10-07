import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

class Boards extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    boardsList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_BOARDS_LIST'
    });
  }

  render() {
    console.log('props.boardsList', this.props.boardsList);
    const boardsList = this.props.boardsList || [];

    return (
      <Grid container spacing={16}>
        {boardsList.map(board => <Grid key={board.id} item xl={2}>
          <Link to={`/boards/${board.id}`}>
          
            <Card>
              <CardContent>
                <Typography variant="headline" component="h4"> {board.name} </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>)}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  boardsList: state.boardsList
});

export default connect(mapStateToProps)(Boards);
