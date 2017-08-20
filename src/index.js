import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Firebase from './Firebase/Firebase';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import store from "./Redux/store";
import * as coursesActions from './Redux/actions/coursesActions';

Firebase.init();

injectTapEventPlugin();

store.dispatch((dispatch) => {
    coursesActions.getAllCourses(dispatch);
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <App />
        </MuiThemeProvider>
    </Provider>
    , 
    document.getElementById('root')
);
registerServiceWorker();
