import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import history from '../../history';
import * as coursesActions from '../../Redux/actions/coursesActions';
import * as userActions from "../../Redux/actions/userActions";

class RoundScore extends Component {

  componentDidMount() {
    this.roundId = this.props.match.params.roundId;
    const { user, scores, course } = this.props;
    if (user) {
      this.props.getScores(user.uid);
    }
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.scores);
  }
  
  render() {
    const {course} = this.props;
    let tableRows = [];
    if (this.scorecard) {
      // this.scorecard.forEach((score) => {
      //   console.log(score);
      //   // tableRows.push(
      //   //   <TableRow key={score.key}>
      //   //     <TableRowColumn>{score.key}</TableRowColumn>
      //   //     <TableRowColumn>{score.value}</TableRowColumn>
      //   //   </TableRow>
      //   // );
      // });
    }
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nr</TableHeaderColumn>
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
