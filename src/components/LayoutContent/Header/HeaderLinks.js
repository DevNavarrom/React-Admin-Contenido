
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomButton from '../../CustomButton/CustomButton';
import styles from './headerLinksStyles';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>
                <CustomButton
                    href="/"
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}>
                    Articulos
                    </CustomButton>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomButton
                    href="/"
                    color="transparent"
                    target="_blank"
                    className={classes.navLink}
                >Albumes</CustomButton>
            </ListItem>
            <ListItem className={classes.listItem}>
                <CustomButton
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