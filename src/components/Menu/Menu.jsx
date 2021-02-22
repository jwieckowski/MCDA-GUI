import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import HomeIcon from '@material-ui/icons/Home'
import FunctionsIcon from '@material-ui/icons/Functions'
import SubjectIcon from '@material-ui/icons/Subject'
import MailIcon from '@material-ui/icons/Mail'
import HistoryIcon from '@material-ui/icons/History'
import HelpIcon from '@material-ui/icons/Help'

import Tab from './Tab'
import LanguageSelect from './LanguageSelect'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Menu = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const location = useLocation()

  const paths = ['/', '/calculation', '/history', '/methods', '/contact']
  const labels = [t('menu:home'), t('menu:calculation'), t('menu:history'), t('menu:methods'), t('menu:contact')]

  const checkIfActive = (path) => {
    return location.pathname === path    
  }

  const getIcon = (path) => {
    const icons = {
      '/': <HomeIcon className={classes.icon} />,
      '/calculation': <FunctionsIcon className={classes.icon} />,
      '/history': <HistoryIcon className={classes.icon} />,
      '/methods': <SubjectIcon className={classes.icon} />,
      '/contact': <MailIcon className={classes.icon} />,
    }
    return icons[path] || <HelpIcon className={classes.icon} />
  }

  return (
    <Grid className={classes.root} data-testid='menu-id'>
      <Breadcrumbs aria-label='breadcrumb'>
        {paths.map((path, index) => {
          return (
            <Tab
              key={index}
              path={path}
              icon={getIcon(path)}
              label={labels[index]}
              active={checkIfActive(path)}
            />
          )
        })}
      </Breadcrumbs>
      <LanguageSelect className={classes.select} />
    </Grid>
  )
}
export default Menu