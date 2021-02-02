import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none'
  }
})

const Menu = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link 
          color="inherit"
          href="/"
          className={classes.item}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>Home</Typography>
        </Link>
        <Link
          color="inherit"
          href="/calculation"
          className={classes.item}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>Calculation</Typography>
        </Link>
        <Link
          color="inherit"
          href="/methods"
          className={classes.item}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>Methods</Typography>
        </Link>
        <Link
          color="inherit"
          href="/contact"
          className={classes.item}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>Contact</Typography>
        </Link>
      </Breadcrumbs>
    </Grid>
  )
}
export default Menu