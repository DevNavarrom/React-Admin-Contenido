import { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';


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

export default class DetallesArticulo extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps({ query, res }) {
        
        try {
            let idArticulo = query.id;
            
            let reqDetalles = await axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}/comments`);
    
            if (reqDetalles.status >= 400) {
              res.statusCode = reqDetalles.status;
              return { datos: null, statusCode: reqDetalles.status}
            }
            
            let {respuesta: datos} = await reqDetalles.data;
    
            return {datos,statusCode: 200, articulo : query.slugArticulo}
    
        } catch (error) {
            res.statusCode = 503;
            return { datos: null, statusCode: 503}
        }
    }

    render() {
        const {datos, articulo} = this.props;

        return (
            <>
                <MuiThemeProvider theme={muiTheme}>
                    <div style={{ flexGrow : 1 }}>
                        <AppBar position="static">
                            <Toolbar variant="dense">
                                <IconButton edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
                                    <ArrowBackIosIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit">
                                    {articulo}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                </MuiThemeProvider>
                
                <Grid container xs={12} sm={12} md={12} lg={12} style={{ padding: '10px', margin: '20px 0px 0px'}}>
                    <Paper elevation={3} ></Paper>
                </Grid>
            </>
        );
    }
}