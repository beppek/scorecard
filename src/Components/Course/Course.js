import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import * as coursesActions from '../../Redux/actions/coursesActions';
import history from '../../history';

class Course extends Component {

    componentDidMount() {
        const courseKey = this.props.match.params.course;
        this.props.getCourseInfo(courseKey);
        this.props.getRounds(courseKey);
    }

    render() {
        let tableRows = [];
        const baskets = this.props.course.holes || [];
        baskets.forEach(basket => {
            tableRows.push(
                <TableRow key={basket.number}>
                    <TableRowColumn>{basket.number}</TableRowColumn>
                    <TableRowColumn>{basket.length}m</TableRowColumn>
                    <TableRowColumn>{basket.par}</TableRowColumn>
                </TableRow>
            )
        });
        let roundListItems = [];
        const rounds = this.props.rounds || [];
        rounds.forEach(round => {
            if (round.open) {
                roundListItems.push(<ListItem 
                    primaryText={round.createdBy}
                    leftAvatar={<Avatar src={round.avatar} />} />);
            }
        });

        return (
            <div>
                <Tabs>
                    <Tab 
                        icon={<FontIcon className="fa fa-info-circle" />} 
                        label="Klubbinfo">
                        <div className="padded-content" >
                            <img 
                                alt={this.props.course.title}
                                style={{maxWidth: 150}} 
                                src={this.props.course.logo} />
                            <h4>{this.props.course.title}</h4>
                            <List>
                                <ListItem 
                                    primaryText={
                                        <a href={this.props.course.url} >
                                            <FontIcon className="fa fa-globe" /> hemsida
                                        </a>}/>
                                <ListItem 
                                    primaryText={
                                        <a href={this.props.course.facebook} >
                                            <FontIcon className="fa fa-facebook" /> facebook
                                        </a>}/>
                                <ListItem 
                                    primaryText={
                                        <a href={this.props.course.instagram} >
                                            <FontIcon className="fa fa-instagram" /> instagram
                                        </a>}/>
                            </List>
                        </div>
                    </Tab>
                    <Tab 
                        icon={<FontIcon className="fa fa-play" />} 
                        label="Spela">
                        <div className="padded-content">
                            <List>
                                <RaisedButton 
                                    primary={true} 
                                    icon={<FontIcon className="fa fa-plus" />} 
                                    label="Ny runda"
                                    onClick={() => history.push(`/courses/${this.props.course.key}/rounds/new`)} />
                                <Subheader>Öppna rundor </Subheader>
                                {roundListItems}
                            </List>
                        </div>
                    </Tab>
                    <Tab 
                        icon={<FontIcon className="fa fa-trophy" />} 
                        label="Baninfo">
                        <Table selectable={false}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Nr</TableHeaderColumn>
                                    <TableHeaderColumn>Längd</TableHeaderColumn>
                                    <TableHeaderColumn>Par</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody stripedRows={true} displayRowCheckbox={false}>
                                {tableRows}
                            </TableBody>
                        </Table>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseInfo: (key) => coursesActions.getCourseInfo(dispatch, key),
        getRounds: (course) => coursesActions.getFromDB(dispatch, `courses/${course}/rounds/`)
    }
}

const mapStateToProps = (state) => {
    return {
        course: state.courses.courseInfo,
        rounds: state.courses.rounds
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);