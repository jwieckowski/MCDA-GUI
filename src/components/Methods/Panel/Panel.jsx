import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  panel: {
    width: '80%',
    height: '95%'
  },
  label: {
    width: '100%',
    height: '8%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  images: {
    height: '86%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    minWidth: '40%',
    height: 'auto'
  }
})

const Panel = ({ value, index, method, abbreviation, images }) => {
  const classes = useStyles()

  return (
    <Box
      className={classes.panel}
      style={{display: value !== index && 'none' }}
    >
      <Grid className={classes.label}>
        <Typography variant='h4'>{method}</Typography>
      </Grid>
      <Grid className={classes.label}>
        <Typography variant='h5'>{abbreviation}</Typography>
      </Grid>
      <Grid className={classes.images}>
        {images.map((img, index) => {
          return (
            <img key={index} src={img} alt='preliminaries' className={classes.image} />
          )
        })}
      </Grid>
    </Box>
  )
}
export default Panel