import React, { useContext} from 'react'
import { Container, Grid, Typography,Breadcrumbs } from '@material-ui/core'
import { PostContext } from '../contexts/posts.context';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    text: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(5)
    },
    root: {
        marginTop: theme.spacing(3)
    }
}));
function BuySellLandingPage({category,breadcrumb }) {

    const classes = useStyles();

    const { Posts } = useContext(PostContext);
    const posts = category==='RENT'?Posts.rentRealEstate:Posts.saleRealEstate;
 
    
     
     if(posts.length===0) {
         return <div>No posts under this category</div>
     }else{
        return (
            <>
                <Breadcrumbs expandText="Hello" separator={<DoubleArrowIcon fontSize="small"/>} className={classes.text} aria-label="breadcrumb">
                    <Link color="inherit" to="/" >
                        Home
                    </Link>
                    <Typography color="textPrimary">Real Estates</Typography>
                    <Typography color="textPrimary">{breadcrumb}</Typography>
                </Breadcrumbs>

                <Container className={classes.root} maxWidth="lg">
                    <Grid container spacing={3}>
                        
                        <Grid item xs={10}>
                        <Grid container spacing={3}>
                            {posts.map((post, i) => <Card key={i} images={post.images} price={post.price} title={post.title} />)}
                            </Grid>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Container>
            </>
        )
    }
}
BuySellLandingPage.defaultProps = {
    category: "SALE",
    breadcrumb:"Sale"
}

export default BuySellLandingPage;