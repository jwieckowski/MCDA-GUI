import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  content: {
    width: '80%',
    height: '70%',
  },
  mainLabel: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    width: '100px',
    display: 'flex',
    justifyContent: 'center'
  },
  results: {
    width: '100%',
    height: '90%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center'
  },
  item: {
    textDecoration: 'none',
    color: 'inherit'
  },
  buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
  space: {
    margin: '0 5px'
  }
})

const inverseMethods = ['VIKOR', 'SPOTIS']

const rankData = (preferences) => {
  const sorted = [...preferences].sort().reverse()
  return preferences.map(p => sorted.indexOf(p)+1)
}

const rankInverseData = (preferences) => {
  const sorted = [...preferences].sort()
  return preferences.map(p => sorted.indexOf(p)+1)
}

const getRankings = (method, results, alternatives) => {
  if (results.includes('NaN')) return Array(alternatives).fill(0)
  return inverseMethods.includes(method) 
    ? rankInverseData(results)
    : rankData(results)
}

const Results = ({ handleReset }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [option, setOption] = useState(false)

  const { method, alternatives, results, fetchingResults, resultsError } = useSelector((state) => state.calculations)

  const handleSwitch = () => {
    setOption(!option)
  }

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

  const getRows = () => {
    if (results === undefined) return

    const content = []
    content.push(
      <Grid
        className={classes.row}
        style={option ? { flexDirection: 'row'} : { flexDirection: 'column'}}
        key={-1}>
        <Grid className={classes.space}><Typography>{t('calculation:alternatives')}</Typography></Grid>
        <Grid className={classes.space}><Typography>{t('calculation:preferences')}</Typography></Grid>
        <Grid className={classes.space}><Typography>{t('common:rankings')}</Typography></Grid>
      </Grid>
    )

    const rankings = getRankings(method, results, alternatives)
    for (let i = 0; i < rankings.length; i++) {
      content.push(
        <Grid 
          className={classes.row}
          style={option ? { flexDirection: 'row'} : { flexDirection: 'column'}}
          key={i}>
          <Grid className={classes.label}><Typography>A{i+1}</Typography></Grid>
          <Grid className={classes.label}><Typography>{parseFloat(results[i]).toFixed(4)}</Typography></Grid>
          <Grid className={classes.label}><Typography>{rankings[i]}</Typography></Grid>
        </Grid>
      )
    }
    return content
  }

  let content = <Typography variant='h3'>{t('common:loading')}</Typography>
  if (!fetchingResults) {
    if (!resultsError) {
      content = (
        <>
          <Grid className={classes.mainLabel}>
            <Typography variant='h5'>{t('common:results')}</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={option === undefined ? false : option}
                  onChange={handleSwitch}
                  name="Upload file"
                  color="primary"
                />
              }
              label={option ? t('calculation:horizontal') : t('calculation:vertical')}
              style={{marginLeft: '5px'}}
            />
          </Grid>
          <Grid 
            className={classes.results}
            style={option ? { flexDirection: 'column'} : { flexDirection: 'row'}}
          >
            {getRows()}
          </Grid>
        </>
      )
    } else {
      content = <Typography variant='h3'>{t('common:error')}</Typography>
    }
  }

  return (
    <Grid className={classes.root}> 
      <Grid className={classes.content}>
        {content}
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
      </Grid>
    </Grid>
  )
}
export default Results