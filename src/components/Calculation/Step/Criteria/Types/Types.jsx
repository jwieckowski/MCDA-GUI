import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'


import { setWeightsType } from './../../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  column: {
    width: '90px'
  },
  label: {
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const types = ['Profit', 'Cost']

const Types = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { weightsType, criteria } = useSelector((state) => state.calculations)

  const handleChange = (event, index) => {
    dispatch(setWeightsType(weightsType.map((val, ind) => ind === index ? event.target.value : val)))
  }

  const getTypesColumns = () => {
    const content = []
    for (let i = 0; i < criteria; i++) {
      content.push(
        <TextField
          key={i}
          select
          value={weightsType === undefined ? types[0] : weightsType[i]}
          onChange={(e) => handleChange(e, i)}
          variant="outlined"
          className={classes.column}
        >
          {types.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography>{option}</Typography>
            </MenuItem>
          ))}
        </TextField>
      )
    }
    return content
  }

  return (
    <Grid className={classes.row}>
      <Grid className={classes.label}>
        <Typography>{t('calculation:types')}</Typography>
      </Grid>
      {getTypesColumns().map(column => column)}
    </Grid>
  )
}
export default Types