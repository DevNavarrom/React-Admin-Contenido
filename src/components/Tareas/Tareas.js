import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';
import ItemTareas from './Item/ItemTareas';


const useStyles = makeStyles(theme => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default class Tareas extends Component {

    constructor(props) {
        super(props);

        this.state = {
          tareas : []
        }
    }

    componentDidMount() {
      this.getTodos();
    }
  
    async getTodos() {
      try {
        const reqTodos = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        this.setState({ tareas : reqTodos.data });

      } catch (error) {
        this.setState({ tareas : [] });
      }
    }

    render() {

      return (
        <React.Fragment>
          <CssBaseline />
          
          <Grid container spacing={2} style={{ width: '100%', padding: '10px' }}>
            {
              this.state.tareas.map(tarea => (
                <ItemTareas key={tarea.id} tarea={tarea} />
              ))
            }
          </Grid>

        </React.Fragment>
      );
    }
}