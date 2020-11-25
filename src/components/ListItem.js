import React,{useContext} from 'react';
import { withRouter } from 'react-router-dom';
import { DrawerContext } from '../contexts/drawer.context';
import {ListItem,ListItemText,Collapse} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    white: {
        color: '#fff',
        paddingLeft: theme.spacing(2)
      },
      nested:{
        paddingLeft: theme.spacing(4)
      }
}))
function CustomListItem({history,listItem}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const { toggleShowDrawer } = useContext(DrawerContext);
    const handleClick = () => {
      setOpen(prevState => !prevState);
    };
    return (
        <>
        <ListItem button onClick={handleClick}>
        <ListItemText className={classes.white} primary={listItem.name} />
        {open ? <ExpandLess color='secondary'/> : <ExpandMore color='secondary'/>}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
            {listItem.categories.map((item,i)=>(
                <ListItem key={i} button className={classes.nested} onClick={() => { toggleShowDrawer(); history.push(item.link) }}>
            <ListItemText className={classes.white} primary={item.text} />
          </ListItem> 
            ))}
      </Collapse>
      </>
    )
}
export default withRouter(CustomListItem);