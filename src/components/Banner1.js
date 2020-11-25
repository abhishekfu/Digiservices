import React from 'react'
import { Grid, Typography, FormControl,Paper, NativeSelect, TextField, InputAdornment } from '@material-ui/core';
import BootstrapInput from './BootstrapInput'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    
    main: {
        padding: theme.spacing(15)
    },
    margin: {
        minWidth: 120,
        outline: 'none',
        color: '#fff',
       
    },
    input:{
        minWidth: 600,
        color: '#fff',
        marginLeft:theme.spacing(2)
    },
    text:{
        minWidth: 600,
        padding:theme.spacing(0)
    }
}));
export default function Banner() {
    const classes = useStyles();
    return (
        <Grid className={classes.main} container direction="column" justify='center' alignContent="center" spacing={5}>
                <Grid item>
                    <Typography style={{ textAlign: 'center' }} variant='body2' color="secondary">Home / Mumbai</Typography>
                </Grid>
                <Grid item>
                    <Typography style={{ textAlign: 'center' }}  variant='h3' color="secondary">Home services, on demand.</Typography>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                        <Paper  variant="outlined">
                            <FormControl className={classes.margin}>
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value="Mumbai"
                                    input={<BootstrapInput />}
                                    color="inherit"
                                >
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Chennai">Chennai</option>
                                </NativeSelect>
                            </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item>
                        <Paper variant="outlined" className={classes.input}>
                            <TextField
                                className={classes.text}
                                variant="outlined"
                                id="input-with-icon-textfield"
                                placeholder="Search for a service"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            </Paper>
                        </Grid>
                    </Grid>
                <Grid item >
                <Typography style={{ paddingLeft: '140px',textDecoration:'underline',fontWeight:'600' }}  variant='inherit' color="secondary">Massage For Men,</Typography>
                <Typography style={{textDecoration:'underline',fontWeight:'600' }}  variant='inherit' color="secondary">Pest Control,</Typography>
                <Typography style={{ textDecoration:'underline',fontWeight:'600' }}  variant='inherit' color="secondary">Makeup & Hairstyling</Typography>
                <Typography style={{ fontWeight:'600' }}  variant='inherit' color="secondary">etc</Typography>
                </Grid>
                
                </Grid>
            </Grid>
    )
}
