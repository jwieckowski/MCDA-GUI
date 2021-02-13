import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { setMethod, setNormalization } from './../../../../data/actions/calculations.js'

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

const methods = ['TOPSIS', 'COMET', 'VIKOR', 'SPOTIS', 'COPRAS', 'PROMETHEE']

const Method = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { method } = useSelector((state) => state.calculations)

  const handleChange = (event) => {
    dispatch(setMethod(event.target.value))
    dispatch(setNormalization(undefined))
  }

  return (
    <Grid>
      <TextField
          select
          label="MCDA method"
          value={method === undefined ? '' : method}
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        >
          {methods.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography>{option}</Typography>
            </MenuItem>
          ))}
        </TextField>
    </Grid>
  )
}
export default Method