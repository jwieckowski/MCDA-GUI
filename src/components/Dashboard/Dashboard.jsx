import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Menu from './Menu'
import Content from './Content'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Dashboard = () => {
  const classes = useStyles()
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
      <Menu />
      <Content />
    </Grid>
  )
}
export default Dashboard