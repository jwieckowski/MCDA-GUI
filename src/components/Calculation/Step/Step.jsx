import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Method from './Method'
import Matrix from './Matrix'
import Normalization from './Normalization'
import Criteria from './Criteria'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  button: {
    marginTop: '10%'
  }
})

const Step = ({ handleBack, handleNext, activeStep, length }) => {
  const classes = useStyles()

  const content = {
    0: <Method />,
    1: <Normalization />,
    2: <Matrix />,
    3: <Criteria />
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
      {content[activeStep]}
      <div className={classes.actionsContainer}>
        <div>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
          >
            <Typography>Back</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            <Typography>{activeStep === length - 1 ? 'Finish' : 'Next'}</Typography>
          </Button>
        </div>
      </div>
    </Grid>
  )
}
export default Step