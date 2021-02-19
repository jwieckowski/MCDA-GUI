import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ItemActions from './ItemActions'

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

const Item = ({ method, results, rankings, index, setStorage }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const DISPLAYED_ELEMENTS = 6

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
      <ItemActions
        method={method}
        results={results}
        rankings={rankings}
        index={index}
        setStorage={setStorage}
      />
    </ListItem>
  )
}
export default Item