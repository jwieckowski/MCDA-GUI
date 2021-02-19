import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'
import getRankings from './../helpers.js'

const useStyles = makeStyles({
  item: {
    textDecoration: 'none',
    color: 'inherit'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

const BottomPanel = ({ handleReset }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const { method, alternatives } = useSelector((state) => state.calculations)
  const { results } = useSelector((state) => state.results)

  const handleSave = () => {
    const data = {
      method,
      results,
      rankings: getRankings(method, results, alternatives)
    }

    if (window.localStorage['results']) {
      const storage = [
        data,
        ...JSON.parse(window.localStorage['results'])
      ]
      window.localStorage.setItem('results', JSON.stringify(storage))
    } else {
      window.localStorage.setItem('results', JSON.stringify([data]))  
    }
    window.alert(t('calculation:save-results'))
  }
  
  return (
    <Grid className={classes.buttons}>
      <Link
        to='/history'
        className={classes.item}
      >
        <Button className={classes.button}>
          <Typography>{t('calculation:history')}</Typography>
        </Button>
      </Link>
      <Grid>
        {
          results !== undefined && !results.includes('NaN') &&
          <Button onClick={handleSave} className={classes.button}>
            <Typography>{t('calculation:save')}</Typography>
          </Button>
        }
        <Button onClick={handleReset} className={classes.button}>
          <Typography>{t('common:reset')}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}
export default BottomPanel