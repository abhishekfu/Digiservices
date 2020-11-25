import { Typography, Grid, Avatar } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        postion:"fixed"
    },
    title: {
        fontWeight: 'bold'
    },
    item: {
        marginBottom: theme.spacing(1)
    },
    itemspaced:{
        marginTop: theme.spacing(2)
    },
    larger:{
        width: theme.spacing(25),
        height: theme.spacing(25)
    }
}));
export default function DetailsPage({ posts, current }) {
    const classes = useStyles();
    const Post = posts.filter(post => post.serviceid === current);
    const post = Post[0];
    if(Post.length==0){return <div/>}
    return (
        <Grid container className={classes.root}>
         <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Title</Typography>
                    <Typography>{post.title}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Service Type</Typography>
                    <Typography>{post.servicetype}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Category</Typography>
                    <Typography>{post.category}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Approval Status</Typography>
                    <Typography>{post.approvalstatus}</Typography>
                </Grid>
            </Grid>
           
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Contact</Typography>
                    <Typography>{post.contact}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Date posted</Typography>
                    <Typography>{post.dateposted}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Posted by</Typography>
                    <Typography>{post.postedby}</Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.item} xs={3}>
                <Grid container alignItems='flex-start' direction="column">
                    <Typography className={classes.title}>Price</Typography>
                    <Typography>${post.price}</Typography>
                </Grid>
            </Grid>
            

            <Grid item className={classes.itemspaced} xs={12}>
            <Grid container alignItems='flex-start' direction="column">
                <Typography className={classes.title}>Description</Typography>
                <Typography>{post.description}</Typography>
            </Grid>
            </Grid>
            <Grid item className={classes.itemspaced} xs={12}>
            <Grid container alignItems='flex-start' direction="column">
                <Typography className={classes.title}>Address</Typography>
                <Typography>{post.address}</Typography>
            </Grid>
            </Grid>
            <Grid item className={classes.itemspaced} xs={12}>
            <Grid container alignItems='flex-start' direction="column">
                <Typography className={classes.title}>Images</Typography>
                {post.images.length===0?(
                    <Typography>No images uploaded</Typography>
                ):(
                    <Grid container>
                        {post.images.map((image,i)=>(
                            <Grid item key={i}>
                                <Avatar variant='square' className={classes.larger} src={image} alt="image"/>
                            </Grid>
                        ))}
                    </Grid>
                    
                )}
                
            </Grid>
            </Grid>

        </Grid>
    )
}
