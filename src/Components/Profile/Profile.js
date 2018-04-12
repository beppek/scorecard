import React, { Component } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import Subheader from "material-ui/Subheader";
import moment from "moment";
import * as userActions from "../../Redux/actions/userActions";
import * as coursesActions from "../../Redux/actions/coursesActions";
import history from "../../history";

class Profile extends Component {
  componentDidMount() {
    const { user, scores } = this.props;
    if (user) {
      this.props.getScores(user.uid);
    }
  }

  handleRoundClick = roundInfo => {
    this.props.getCourseInfo(roundInfo.value.data.course);
    history.push(`/profile/scores/${roundInfo.key}`);
  };

  render() {
    const { user, scores } = this.props;
    let scoreList = [];
    if (scores.length !== 0) {
      scores.forEach(score => {
        const timeCreated = moment(score.value.data.timeCreated).format(
          "YYYY-MM-DD HH:mm"
        );
        let { roundScore } = score.value.data;
        roundScore = roundScore > 0 ? `+${roundScore}` : roundScore;
        scoreList.push(
          <ListItem
            key={score.key}
            onClick={() => this.handleRoundClick(score)}
            primaryText={`${timeCreated} | Total Score: ${roundScore}`}
          />
        );
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
    getCourseInfo: key => coursesActions.getCourseInfo(dispatch, key),
    getScores: userId => userActions.getScores(dispatch, userId)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
