import React, { Component } from "react";
import Router from 'next/router';

import classNames from "classnames";
//import styles from '../components/LayoutContent/Styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Grid, Container } from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import Paper from '@material-ui/core/Paper';

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

    const {usuario, album, albumes, fotos, classes} = props;

    const [open, setOpen] = React.useState(false);

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
                                { album.title }
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>
                </div>
            </MuiThemeProvider>

            <div className={classNames(classes.main, classes.mainRaised)}>
                
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <CardActionArea component="a" href="#">
                            <CardMedia
                                onClick={() => setOpen(true)}
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                        </CardActionArea>
                        
                    </Grid>

                    <Grid item xs={12} md={6}>
                        
                        <Typography className={classes.title} variant="h4" noWrap>
                            {album.title}
                        </Typography>
                        
                        <Container>
                            
                            <List className={classes.list}>

                                <React.Fragment key={usuario.id}>
                                    <ListItem button >
                                        <ListItemAvatar>
                                            <Avatar alt="User Picture" >
                                                <FaceIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={usuario.name} secondary={
                                            <React.Fragment>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    {albumes.length + " Albums"}
                                                </Typography>
                                            </React.Fragment>
                                        } />

                                    </ListItem>
                                    <ListItem>
                                        <ListItemText secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary">
                                                    Email:
                                                </Typography>
                                                {usuario.email}
                                            </React.Fragment>
                                        } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary">
                                                    Photos:
                                                </Typography>
                                                {fotos.length}
                                            </React.Fragment>
                                        } />
                                    </ListItem>
                                    <Divider variant="fullWidth" component="li" />
                                </React.Fragment>
                            </List>
                        </Container>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        
                    </Grid>

                </Grid>
                
            </div>
            
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              open={open}
              onClose={() => setOpen(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Paper style={{ padding: '20px', width: '80%' }}>

               <Grid container direction="column" justify="center" spacing={3}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      
                    </Grid>

                  </Grid>
                  <Grid container direction="row" justify="flex-end" alignItems="center" style={{ marginTop: "10px" }}>
                    
                  </Grid>
                </Paper>
              </Fade>
            </Modal>

        </div>
    );
}

DetallesAlbum.getInitialProps = async ({ query, res }) => {
        
    try {
        let idAlbum = query.id;
        let [reqAlbum] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/albums/${idAlbum}`),
        ]);

        if (reqAlbum.status >= 400) {
          res.statusCode = reqAlbum.status;
          return { album: null, usuario: null, statusCode: reqAlbum.status }
        }
        let album = await reqAlbum.data;

        let reqFotos = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);
        if (reqFotos.status >= 400) {
            fotos = null;
        }
        let fotos = await reqFotos.data;

        let reqUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.userId}`);
        if (reqUser.status >= 400) {
            usuario = null;
        }
        let usuario = await reqUser.data;

        let reqAlbumes = await axios.get(`https://jsonplaceholder.typicode.com/users/${album.userId}/albums`);
        if (reqAlbumes.status >= 400) {
            albumes = null;
        }
        let albumes = await reqAlbumes.data;

        return { album , usuario, albumes, fotos, statusCode: 200 }

    } catch (error) {
        //res.statusCode = 503;
        return { album: null, usuario: null, albumes: null, fotos: null, statusCode: 503}
    }
}

DetallesAlbum.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DetallesAlbum);