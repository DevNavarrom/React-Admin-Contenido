import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import axios from 'axios';
import ItemAlbum from './Item/ItemAlbum';


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

  const options = [
    'Autor',
    'Articulo',
    'Album',
    'Estado',
  ];
  
  const ITEM_HEIGHT = 48;

function SearchFilter() {
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

export default class Albumes extends Component {

    constructor(props) {
        super(props);

        this.state = {
          albumes : []
        }
    }

    componentDidMount() {
      this.getAlbumes();
    }
  
    async getAlbumes() {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
        
        this.setState({ albumes : res.data });

      } catch (error) {
        this.setState({ albumes : [] });
      }
    }

    render() {

        return (
            <React.Fragment>
                <CssBaseline />
                <Grid container style={{ backgroundColor: '#FFFFFF',}}>
                    <Grid item xs={12}>
                        
                        <SearchFilter/>

                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ width: '100%', padding: '10px' }}>
                  {
                  this.state.albumes.map(album => (
                    <ItemAlbum key={album.id} album={album} />
                  ))
                  }
                </Grid>
            </React.Fragment>
        );
    }
}