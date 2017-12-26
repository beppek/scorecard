import React, {Component} from 'react';
import update from 'immutability-helper';

import {withRouter} from "react-router-dom";

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';

import Firebase from '../../Firebase/Firebase';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            value: null
        }
    }

    handleNameChange = (name) => {
        let results = [];
        let courses = this.props.courses;
        if (name !== "") {
            courses.forEach((course) => {
                if (course.value.title.toLowerCase().includes(name.toLowerCase())) {
                    results.push(course);
                }
            });
        } else {
            results = [];
        }
        this.setState({results, value: name});
    }

    removeFromList = (e, result) => {
        e.preventDefault();
        e.stopPropagation();
        const i = this
            .state
            .results
            .indexOf(result);
        this.setState((prevState) => ({
            results: update(prevState.results, {
                $splice: [
                    [i, 1]
                ]
            })
        }));
    }

    selectCourse = (e, course) => {
        e.preventDefault();
        this.props.history.push(`/courses/${course.key}`);
    }

    clearInput = () => {
        this.setState({value: null});
        this.handleNameChange("");
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        let listItems = [];
        const results = this.state.results.length > 0
            ? this.state.results
            : this.props.courses;
        results.forEach(result => {
            listItems.push(
                <ListItem
                    onClick={(e) => this.selectCourse(e, result)}
                    key={result.key}
                    primaryText={result.value.title}
                    leftAvatar={< Avatar src = {
                    result.value.logo
                } />}
                    rightIcon={< FontIcon className = "fa fa-times" onClick = {
                    (e) => this.removeFromList(e, result)
                } />}/>
            );
        });
        return (
            <div className="home">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <TextField
                        value={this.state.value
                        ? this.state.value
                        : ""}
                        type="text"
                        floatingLabelText="Vilken bana ska du spela på?"
                        name="name"
                        onChange={(e, value) => this.handleNameChange(value)}/>
                    <FontIcon
                        onClick={this.clearInput}
                        style={{
                        color: "#666",
                        cursor: "pointer"
                    }}
                        className="fa fa-times"/>
                </form>
                <Paper
                    style={{
                    width: 300,
                    margin: "0 auto"
                }}
                    zDepth={1}>
                    <List>
                        {listItems}
                    </List>
                </Paper>
            </div>
        );
    }
}

export default withRouter(Home);