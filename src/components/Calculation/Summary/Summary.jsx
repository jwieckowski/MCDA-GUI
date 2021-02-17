import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  info: {
      width: '40%',
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginLeft: '20%'
  }
})

const Summary = () => {
  const classes = useStyles()
  const { t } = useTranslation() 
  const info = useSelector((state) => state.calculations)

  const getInfo = () => {
    return (
      <Typography variant='h5'>
        { info.method !== 'PROMETHEE'
          ? <>{t('calculation:step2')}: {info.normalization === undefined ? '' : info.normalization}</>
          : <>{t('calculation:preference')}: {info.preferenceFunction === undefined ? '' : info.preferenceFunction}</>
        }
      </Typography>
    )  
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.info}>
        <Typography variant='h5'>{t('calculation:step1')}: {info.method === undefined ? '' : info.method}</Typography>
        {getInfo()}
        <Typography variant='h5'>{t('calculation:step3')}: {info.matrixFile === undefined ? t('calculation:input') : t('calculation:file')}</Typography>
      </Grid>
      <Grid className={classes.info}>
        <Typography variant='h5'>{t('calculation:alternatives')}: {info.alternatives === undefined ? '' : info.alternatives}</Typography>
        <Typography variant='h5'>{t('calculation:criteria')}: {info.criteria === undefined ? '' : info.criteria}</Typography>
        <Typography variant='h5'>{t('calculation:criteria-weights')}: {info.weightsMethod === undefined ? t('calculation:input') : info.weightsMethod}</Typography>
      </Grid>
    </Grid>
  )
}

export default Summary