import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

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

const methods = ['TOPSIS', 'COMET', 'VIKOR', 'SPOTIS', 'COPRAS', 'AHP', 'PROMETHEE']

const Method = () => {
  const classes = useStyles()
  const [method, setMethod] = useState('TOPSIS')

  const handleChange = (event) => {
    setMethod(event.target.value)
  }
  //   if (!loading) {
//     if (!loadError) {
//       content = (
//         <Grid container maxwidth='xs' className={classes.root}>
//           {switchContent(location.pathname, data)}
//         </Grid>
//       )
//     } else {
//       content = <Page404 />
//     }
//   }

  return (
    <Grid>
      <TextField
          select
          label="MCDA method"
          value={method}
          onChange={handleChange}
          // helperText="Please select MCDA method"
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