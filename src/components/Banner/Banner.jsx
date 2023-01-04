import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { useLocation } from 'react-router-dom';

import useStyles from './styles';



function Banner() {
  const classes = useStyles();
  const location = useLocation(); 

  return (
    <div>
       {/* vvv only show cart banner if on root pathname vvv */}
       {location.pathname === '/' && ( 
      <Box className={classes.banner}>
        <Box><Typography variant="h5">Build your dream workspace, so you can get your best work done.</Typography></Box>
      </Box>)}
    </div>
  );
}
    


export default Banner;
