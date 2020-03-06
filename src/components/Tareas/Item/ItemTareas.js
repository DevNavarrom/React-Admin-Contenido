import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import ListItemText from '@material-ui/core/ListItemText';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

function ItemTareas(props) {
  const classes = useStyles();
  const { tarea } = props;

  const [usuario, setUsuario ] = useState({});
  const [todos, setTodos ] = useState([]);

  async function getInfo() {

      try {

          let [reqUser, reqUserTodos] = await Promise.all([
              axios.get(`https://jsonplaceholder.typicode.com/users/${tarea.userId}`),
              axios.get(`https://jsonplaceholder.typicode.com/users/${tarea.userId}/todos`),
          ]);

          if (reqUser.status >= 400 && reqUserTodos >= 400) {
              res.statusCode = reqUser.status;
              
              setUsuario(null);
              setTodos(null);
          }
          let usuario = await reqUser.data;
          let todos = await reqUserTodos.data;
          setUsuario(usuario);
            setTodos(todos);

      } catch (error) {
          
      }

  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid item key={tarea.id} xs={12} sm={6} md={6} >
            <CardActionArea component="a">
                <Card className={classes.card} style={{ backgroundColor: tarea.completed ? "#BEE4C4" : "#E8BCC0"}}>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {tarea.title}
                        </Typography>
                    </CardContent>

                    <List>
                        <React.Fragment key={tarea.id}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar alt="User Picture" >
                                        <FaceIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={usuario.name} secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {usuario.email}
                                        </Typography>
                                    </React.Fragment>
                                } />
                            </ListItem>
                            
                        </React.Fragment>
                    </List>

                </Card>
            </CardActionArea>
        
      </Grid>
      
    </>
    
  );
  
}

ItemTareas.propTypes = {
  album : PropTypes.object
};

export default ItemTareas;