import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link} from '../../../../routes';
import slug from '../../../helpers/slug';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

const ItemAlbum = (props) => {
  const classes = useStyles();
  const { album, foto } = props;

  //const  [fotos,setFotos ]= useState({})

  async function getFotos() {
    try {
        
      const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);

      setFotos(res.data[1].thumbnailUrl);

    } catch (error) {
      
    }
  }

  /*useEffect(() => {
    getFotos();
  }, []);*/

  return (
    <>
      <CssBaseline />
      <Grid item key={album.id} xs={12} sm={3} md={4}>
        <Link route="album" params={{ slugAlbum: slug("album"), id: album.id }}>
          <CardActionArea component="a" href="#">
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={foto}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {album.title}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Link>
        
      </Grid>
      
    </>
    
  );
  
}


ItemAlbum.getInitialProps = async ({ query, res }) => {
  try {
    console.log('Album Id::: '+ album.id);
    let reqFotos = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);

    if (reqFotos.status >= 400) {
      res.statusCode = reqFotos.status;
      return {foto: null, statusCode: reqFotos.status};
    }
    let foto = await reqFotos.data[1].thumbnailUrl;

    return { foto, statusCode: 200 };

  } catch (error) {
    return { foto: null, statusCode: 503 }
  }
  
}

ItemAlbum.propTypes = {
  album : PropTypes.object
};

export default ItemAlbum;