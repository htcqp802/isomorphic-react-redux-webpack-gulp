import React, {
  Component,
  PropTypes
} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  Nav
} from '../../components';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Nav/>
          hello
        </div>
      </MuiThemeProvider>
    );
  }
}