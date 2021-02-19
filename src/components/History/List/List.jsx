import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import Item from './Item'
import BottomItems from './BottomItems'

const useStyles = makeStyles({
  root: {
    width: '80%',
    height: '70%',
    overflow: 'auto'
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

const MyList = ({ storage, setStorage }) => {
  const classes = useStyles()

  return (
    <List className={classes.root}>
      {storage.map((s, index) => {
        return (
          <Item
            key={index}
            method={s.method}
            results={s.results}
            rankings={s.rankings}
            index={index}
            setStorage={setStorage}
          />
        )
      })}
      <BottomItems setStorage={setStorage} />
    </List>
  )
}
export default MyList