import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse, Grid, ListItemText, List, ListItem } from '@material-ui/core';
import data from '../constants/utilities';
import { withRouter } from 'react-router-dom';
import { DrawerContext } from '../contexts/drawer.context';
import { Bounce } from 'react-reveal';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CustomListItem from './ListItem';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(2),
    border: '1 px solid green'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  white: {
    color: '#fff'
  },
  item: {
    borderBottom: "1px solid black",
    padding: theme.spacing(2),
    backgroundColor: '#F8F8F8',
    '&:hover': {
      backgroundColor: '#C0C0C0',
      boxShadow: '11px 10px 13px 1px rgba(0,0,0,0.75)'
    }
  },
  text: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: '#fff'
  },

}));

function VerticalNavList({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(prevState => !prevState);
  };
  const { toggleShowDrawer } = useContext(DrawerContext);
  return (
    <Grid container direction="column" justify="space-between">
      <Grid item>
        <Bounce bottom>
          <List
            component="nav"
            className={classes.root}
          >
            <ListItem button onClick={() => { toggleShowDrawer(); history.push('/') }}>
              <ListItemText className={classes.white} primary="Home" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemText className={classes.white} primary="All Categories" />
              {open ? <ExpandLess color='secondary' /> : <ExpandMore color='secondary' />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {data.map((listItem, i) => (
                  <CustomListItem key={i} listItem={listItem} />



                ))}
              </List>
            </Collapse>
          </List>
        </Bounce>
      </Grid>

    </Grid>

  )
}

export default withRouter(VerticalNavList);