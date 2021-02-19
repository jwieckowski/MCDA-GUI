import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next"

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { addCorrelationsResults, removeCorrelationsResults } from './../../../../../data/actions/calculations.js'

const checkIfAdded = (correlationsResults, correlationsRankings, labels, results, rankings, method) => {
  if (correlationsResults === undefined) return false
  const stringResults = correlationsResults.map(r => JSON.stringify(r))
  const stringRankings = correlationsRankings.map(r => JSON.stringify(r))
  const element = stringResults.filter((r, ind) => r === JSON.stringify(results) && stringRankings[ind] === JSON.stringify(rankings) && labels[ind] === method)[0]
  return stringResults.indexOf(element) !== -1
}

const ItemActions = ({ method, results, rankings, index, setStorage }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

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
  )
}
export default ItemActions