import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { setWeightsType, setWeightsValue, setWeightsMethod } from './../../../../data/actions/calculations.js'

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
  },
  column: {
    width: '90px'
  },
  select: {
    width: '180px;'
  },
  label: {
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const types = ['Profit', 'Cost']
const methods = ['Equal', 'Entropy', 'Standard deviation']

const isSumCorrect = (weights, index, newValue) => {
  const sum = weights.reduce((total, current) => total + current)
  let diff = newValue - weights[index]
  if ((sum + diff) > 1) {
    return false
  } else return true 
}

const Criteria = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [option, setOption] = useState(false)

  const { weightsType, weightsValue, weightsMethod, criteria } = useSelector((state) => state.calculations)

  const handleChange = (event, index) => {
    dispatch(setWeightsType(weightsType.map((val, ind) => ind === index ? event.target.value : val)))
  }

  const handleInput = (event, index) => {
    if(!isSumCorrect(weightsValue, index, event.target.value)) return
    dispatch(setWeightsValue(weightsValue.map((val, ind) => ind === index ? parseFloat(event.target.value) : val)))
  }

  const handleSwitch = (event) => {
    setOption(!option)
    dispatch(setWeightsMethod(undefined))
  }

  const handleSelect = (event) => {
    dispatch(setWeightsMethod(event.target.value))
  }

  useEffect(() => {
    if (criteria === undefined || (weightsType !== undefined && criteria === weightsType.length)) return
    const elements = Array.apply(0, { length: criteria })
    dispatch(setWeightsType(elements.map(m => 'Profit')))
    dispatch(setWeightsValue(elements.map(m => 0)))
  }, [criteria])

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
          label={option ? 'Wprowadź wagi' : 'Wybierz metodę'}
        />
      </Grid>
      {
        criteria ?
        <>
          <Grid className={classes.row}>
            <Grid className={classes.label}>
              <Typography>Typy</Typography>
            </Grid>
            {getTypesColumns().map(column => column)}
          </Grid>
          <Grid className={classes.row}>
            <Grid className={classes.label}>
              <Typography>Wagi</Typography>
            </Grid>
            {!option
              ?  getWeightsColumns().map(column => column)
              : <TextField
                  select
                  value={weightsMethod === undefined ? '' : weightsMethod}
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
      </>
      :
      <Grid className={classes.row}>
        <Typography>Zdefiniuj ilość kryteriów</Typography>
      </Grid>
      }
    </Grid>
  )
}
export default Criteria