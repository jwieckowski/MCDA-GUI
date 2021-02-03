import React, { useState } from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  panel: {
    backgroundColor: 'blue',
    width: '70%',
    height: '80%'
  }
})

const Panel = ({ value, index }) => {
  const classes = useStyles()
//   if (!loading) {
//     if (!loadError) {
//       content = (
//         <Grid container maxwidth='xs' className={classes.root}>
//           {switchContent(location.pathname, data)}
//         </Grid>
//       )
//     } else {
//       content = <Page404 />
//     }
//   }
  return (
    <Box
      className={classes.panel}
      style={{display: value !== index && 'none' }}
    >
      <Typography variant='h4'>Method {index}</Typography>
    </Box>
  )
}
export default Panel