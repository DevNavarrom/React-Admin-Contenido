import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Articulos from "../Articulos/Articulos";
import Albumes from "../Albumes/Albumes";
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
})

class NavBarComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      vista : <Articulos/>
    }

    this.goView = this.goView.bind(this);
  }

  goView(vista) {
    switch (vista) {
      case 'Articulos':
        this.setState({ vista : <Articulos/>});
        break;
      case 'Albumes':
        this.setState({ vista : <Albumes/>});
        break;
      case 'Tareas':
        this.setState({ vista : <Articulos/>});
        break;

      default:
        this.setState({ vista : <Articulos/>});
        break;
    }
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              React Posts
            </Typography>
            <Button color="inherit" onClick={()=> this.setState({ vista : <Articulos/>})}>Articulos</Button>
            <Button color="inherit" onClick={()=> this.setState({ vista : <Albumes/>})}>Albumes</Button>
            <Button color="inherit" onClick={()=> this.setState({ vista : <Albumes/>})}>Tareas</Button>
            
          </Toolbar>
        </AppBar>
        <Grid container xs={12} sm={12} md={12} lg={12} style={{ padding: '10px', margin: '20px 0px 0px'}}>
            {this.state.vista}
        </Grid>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBarComponent);