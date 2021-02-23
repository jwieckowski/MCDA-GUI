import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next"

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

import { resetCorrelations, addCorrelationsResults, removeCorrelationsResults } from './../../../../../data/actions/correlations.js'

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

  const { correlations, correlationsRankings, correlationsResults, labels } = useSelector(state => state.correlations)

  const handleStateChange = () => {
    if (!correlations) return false
    dispatch(resetCorrelations())
    return true
  } 

  const handleDelete = () => {
    handleStateChange()
    const storage = JSON.parse(window.localStorage['results']).filter((r, ind) => ind !== index)
    window.localStorage.setItem('results', JSON.stringify(storage))
    setStorage(JSON.parse(window.localStorage['results']))
  }

  const handleRemove = (reset) => {
    if (reset) return
    dispatch(removeCorrelationsResults(results, rankings, method))
  }

  const handleAdd = (reset) => {
    if (!reset) {
      if (correlationsRankings !== undefined && JSON.stringify(correlationsRankings) !== JSON.stringify([]) && correlationsRankings[0].length !== rankings.length) {
        window.alert(t('history:cant-compare'))
        return
      } 
    }
    dispatch(addCorrelationsResults(results, rankings, method))
  }

  const handleClick = () => {
    const reset = handleStateChange()
    checkIfAdded(correlationsResults, correlationsRankings, labels, results, rankings, method)
      ? handleRemove(reset) 
      : handleAdd(reset)
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