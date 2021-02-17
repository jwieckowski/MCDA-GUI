import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { setNormalization, setPreferenceFunction } from './../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '200px'
  }
})

const noneNormalizationMCDA = ['COMET', 'SPOTIS', 'COPRAS', 'PROMETHEE']
const preferenceFunctions = ['usual', 'vshape', 'ushape', 'level', 'vshape_2']

const Normalization = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [methods, setMethods] = useState([])

  const { method, normalization, preferenceFunction } = useSelector((state) => state.calculations)

  const handleChange = (event) => {
    method !== 'PROMETHEE'
      ? dispatch(setNormalization(event.target.value))
      : dispatch(setPreferenceFunction(event.target.value))
  }

  const getValue = () => {
    return method !== 'PROMETHEE'
      ? normalization === undefined ? '' : normalization
      : preferenceFunction === undefined ? '' : preferenceFunction
  }

  const getItems = (array) => {
    return array.map((option) => (
      <MenuItem key={option} value={option}>
        <Typography>{option}</Typography>
      </MenuItem>
    ))
  }

  useEffect(() => {
    noneNormalizationMCDA.includes(method)
      ? setMethods(['none'])
      : setMethods(['minmax', 'max', 'sum', 'vector', 'logarithmic', 'none'])
  }, [])

  return (
    <Grid>
      <TextField
          select
          label={method !== 'PROMETHEE' ? t('calculation:normalization-method') : t('calculation:step2-1')}
          value={getValue()}
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        >
          {method !== 'PROMETHEE' ? getItems(methods): getItems(preferenceFunctions)}
        </TextField>
    </Grid>
  )
}
export default Normalization