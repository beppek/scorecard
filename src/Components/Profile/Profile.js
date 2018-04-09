import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import moment from 'moment';
import * as userActions from "../../Redux/actions/userActions";

class Profile extends Component {
  componentDidMount() {
    const { user, scores } = this.props;
    if (user) {
      this.props.getScores(user.uid);
    }
  }

  render() {
    const { user, scores } = this.props;
    // console.log(user);
    console.log(scores);
    let scoreList = [];
    if (scores.length !== 0) {
      scores.forEach(score => {
        const timeCreated = moment(score.value.data.timeCreated).format(
          'YYYY-MM-DD HH:mm'
        );
        console.log(score);
        scoreList.push(<ListItem key={score.key} primaryText={timeCreated} />);
      });
    }
    return (
      <div>
        <h3>
          Welcome to your profile, {user !== null ? user.displayName : ""}
        </h3>
        <List>
          <Subheader>Scores</Subheader>
          {scoreList}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.courses.user,
    scores: state.user.scores
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getScores: userId => userActions.getScores(dispatch, userId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
