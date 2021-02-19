import React from 'react'
import {  Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'black'
    }
  },
  icon: {
    paddingRight: '5px'
  }
})

const Tab = ({ path, icon, label, active }) => {
  const classes = useStyles()

  return (
    <Link 
      to={path}
      className={classes.item}
      style={{color: active ? 'black': 'inherit'}}
    >
      {icon}
      <Typography variant='h5'>{label}</Typography>
    </Link>
  )
}
export default Tab