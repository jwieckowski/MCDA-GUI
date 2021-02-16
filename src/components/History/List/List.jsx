import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import Item from './Item'

import { setCorrelationsMethod, getCorrelationsResults } from './../../../data/actions/calculations.js'


const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '70%',
    overflow: 'auto'
  },
  results: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  compare: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  input: {
    width: '240px'
  }
})

const correlationMethods = ['spearman', 'pearson', 'weighted spearman', 'rank similarity coef', 'kendall tau', 'goodman kruskal gamma']

const MyList = ({ storage, setStorage }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { correlationsMethod, correlationsRankings, correlationsResults } = useSelector(state => state.calculations)
  
  const checkCorrectness = () => {
    let message = ''
    message += correlationsMethod === undefined
      ? 'Należy wybrać współczynnik korelacji \n'
      : ''
    message += correlationsRankings === undefined
      ? 'Należy wybrać rankingi do porównania'
      : ''
    
    message !== '' && window.alert(message)
    return message === '' ? true : false
  }

  const handleChange = (event) => {
    dispatch(setCorrelationsMethod(event.target.value))
  }

  const handleClear = () => {
    window.localStorage.removeItem('results')
    setStorage([])
  }

  const handleCompare = () => {
    if (!checkCorrectness()) return 
    dispatch(getCorrelationsResults({
      correlationsMethod,
      correlationsResults,
      correlationsRankings
    }))
  }

  return (
    <List className={classes.root}>
      {storage.map((s, index) => {
        return (
          <Item
            method={s.method}
            results={s.results}
            rankings={s.rankings}
            index={index}
            setStorage={setStorage}
          />
        )
      })}
      <ListItem className={classes.buttons}>
        <Button onClick={handleClear} className={classes.button}>
          <Typography>Clear history</Typography>
        </Button>
        <TextField
          select
          label="Correlation method"
          value={correlationsMethod === undefined ? '' : correlationsMethod}
          onChange={handleChange}
          variant="outlined"
          className={classes.input}
        >
          {correlationMethods.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography>{option}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </ListItem>
      <ListItem className={classes.compare}>
        <Button onClick={handleCompare} className={classes.button}>
          <Typography>Compare</Typography>
        </Button>
      </ListItem>
    </List>
  )
}
export default MyList