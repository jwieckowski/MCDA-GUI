import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

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

const Criteria = () => {
  const classes = useStyles()
  const [type, setType] = useState(['Profit','Profit','Profit','Profit','Profit','Profit','Profit'])
  const [option, setOption] = useState(false)
  const [method, setMethod] = useState('Equal')
  const types = ['Profit', 'Cost']
  const methods = ['Equal', 'Entropy', 'Standard deviation']

  const handleChange = (event, index) => {
    setType(type.map((val, ind) => ind === index ? event.target.value : val))
  }

  const handleSwitch = (event) => {
    setOption(!option)
  }

  const handleSelect = (event) => {
    setMethod(event.target.value)
  }

  const getTypesColumns = () => {
    const content = []
    for (let i = 0; i < 7; i++) {
      content.push(
        <TextField
          select
          value={type[i]}
          onChange={handleChange}
          // helperText="Please select MCDA method"
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
    for (let i = 0; i < 7; i++) {
      content.push(
        <TextField
            key={i}
            type={"number"}
            InputLabelProps={{
                shrink: true,
            }}
            variant="outlined"
            className={classes.column}
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
              value={method}
              onChange={handleSelect}
              // helperText="Please select MCDA method"
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
    </Grid>
  )
}
export default Criteria