import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { CallMissedSharp, ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/office-logo.png';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {
    const classes = useStyles(); 
    const location = useLocation(); 
    
  return (
    <div>
        <AppBar position="fixed" className={CallMissedSharp.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="SHOP NAME" height="25px" className={classes.image}/>
                    OfficeMade
                </Typography>
                <div className={classes.grow} />
                {/* vvv only show cart icon if on root pathname vvv */}
                {location.pathname === '/' && ( 
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary"> <ShoppingCart /></Badge>
                        </IconButton>
                    </div>)}

            </Toolbar>

        </AppBar>
    </div>
  )
}

export default Navbar