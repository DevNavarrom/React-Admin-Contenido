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
  const { album } = props;

  const  [fotos,setFotos ]= useState({})

  async function getFotos() {
    try {
        
      const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);

      setFotos(res.data[1].thumbnailUrl);

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getFotos();
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid item key={album.id} xs={12} sm={3} md={4}>
        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={fotos}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {album.title}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      
    </>
    
  );
  
}


ItemAlbum.getInitialProps = async ({ req }) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`);
  const json = res.data.thumbnailUrl;
  return { fotos: json };
}

ItemAlbum.propTypes = {
  album : PropTypes.object
};

export default ItemAlbum;