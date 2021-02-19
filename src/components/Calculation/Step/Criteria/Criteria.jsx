import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { setWeightsType, setWeightsValue, setWeightsMethod } from './../../../../data/actions/calculations.js'

import Types from './Types'
import Weights from './Weights'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Criteria = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [option, setOption] = useState(false)

  const { weightsType, criteria } = useSelector((state) => state.calculations)

  const handleSwitch = (event) => {
    setOption(!option)
    dispatch(setWeightsMethod(undefined))
  }

  useEffect(() => {
    if (criteria === undefined || (weightsType !== undefined && criteria === weightsType.length)) return
    const elements = Array.apply(0, { length: criteria })
    dispatch(setWeightsType(elements.map(m => 'Profit')))
    dispatch(setWeightsValue(elements.map(m => 0)))
  }, [criteria])

  return (
    <Grid className={classes.root}>
      <Grid className={classes.row}>
        <FormControlLabel
          control={
            <Switch
              checked={option}
              onChange={handleSwitch}
              name="Upload file"
              color="primary"
            />
          }
          label={option ? t('calculation:weights-input') : t('calculation:method-select')}
        />
      </Grid>
      {
        criteria ?
        <>
          <Types />
          <Weights option={option} />
        </>
      :
      <Grid className={classes.row}>
        <Typography>{t('calculation:no-criteria')}</Typography>
      </Grid>
      }
    </Grid>
  )
}
export default Criteria