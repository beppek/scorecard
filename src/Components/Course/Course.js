import React, { Component } from 'react';
import query from 'query-string';

class Course extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div>
                {this.props.match.params.course}
            </div>
        );
    }
}

export default Course;