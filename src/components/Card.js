import React from 'react';
import { Flip } from 'react-reveal'
import { Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height:200
  },
  root:{
    minHeight:250,
    '&:hover':{
      boxShadow:'10px 9px 11px 1px rgba(0,0,0,0.75)'
    }
  }
});
export default function CustomisedCard({ price, title,images }) {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Flip left>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={images.length===0?"https://thumbs.dreamstime.com/z/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg":images[0]}
              title="Home"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              &#36;{price}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Flip>
    </Grid>
  )
}
