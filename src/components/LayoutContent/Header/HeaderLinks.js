
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomButton from '../../CustomButton/CustomButton';
import styles from './headerLinksStyles';
import Link from 'next/link';
import Articulos from "../../Articulos/Articulos";
import Albumes from '../../Albumes/Albumes';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
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
        break;
    }
  };


  const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomButton
                    click={setView(<Articulos/>)}
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}>
                    Articulos
                    </CustomButton>
            </ListItem>
            <ListItem className={classes.listItem}>
            <CustomButton
                click={setView(<Albumes/>)}
                color="transparent"
                target="_blank"
                className={classes.navLink}>
                Albumes
            </CustomButton>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomButton
                    click={setView(<Albumes/>)}
                    color="transparent"
                    href="#"
                    target="_blank"
                    className={classes.navLink}>
                    Tareas
                    </CustomButton>

            </ListItem>
        </List>
    );
}