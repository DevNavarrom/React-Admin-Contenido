import React, { Component } from "react";
import Router from 'next/router';

import classNames from "classnames";
//import styles from '../components/LayoutContent/Styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/LayoutContent/Header/Header';
import HeaderLinks from '../components/LayoutContent/Header/HeaderLinks';
import HeaderLinksLeft from '../components/LayoutContent/Header/HeaderLinksLeft';

import { Grid } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import axios from 'axios';


const styles = theme => ({
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "50px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    itemButtons: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'right',
        width: '100%',
      },
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
      },
});

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
        width: '100%'
    },
    formControl: {
        select: {
            menuItem: {
                fontSize: '9',
            }
        },
    }
  });

const DetallesArticulo = (props) => {

    //const {classes} = props;

    const {datos, articulo, classes} = props;

    return (
        <div style={{margin : "-10px"}}>
            {/* <Header
                color="transparent"
                brand="ReactPosts"
                rightLinks={<HeaderLinks />}
                leftLinks={<HeaderLinksLeft/>}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            /> */}
            <MuiThemeProvider theme={muiTheme}>
                {/* <div style={{ flexGrow: 1 }}>
                    
                </div> */}
                {/* <AppBar position="static" >
                    <Toolbar variant="dense">
                        <IconButton onClick={() => Router.back()} edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            {articulo}
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => Router.back()} 
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                            <Typography className={classes.title} variant="h5" noWrap>
                                { articulo.title }
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>

            <div className={classNames(classes.main, classes.mainRaised)}>
                <Grid item xs={12} className={classes.itemButtons}>
                    <IconButton onClick={() => Router.back()} edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => Router.back()} edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </div>
            
        </div>
    );
}

DetallesArticulo.getInitialProps = async ({ query, res }) => {
        
    try {
        let idArticulo = query.id;
        let [reqPost, reqComments] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}`),
            axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}/comments`),
        ]);
        
        //let reqDetalles = await axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}/comments`);

        if (reqPost.status >= 400) {
          res.statusCode = reqPost.status;
          return { articulo: null, statusCode: reqPost.status }
        }
        
        let { articulo } = await reqPost.data;
        //let {respuesta: datos} = await reqDetalles.data;

        //return { articulo ,statusCode: 200, articulo : query.slugArticulo}
        return { articulo ,statusCode: 200 }

    } catch (error) {
        res.statusCode = 503;
        return { articulo: null, statusCode: 503}
    }
}

DetallesArticulo.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DetallesArticulo);