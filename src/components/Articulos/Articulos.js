import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import ItemArticulo from './item/ItemArticulo';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import axios from 'axios';


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
    fabButton: {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem'
    },
  }));

  const options = [
    'Autor',
    'Articulo',
    'Album',
    'Estado',
  ];
  
  const ITEM_HEIGHT = 48;

function CustomizedInputBase() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const classes = useStyles();
  
    return (
      <Container component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <FilterListIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200,
                    },
                }}
            >
                {options.map(option => (
                    <MenuItem key={option} selected={option === 'Autor'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
      </Container>
    );
  }

export default class Articulos extends Component {

    constructor(props) {
        super(props);

        this.state = {
          articulos : [],
          open: false
        }
    }

    componentDidMount() {
      this.getPosts();
    }
  
    async getPosts() {
      try {
        
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        this.setState({ articulos : res.data });

      } catch (error) {
        this.setState({ articulos : [] });
      }
    }

    render() {

        return (
          <React.Fragment>
            <CssBaseline />
            {/* <Grid container style={{ backgroundColor: '#FFFFFF', }}>
              <Grid item xs={12}>

                <CustomizedInputBase />

              </Grid>
            </Grid> */}
            <Grid container spacing={2} style={{padding: '30px 10px' }}>
              <Grid item xs={12}>

                <CustomizedInputBase />

              </Grid>
              {
                this.state.articulos.map(post => (
                  <ItemArticulo key={post.title} post={post} />
                ))
              }
            </Grid>

            <Fab onClick={() => this.setState({ open: true })} color="secondary" aria-label="add" style={{ position: 'fixed', bottom: '2rem', right: '2rem'}}>
              <AddIcon />
            </Fab>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.open}>
                <Paper style={{ padding: '20px', width: '80%' }}>
                <Typography variant="h6" gutterBottom>
                    Create Post
                </Typography>
                <Divider variant="middle" orientation="horizontal" style={{ margin: '10px -10px' }} />

               <Grid container direction="column" justify="center" spacing={3}>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          id="title-0"
                          label="Title"
                          placeholder="Title Post"
                          multiline
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControl variant="outlined" fullWidth>
                        <TextField
                          id="body-1"
                          label="Description"
                          placeholder="Decription Post"
                          multiline
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>

                  </Grid>
                  <Grid container direction="row" justify="flex-end" alignItems="center" style={{ marginTop: "10px" }}>
                    <Button variant="outlined" size="large" color="secondary">
                      Create
                    </Button>
                  </Grid>
                </Paper>
              </Fade>
            </Modal>

          </React.Fragment>
        );
    }
}