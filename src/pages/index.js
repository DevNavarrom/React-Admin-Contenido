import React, { Component } from 'react';
import NavBarComponent from '../components/NavBar/NavBar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';



const muiTheme = createMuiTheme({
  palette: {
    primary: {
        main: '#FFFFFF',
        contrastText: '#3D5170',
    },
    secondary: {
      main: '#348829',
      contrastText: '#ffffff',
    },
    
  },
  appBar: {
      height: 60,
  },
  formControl: {
      select: {
          menuItem: {
              fontSize: '9',
          }
      },
  }
});

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {

    return (
      <div style={{ backgroundColor: '#F4F5F7', }}>

        <MuiThemeProvider theme={muiTheme}>
          <NavBarComponent/>
        </MuiThemeProvider>

        {/* <Articulos/> */}

      </div>
      
    );
  }
}
