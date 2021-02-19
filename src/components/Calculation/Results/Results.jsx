import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import BottomPanel from './BottomPanel'
import getRankings from './helpers.js'

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
  row: {
    display: 'flex',
    flexDirection: 'column'
  },
  space: {
    margin: '0 5px'
  }
})

const Results = ({ handleReset }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [option, setOption] = useState(false)

  const { method, alternatives, results, fetchingResults, resultsError } = useSelector((state) => state.calculations)

  const handleSwitch = () => {
    setOption(!option)
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
        <BottomPanel handleReset={handleReset} />
      </Grid>
    </Grid>
  )
}
export default Results