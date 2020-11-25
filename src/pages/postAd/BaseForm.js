import React, { useContext, useState } from 'react';
import { Grid, FormControl, InputAdornment, TextField, InputLabel, MenuItem, Input, ButtonBase, Typography, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import { CategoryContext } from '../../contexts/category.context'
import {PostContext} from '../../contexts/posts.context';
import { withRouter } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(4)
    },
    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 180,
    },
    input: {
        marginTop: theme.spacing(2)
    },
    btn: {
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#006A4E',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        }
    }

}));
function BaseForm({history}) {
    const classes = useStyles();
    const { category,setLoading,setSuccess } = useContext(CategoryContext);
    const {createPost} = useContext(PostContext);
    const [ title, setTitle ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [address, setAddress] = useState('');
    const [dropdownCategory, setDropdownCategory] = useState('');
    const [files,setFiles]=useState([]);
    const {servicetype} = category;
    const handleChange=(files)=>{
        setFiles(files);
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)
        createPost({title:title.trim(),servicetype,dropdownCategory,price,description:description.trim(),address:address.trim(),files}).then(()=>{
            setLoading(false);
            setSuccess(true);
            history.push('/success');
            setTitle('');
            setPrice('');
            setDescription('');
            setAddress('');
            setFiles([]);
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <Grid className={classes.form} container direction='row'>
                <Grid item xs={7}>
                    <Grid container direction='column'>
                        <Grid item className={classes.input} >
                            <FormControl fullWidth>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type='text' required
                                    label="Title"
                                    variant="outlined" />
                            </FormControl>
                        </Grid>
                        
                            <Grid item className={classes.input}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-simple-select"
                                    value={dropdownCategory}
                                    onChange={(e) => setDropdownCategory(e.target.value)}
                                >
                                  
                                    {category.categories.map(item =>
                                        <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>)}

                                </Select>
                            </FormControl>
                            </Grid>
                            <Grid item className={classes.input}>
                            <FormControl required>
                                <InputLabel>Price</InputLabel>
                                <Input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    type='number' required
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                            </Grid>
                       
                        <Grid item className={classes.input} >
                            <FormControl fullWidth>
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type='text' required
                                    label="Description"
                                    multiline
                                    rows={12}
                                    helperText="Mention number of rooms,amenties available nearby,etc.,"
                                    variant="outlined"
                                />
                            </FormControl>
                        </Grid>



                        <Grid item className={classes.input} >
                            <FormControl fullWidth>
                                <TextField
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    type='text' required
                                    label="Address"
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                />
                                 </FormControl>
                        </Grid>
                      
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={4}>
                    <Grid container style={{ height: "100%" }} direction='column' justify='space-between'>
                        <Grid item style={{ marginTop: "12px" }}>
                            <DropzoneArea
                                onChange={handleChange.bind(this)}
                                dropzoneText="Add photos for your ad."
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                filesLimit={5} style={{ padding: "30px" }} />
                        </Grid>
                        <Grid item >
                            <FormControl fullWidth>
                                <ButtonBase type='submit'>
                                    <Typography align='right' color='secondary' className={classes.btn} variant='button'>SUBMIT</Typography>
                                </ButtonBase>
                            </FormControl>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}


export default withRouter(BaseForm);