import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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

const Settings = ({option, handleSwitch, handleChange, handleUpload}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={option}
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
            variant="outlined"
            className={classes.numberInput}
            onChange={(e) => handleChange(e, 1)}
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
            variant="outlined"
            className={classes.numberInput}
            onChange={(e) => handleChange(e, 2)}
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