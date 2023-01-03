import { Box, Typography } from '@material-ui/core';
import React from 'react'

import useStyles from './styles';



function Banner() {
  const classes = useStyles();
  

  return (
    <div>
      <Box className={classes.banner}>
        <Box><Typography variant="h5">Build your dream workspace, so you can get your best work done.</Typography></Box>
      </Box>
    </div>
    
  );
}
    


export default Banner
