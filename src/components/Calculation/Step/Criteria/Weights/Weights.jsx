import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import { setWeightsValue, setWeightsMethod } from './../../../../../data/actions/calculations.js'

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
  select: {
    width: '180px;'
  },
  label: {
    width: '70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const methods = ['Equal', 'Entropy', 'Standard deviation']

const isSumCorrect = (weights, index, newValue) => {
  const sum = weights.reduce((total, current) => total + current)
  let diff = newValue - weights[index]
  if ((sum + diff) > 1) {
    return false
  } else return true 
}

const Weights = ({ option }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { weightsValue, weightsMethod, criteria } = useSelector((state) => state.calculations)

  const handleInput = (event, index) => {
    if(!isSumCorrect(weightsValue, index, event.target.value)) return
    dispatch(setWeightsValue(weightsValue.map((val, ind) => ind === index ? parseFloat(event.target.value) : val)))
  }

  const handleSelect = (event) => {
    dispatch(setWeightsMethod(event.target.value))
  }

  const getWeightsColumns = () => {
    const content = []
    for (let i = 0; i < criteria; i++) {
      content.push(
        <TextField
            key={i}
            type={"number"}
            value={weightsValue === undefined ? 0 : weightsValue[i]}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
              min: 0,
              max: 1,
              step: 0.01
            }}
            variant="outlined"
            className={classes.column}
            onChange={(e) => handleInput(e, i)}
          />
      )
    }
    return content
  }

  return (
    <Grid className={classes.row}>
      <Grid className={classes.label}>
        <Typography>{t('calculation:weights')}</Typography>
      </Grid>
        {!option
            ?  getWeightsColumns().map(column => column)
            : <TextField
                select
                value={weightsMethod ?? ''}
                onChange={handleSelect}
                variant="outlined"
                className={classes.select}
            >
                {methods.map((option) => (
                <MenuItem key={option} value={option}>
                    <Typography>{option}</Typography>
                </MenuItem>
                ))}
            </TextField>
        }
    </Grid>
  )
}
export default Weights