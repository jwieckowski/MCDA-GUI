import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Link } from 'react-router-dom'

import HomeIcon from '@material-ui/icons/Home'
import FunctionsIcon from '@material-ui/icons/Functions'
import SubjectIcon from '@material-ui/icons/Subject'
import MailIcon from '@material-ui/icons/Mail'
import HistoryIcon from '@material-ui/icons/History'

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
    textDecoration: 'none',
    '&:hover': {
      color: 'black'
    }
  },
  icon: {
    paddingRight: '5px'
  }
})

const Menu = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link 
          to='/'
          className={classes.item}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>Home</Typography>
        </Link>
        <Link
          to='/calculation'
          className={classes.item}
        >
          <FunctionsIcon className={classes.icon} />
          <Typography variant='h5'>Calculation</Typography>
        </Link>
        <Link
          to='/history'
          className={classes.item}
        >
          <HistoryIcon className={classes.icon} />
          <Typography variant='h5'>History</Typography>
        </Link>
        <Link
          to='/methods'
          className={classes.item}
        >
          <SubjectIcon className={classes.icon} />
          <Typography variant='h5'>Methods</Typography>
        </Link>
        <Link
          to='/contact'
          className={classes.item}
        >
          <MailIcon className={classes.icon} />
          <Typography variant='h5'>Contact</Typography>
        </Link>
      </Breadcrumbs>
    </Grid>
  )
}
export default Menu