import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { addCorrelationsResults, removeCorrelationsResults } from './../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '85%',
  },
  details: {
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column'
  },
  results: {
    display: 'flex',
    flexDirection: 'row'
  },
  label: {
    width: '80px'
  }
})

const prepareList = (list, number, flag) => {
  let preparedList = list.length > number ? list.filter((l, ind) => ind < number) : list
  preparedList = flag ? preparedList.map(l => l.toFixed(4)) : preparedList
  return list.length > number ? [...preparedList, '...'] : preparedList
}

const checkIfAdded = (rankings, r2, index) => {
  if (rankings === undefined) return false
  return rankings.filter((r, ind) => JSON.stringify(r) === JSON.stringify(r2) && ind === index).length !== 0
}

const Item = ({ method, results, rankings, index, setStorage }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const DISPLAYED_ELEMENTS = 6

  const { correlationsRankings, correlationsResults } = useSelector(state => state.calculations)

  const handleDelete = () => {
    const storage = JSON.parse(window.localStorage['results']).filter((r, ind) => ind !== index)
    window.localStorage.setItem('results', JSON.stringify(storage))
    setStorage(JSON.parse(window.localStorage['results']))
  }

  const handleClick = () => {
    checkIfAdded(correlationsRankings, rankings, index)
      ? dispatch(removeCorrelationsResults(index)) 
      : dispatch(addCorrelationsResults(results, rankings))
  }

  return (
    <ListItem>
      <ListItemText
        primary={method}
        secondary={
          <Grid className={classes.details}>
            <Grid className={classes.results}>
                <Typography className={classes.label}>Results:</Typography>
                {prepareList(results, DISPLAYED_ELEMENTS, true).map(r => {
                  return (
                    <Typography className={classes.label}>{r}</Typography>      
                )
                })}
              </Grid>
              <Grid className={classes.results}>
                <Typography className={classes.label}>Rankings:</Typography>
                {prepareList(rankings, DISPLAYED_ELEMENTS, false).map(r => {
                  return (
                    <Typography className={classes.label}>{r}</Typography>      
                )
                })}
            </Grid>
          </Grid>
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete} edge="end" aria-label="comments">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleClick} edge="end" aria-label="comments">
          {
            checkIfAdded(correlationsRankings, rankings, index)
              ? <CheckCircleIcon/>
              : <CheckCircleOutlineIcon />
          }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default Item