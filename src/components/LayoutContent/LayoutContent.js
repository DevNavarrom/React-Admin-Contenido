import React from "react";

import Parallax from "./Parallax/Parallax";
import GridContainer from "./Grid/GridContainer";
import GridItem from "./Grid/GridItem";
import HeaderLinks from './Header/HeaderLinks';
import Header from './Header/Header';
import Articulos from "../Articulos/Articulos";

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from './Styles';

const useStyles = makeStyles(styles);

export default function LayoutContentComponent(props) {
  const classes = useStyles();

  const [view, setView] = React.useState(<Articulos/>);

  const changeView = (vista) => {
    switch (vista) {
      case 'Articulos':
        setView(<Articulos/>);
        break;
      case 'Albumes':
        setView(<Albumes/>);
        break;
      case 'Tareas':
        setView(<Articulos/>);
        break;

      default:
        setView(<Articulos/>);
        break;
    }
  };

  return (
    <div >
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            React Posts
          </Typography>
          <Button color="inherit" onClick={()=> this.setState({ vista : <Articulos/>})}>Articulos</Button>
          <Button color="inherit" onClick={()=> this.setState({ vista : <Albumes/>})}>Albumes</Button>
          <Button color="inherit" onClick={()=> this.setState({ vista : <Albumes/>})}>Tareas</Button>
          
        </Toolbar>
      </AppBar> */}
      <Header
        color="transparent"
        brand="ReactPosts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />

      {process.browser ?
        <Parallax filter image="https://source.unsplash.com/random">
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title}>ARTICULOS, ALBUMES, TAREAS</h1>
                  <h3 className={classes.subtitle}>
                    et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus
                  </h3>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        :
        null
      }

      <div className={classNames(classes.main, classes.mainRaised)}>
        {view}
      </div>
      
    </div>
  );
}