import React, { Component } from 'react';
import {connect} from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import * as coursesActions from '../../Redux/actions/coursesActions';
import history from '../../history';

class CreateRound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            publicStatus: false,
            saveStats: true
        }
    }

    componentDidMount() {
        let {course, createdRound} = this.props;
        if (createdRound) {
            history.push(`/courses/${course.key}/rounds/${createdRound.key}`);
        }
    }

    togglePublicStatus = () => {
        this.setState({
            publicStatus: !this.state.publicStatus
        });
    }

    toggleSaveStats = () => {
        this.setState({
            saveStats: !this.state.saveStats
        });
    }

    submitNewRound = (e) => {
        e.preventDefault();
        let {publicStatus, saveStats} = this.state;
        let {user, course} = this.props;
        let data = {
            user,
            publicStatus
        }
        this.props.createRound(course, data, saveStats);
    }

    render() {
        return (
            <div className="padded-content" >
                <Checkbox checked={this.state.publicStatus} onCheck={this.togglePublicStatus} label="Öppen" />
                <Checkbox checked={this.state.saveStats} onCheck={this.toggleSaveStats} label="Spara statistik" />
                <RaisedButton
                    onClick={this.submitNewRound}
                    primary={true}
                    label="Lägg till"
                    icon={<FontIcon className="fa fa-plus" />} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRound: (course, data, saveStats) => coursesActions.createRound(dispatch, course, data, saveStats)
    }
}

const mapStateToProps = (state) => {
    return {
        createdRound: state.courses.createdRound,
        course: state.courses.courseInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRound);