import React, { Component } from "react";
import { connect } from "react-redux";
import * as coursesActions from "../../Redux/actions/coursesActions";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";

class Round extends Component {
  constructor(props) {
    super(props);
    const baskets = this.props.course.holes || [];
    if (baskets.length) {
      let scorecard = {};
      baskets.forEach(basket => {
        scorecard[basket.number] = 0;
      });
      this.state = {
        scorecard,
        roundScore: 0
      };
    } else {
      this.state = {
        scorecard: {}
      };
    }
  }

  componentDidMount() {
    this.roundKey = this.props.match.params.roundId;
    this.courseKey = this.props.match.params.course;
    this.props.getCourseInfo(this.courseKey);
    this.props.getRound(this.courseKey, this.roundKey);
  }

  handleInputChange = (e, score, hole) => {
    const { user, updateRound, round } = this.props;
    let { scorecard, roundScore } = this.state;
    scorecard[hole] = score;
    this.setState({ scorecard });
    updateRound(user, this.roundKey, {
      course: this.courseKey,
      scorecard,
      roundScore,
      timeCreated: round.data.timeCreated
    });
  };

  handleSaveRound = () => {
    const baskets = this.props.course.holes || [];
    let { roundScore, scorecard } = this.state;
    const { user, updateRound, round } = this.props;
    baskets.forEach((basket, i) => {
      const { par } = basket;
      roundScore += parseInt(scorecard[i]) - parseInt(par);
    });
    this.setState({ roundScore });
    updateRound(user, this.roundKey, {
      course: this.courseKey,
      scorecard,
      roundScore,
      timeCreated: round.data.timeCreated
    });
  };

  render() {
    let tableRows = [];
    const baskets = this.props.course.holes || [];
    baskets.forEach(basket => {
      tableRows.push(
        <TableRow key={basket.number}>
          <TableRowColumn>{basket.number}</TableRowColumn>
          <TableRowColumn>{basket.length}m</TableRowColumn>
          <TableRowColumn>{basket.par}</TableRowColumn>
          <TableRowColumn>
            <TextField
              onChange={(e, val) =>
                this.handleInputChange(e, val, basket.number)
              }
              hintText="Score"
            />
            {this.state.scorecard[basket.number]
              ? this.state.scorecard[basket.number]
              : ""}
          </TableRowColumn>
        </TableRow>
      );
    });
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nr</TableHeaderColumn>
              <TableHeaderColumn>Längd</TableHeaderColumn>
              <TableHeaderColumn>Par</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            {tableRows}
          </TableBody>
        </Table>
        <RaisedButton
          onClick={this.handleSaveRound}
          label="Spara"
          labelPosition="after"
          primary={true}
          icon={<FontIcon className="far fa-save" />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCourseInfo: key => coursesActions.getCourseInfo(dispatch, key),
    getRound: (courseKey, roundKey) =>
      coursesActions.getRound(dispatch, courseKey, roundKey),
    updateRound: (user, roundKey, data) =>
      coursesActions.updateRound(dispatch, user, roundKey, data)
  };
};

const mapStateToProps = state => {
  return {
    course: state.courses.courseInfo,
    round: state.courses.currentRound,
    user: state.courses.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Round);
