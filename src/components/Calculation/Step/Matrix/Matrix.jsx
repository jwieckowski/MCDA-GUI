import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Settings from './Settings'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  settings: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  numberInput: {
    width: '80px'
  },
  matrix: {
    width: '100%',
    marginTop: '20px'
  },
  label: {
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  column: {
    width: '70px'
  }
})

const initialSize = {
  alternatives: 1,
  criteria: 1
}

const Matrix = () => {
  const classes = useStyles()
  const [option, setOption] = useState(false)
  const [matrixSize, setMatrixSize] = useState(initialSize)
  const [file, uploadFile] = useState(undefined)

  const handleSwitch = (event) => {
    setOption(!option)
  }

  const handleChange = (event, option) => {
    option === 1
      ? setMatrixSize({
        alternatives: parseInt(event.target.value),
        criteria: matrixSize.criteria
      })
      : setMatrixSize({
        alternatives: matrixSize.alternatives,
        criteria: parseInt(event.target.value)
      })
  }

  const handleUpload = (event) => {
    uploadFile(event.target.value)
  }


  const getColumns = () => {
    const content = []
    for (let i = 0; i < matrixSize.criteria; i++) {
      content.push(
        <TextField
            key={i}
            type="number"
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

  const getRows = () => {
    if (matrixSize.alternatives === 0 || matrixSize.criteria === 0) return
    const content = []

    for (let i = 0; i < matrixSize.alternatives; i++) {
      content.push(
        <Grid className={classes.row} key={i}>
          <Grid className={classes.label}><Typography>A{i+1}</Typography></Grid>
          {getColumns().map(column => column)}
        </Grid>
      )
    }
    return content
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
    <Grid className={classes.root}>
      <Grid>
        <Settings
          option={option}
          handleSwitch={handleSwitch}
          handleChange={handleChange}
          handleUpload={handleUpload}
        />
        <Grid className={classes.matrix}>
          {getRows()}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Matrix