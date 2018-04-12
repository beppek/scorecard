import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import history from "../../history";
import * as coursesActions from "../../Redux/actions/coursesActions";
import * as userActions from "../../Redux/actions/userActions";

//TODO: Crashes on reload due to course coming from other component
class RoundScore extends Component {
  componentDidMount() {
    this.roundId = this.props.match.params.roundId;
    const { user, scores, course } = this.props;
    if (user) {
      this.props.getScores(user.uid);
    }
  }

  render() {
    const { course, scores } = this.props;
    let tableRows = [];
    let roundScore = 0;
    if (scores && course) {
      scores.forEach(round => {
        if (round.key === this.roundId) {
          const { scorecard } = round.value.data;
          roundScore = round.value.data.roundScore;
          for (const key in scorecard) {
            const { par } = course.holes[key];
            const count = scorecard[key];
            const score = parseInt(count) - parseInt(par);
            tableRows.push(
              <TableRow key={key}>
                <TableRowColumn>{key}</TableRowColumn>
                <TableRowColumn>{count}</TableRowColumn>
                <TableRowColumn>{par}</TableRowColumn>
                <TableRowColumn>
                  {score > 0 ? "+" + score : score}
                </TableRowColumn>
              </TableRow>
            );
          }
        }
      });
    }
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn
                colSpan="4"
                tooltip="Total Score"
                style={{ textAlign: "center" }}
              >
                Total Score: {roundScore > 0 ? "+" + roundScore : roundScore}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Nr</TableHeaderColumn>
              <TableHeaderColumn>Kast</TableHeaderColumn>
              <TableHeaderColumn>Par</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            {tableRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCourseInfo: key => coursesActions.getCourseInfo(dispatch, key),
    getScores: userId => userActions.getScores(dispatch, userId)
  };
};

const mapStateToProps = state => {
  return {
    course: state.courses.courseInfo,
    scores: state.user.scores,
    user: state.courses.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoundScore);
