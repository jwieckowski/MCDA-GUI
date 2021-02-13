import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { setAlternatives, setCriteria, setMatrixFile } from './../../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  numberInput: {
    width: '80px'
  }
})

const Settings = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [option, setOption] = useState(false)

  const { alternatives, criteria, matrixFile } = useSelector((state) => state.calculations)

  const handleSwitch = (event) => {
    setOption(!option)
    dispatch(setMatrixFile(undefined))
    dispatch(setAlternatives(undefined))
    dispatch(setCriteria(undefined))
  }

  const handleUpload = (event) => {
    dispatch(setMatrixFile(event.target.value))
  }

  const handleAlternatives = (event) => {
    dispatch(setAlternatives(Number.isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value)))
  }

  const handleCriteria = (event) => {
    dispatch(setCriteria(Number.isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value)))
  }


  return (
    <Grid className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={option === undefined ? false : option}
            onChange={handleSwitch}
            name="Upload file"
            color="primary"
          />
        }
        label={option ? 'Wprowadź dane' : 'Załaduj plik'}
      />
      {
        !option
        ? <>
          <TextField
            label="Alternatives"
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                min: 1
            }}
            value={alternatives === undefined ? '' : alternatives}
            variant="outlined"
            className={classes.numberInput}
            onChange={handleAlternatives}
          />
          <TextField
            label="Criteria"
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                min: 1
            }}
            value={criteria === undefined ? '' : criteria}
            variant="outlined"
            className={classes.numberInput}
            onChange={handleCriteria}
          />
        </>
      :
        <Input
            type='file'
            inputProps={{accept: ".xlsx, .xls, .csv"}}
            onChange={handleUpload}
        />
      }
    </Grid>
  )
}

export default Settings