import React from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import HomeWorkIcon from '@material-ui/icons/HomeWork'
import MailIcon from '@material-ui/icons/Mail'
import LanguageIcon from '@material-ui/icons/Language'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    width: '50%',
    margin: '50px 0px'
  },
  row: {
    width: '50%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  link: {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none'
  }
})

const Contact = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.text}>
        <Typography>
          {t('contact:about')}
        </Typography>
      </Grid>
      <Grid className={classes.text}>
        <Typography>
          {t('contact:info')}
        </Typography>
      </Grid>
      <Grid className={classes.row}>
        <IconButton >
          <HomeWorkIcon fontSize='large'/>
        </IconButton>
        <Grid>
          <Typography>{t('contact:department')}</Typography>
          <Typography>{t('contact:faculty')}</Typography>
          <Typography>{t('contact:university')}</Typography>
          <Typography>{t('contact:address')}</Typography>
        </Grid>
      </Grid>
      <Grid className={classes.row}>
        <Link
          to={{ pathname: 'http://comet.edu.pl/' }}
          className={classes.link}
          target="_blank"
        >
          <IconButton >
            <LanguageIcon fontSize='large'/>
          </IconButton>
          <Grid>
            {t('contact:comet')}
          </Grid>
        </Link>
      </Grid>
      <Grid className={classes.row}>
        <IconButton >
          <MailIcon fontSize='large'/>
        </IconButton>
        <Grid>
          {t('contact:mail')}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Contact