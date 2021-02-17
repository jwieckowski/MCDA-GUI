import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

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

const checkIfAdded = (correlationsResults, correlationsRankings, labels, results, rankings, method) => {
  if (correlationsResults === undefined) return false
  const stringResults = correlationsResults.map(r => JSON.stringify(r))
  const stringRankings = correlationsRankings.map(r => JSON.stringify(r))
  const element = stringResults.filter((r, ind) => r === JSON.stringify(results) && stringRankings[ind] === JSON.stringify(rankings) && labels[ind] === method)[0]
  return stringResults.indexOf(element) !== -1
}

const Item = ({ method, results, rankings, index, setStorage }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const DISPLAYED_ELEMENTS = 6

  const { correlationsRankings, correlationsResults, labels } = useSelector(state => state.calculations)

  const handleDelete = () => {
    const storage = JSON.parse(window.localStorage['results']).filter((r, ind) => ind !== index)
    window.localStorage.setItem('results', JSON.stringify(storage))
    setStorage(JSON.parse(window.localStorage['results']))
  }
  const handleAdd = () => {
    if (correlationsRankings !== undefined && JSON.stringify(correlationsRankings) !== JSON.stringify([]) && correlationsRankings[0].length !== rankings.length) {
      window.alert(t('history:cant-compare'))
      return
    } 
    dispatch(addCorrelationsResults(results, rankings, method))
  }

  const handleClick = () => {
    checkIfAdded(correlationsResults, correlationsRankings, labels, results, rankings, method)
      ? dispatch(removeCorrelationsResults(results, rankings, method)) 
      : handleAdd()
  }

  return (
    <ListItem>
      <ListItemText
        primary={method}
        secondary={
          <Grid className={classes.details}>
            <Grid className={classes.results}>
                <Typography className={classes.label}>{t('common:results')}:</Typography>
                {prepareList(results, DISPLAYED_ELEMENTS, true).map((r, ind) => {
                  return (
                    <Typography key={ind} className={classes.label}>{r}</Typography>      
                )
                })}
              </Grid>
              <Grid className={classes.results}>
                <Typography className={classes.label}>{t('common:rankings')}:</Typography>
                {prepareList(rankings, DISPLAYED_ELEMENTS, false).map((r, ind) => {
                  return (
                    <Typography key={ind} className={classes.label}>{r}</Typography>      
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
            checkIfAdded(correlationsResults, correlationsRankings, labels, results, rankings, method)
              ? <CheckCircleIcon/>
              : <CheckCircleOutlineIcon />
          }
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
export default Item