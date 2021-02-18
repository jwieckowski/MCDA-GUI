import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'
import FunctionsIcon from '@material-ui/icons/Functions'
import SubjectIcon from '@material-ui/icons/Subject'
import MailIcon from '@material-ui/icons/Mail'
import HistoryIcon from '@material-ui/icons/History'

import LanguageSelect from './LanguageSelect'

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
  const { t } = useTranslation()
  const location = useLocation()

  const checkIfActive = (path) => {
    return location.pathname === path    
  }

  return (
    <Grid className={classes.root}>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link 
          to='/'
          className={classes.item}
          style={{color: checkIfActive('/') ? 'black': 'inherit'}}
        >
          <HomeIcon className={classes.icon} />
          <Typography variant='h5'>{t('menu:home')}</Typography>
        </Link>
        <Link
          to='/calculation'
          className={classes.item}
          style={{color: checkIfActive('/calculation') ? 'black': 'inherit'}}
        >
          <FunctionsIcon className={classes.icon} />
          <Typography variant='h5'>{t('menu:calculation')}</Typography>
        </Link>
        <Link
          to='/history'
          className={classes.item}
          style={{color: checkIfActive('/history') ? 'black': 'inherit'}}
        >
          <HistoryIcon className={classes.icon} />
          <Typography variant='h5'>{t('menu:history')}</Typography>
        </Link>
        <Link
          to='/methods'
          className={classes.item}
          style={{color: checkIfActive('/methods') ? 'black': 'inherit'}}
        >
          <SubjectIcon className={classes.icon} />
          <Typography variant='h5'>{t('menu:methods')}</Typography>
        </Link>
        <Link
          to='/contact'
          className={classes.item}
          style={{color: checkIfActive('/contact') ? 'black': 'inherit'}}
        >
          <MailIcon className={classes.icon} />
          <Typography variant='h5'>{t('menu:contact')}</Typography>
        </Link>
      </Breadcrumbs>
      <LanguageSelect className={classes.select} />
    </Grid>
  )
}
export default Menu