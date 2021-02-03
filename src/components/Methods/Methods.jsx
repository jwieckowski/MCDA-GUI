import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Panel from './Panel'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Methods = () => {
  const classes = useStyles()
  const [active, setActive] = useState(0)

  const handleChange = (e, value) => {
    setActive(value)
  }
//   if (!loading) {
//     if (!loadError) {
//       content = (
//         <Grid container maxwidth='xs' className={classes.root}>
//           {switchContent(location.pathname, data)}
//         </Grid>
//       )
//     } else {
//       content = <Page404 />
//     }
//   }

  return (
    <Grid className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={active}
        onChange={handleChange}
        aria-label="Method tabs"
        className={classes.tabs}
      >
        <Tab label='TOPSIS' />
        <Tab label='COMET' />
        <Tab label='VIKOR' />
        <Tab label='SPOTIS' />
        <Tab label='COPRAS' />
        <Tab label='AHP' />
        <Tab label='PROMETHEE' />
      </Tabs>
      <Panel value={active} index={0} />
      <Panel value={active} index={1} />
      <Panel value={active} index={2} />
      <Panel value={active} index={3} />
      <Panel value={active} index={4} />
      <Panel value={active} index={5} />
      <Panel value={active} index={6} />
    </Grid>
  )
}
export default Methods