import React, { Component } from 'react';

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

class CreateRound extends Component {

    render() {
        return (
            <div className="padded-content" >
                <Checkbox label="Öppen" />
                <Checkbox label="Spara statistik" />
                <RaisedButton 
                    primary={true} 
                    label="Lägg till" 
                    icon={<FontIcon className="fa fa-plus" />} />
            </div>
        );
    }
}

export default CreateRound;