import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CorrelationTable from './CorrelationTable'
import List from './List'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
})

const History = () => {
  const classes = useStyles()
  const [storage, setStorage] = useState([])

  const checkHistoryResults = () => {
    return window.localStorage['results'] ? true : false
  }

  useEffect(() => {
    window.localStorage['results'] && setStorage(JSON.parse(window.localStorage['results']))
  }, [])

  return (
    <Grid className={classes.root}>
      {
        checkHistoryResults()
          ? <Grid className={classes.content}>
              <CorrelationTable />
              <List 
                storage={storage}  
                setStorage={setStorage}
              />
            </Grid>
          : <Typography variant='h4'>Brak danych</Typography>
      }
    </Grid>
  )
}
export default History