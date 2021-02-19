import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'

import { setCorrelationsMethod, getCorrelationsResults, resetCorrelations } from './../../../../data/actions/calculations.js'


const useStyles = makeStyles({
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

const BottomItems = ({ setStorage }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { correlationsMethod, correlationsRankings, correlationsResults } = useSelector(state => state.calculations)
  
  const checkCorrectness = () => {
    let message = ''
    message += correlationsMethod === undefined
      ? t('history:message1')
      : ''
    message += correlationsRankings === undefined
      ? t('history:message2')
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

  const handleReset = () => {
    dispatch(resetCorrelations())
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
    <> 
      <ListItem className={classes.buttons}>
        <Button onClick={handleClear} className={classes.button}>
          <Typography>{t('history:clear-history')}</Typography>
        </Button>
        <TextField
          select
          label={t('history:correlation-method')}
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
        <Button onClick={handleReset} className={classes.button}>
          <Typography>{t('common:reset')}</Typography>
        </Button>
        <Button onClick={handleCompare} className={classes.button}>
          <Typography>{t('history:compare')}</Typography>
        </Button>
      </ListItem>
    </>
  )
}
export default BottomItems