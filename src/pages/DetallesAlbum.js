import React, { Component } from "react";
import Router from 'next/router';

import classNames from "classnames";
//import styles from '../components/LayoutContent/Styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Header from '../components/LayoutContent/Header/Header';
import HeaderLinks from '../components/LayoutContent/Header/HeaderLinks';
import HeaderLinksLeft from '../components/LayoutContent/Header/HeaderLinksLeft';

import { Grid, Container, InputBase } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardMedia from '@material-ui/core/CardMedia';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import axios from 'axios';


const styles = theme => ({
    main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
    },
    mainRaised: {
        margin: "50px",
        padding: "20px",
        borderRadius: "6px",
        boxShadow:
            "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    itemButtons: {
        padding: '2px 4px',
        display: 'flex',
        justify: 'flex-end',
        alignItems: 'center',
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
      cardMedia: {
        objectFit: 'cover',
        marginRight: '20px',
        padding: '25.25%',
        borderRadius: "6px",
      },
      list: {
        marginBottom: theme.spacing(2),
      },
      subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      text: {
        padding: theme.spacing(2, 2, 0),
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

function DetallesAlbum(props) {

    //const {classes} = props;

    const {usuario, articulo, comentarios, classes} = props;

    const [edit, setEdit] = React.useState(false);

    return (
        <div style={{margin : "-10px"}}>
            
            <MuiThemeProvider theme={muiTheme}>
                
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
                
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        
                        <Typography className={classes.title} variant="h4" noWrap>
                            {articulo.title}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {articulo.body}
                        </Typography>
                        
                        <Typography variant="h6" paragraph>
                            { usuario.name }
                        </Typography>
                        <Container>
                            <Typography variant="subtitle2" gutterBottom>
                                {comentarios.length+" Comments"}
                            </Typography>
                            <List className={classes.list}>
                                {comentarios.map(({ id, name, email, body }) => (
                                    <React.Fragment key={id}>
                                        <ListItem button>
                                            <ListItemAvatar>
                                                <Avatar alt="User Picture" >
                                                    <FaceIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={name} secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {email}
                                                    </Typography>
                                                    {" - "+body}
                                                </React.Fragment>
                                            } />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Container>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        
                    </Grid>

                </Grid>
                
            </div>
            
        </div>
    );
}

DetallesArticulo.getInitialProps = async ({ query, res }) => {
        
    try {
        let idAlbum = query.id;
        let [reqAlbum, reqComments] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/albums/${idAlbum}`),
            axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}/comments`),
        ]);
        
        //let reqDetalles = await axios.get(`https://jsonplaceholder.typicode.com/posts/${idArticulo}/comments`);

        if (reqAlbum.status >= 400 && reqComments.status >= 400) {
          res.statusCode = reqAlbum.status;
          return { articulo: null, comentarios: null, usuario: null, statusCode: reqAlbum.status }
        }
        
        let articulo = await reqAlbum.data;
        let comentarios = await reqComments.data;
        //let {respuesta: datos} = await reqDetalles.data;
        let reqUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${articulo.userId}`);
        let usuario = await reqUser.data;

        if (reqUser.status >= 400) {
            usuario = null;
        }

        //return { articulo ,statusCode: 200, articulo : query.slugArticulo}
        return { articulo , usuario, comentarios, statusCode: 200 }

    } catch (error) {
        //res.statusCode = 503;
        return { articulo: null, comentarios: null, usuario: null, statusCode: 503}
    }
}

DetallesArticulo.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DetallesArticulo);