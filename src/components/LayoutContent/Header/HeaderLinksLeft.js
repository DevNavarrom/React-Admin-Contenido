
import React from "react";
import Router from 'next/router';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

export default function HeaderLinksLeft(props) {
  
    return (
        <IconButton onClick={() => Router.back()} edge="start" style={{ marginRight: 16 }} color="inherit" aria-label="menu">
            <ArrowBackIosIcon />
        </IconButton>
    );
}