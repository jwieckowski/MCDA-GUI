import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import mcda2 from './../../public/assets/mcda2.jpg'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative'
  },
  textContainer: {
    width: '70%',
    maxWidth: '800px',
    margin: '50px 0px'
  },
  imgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '30%',
    zIndex: -1
  },
  img: {
    width: '100%',
    objectFit: 'cover',
    position: 'absolute',
    bottom: 0,
    left: 0,
  }
})

const Dashboard = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid className={classes.root} data-testid='dashboard-id'>
      <Grid className={classes.textContainer}>
        <Typography>
          {t('home:mcda')}
        </Typography>
      </Grid>
      <Grid className={classes.textContainer}>
        <Typography variant='body1'>
          {t('home:gui')}
        </Typography>
      </Grid>
      <Grid className={classes.imgContainer}>
        <img
          src={mcda2}
          alt='decision-making process'
          className={classes.img}
        />
      </Grid>
    </Grid>
  )
}
export default Dashboard