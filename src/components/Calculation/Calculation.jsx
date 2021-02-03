import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import Summary from './Summary'
import MyStep from './Step'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  stepper: {
    width: '80%',
    height: '70%',
    // overflow: 'auto'
    // backgroundColor: 'yellow'
  },
  step: {
    width: '100%',
    // backgroundColor: 'blue'
  }
})

function getSteps() {
  return ['Metoda MCDA', 'Normalizacja', 'Macierz decyzyjna', 'Wagi i typ kryteriów']
}

const Calculation = () => {
  const classes = useStyles()

  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
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
      <Summary />
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepper}
      >
        {steps.map((label, index) => (
          <Step key={label} className={classes.step}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <MyStep 
                handleBack={handleBack}
                handleNext={handleNext}
                activeStep={activeStep}
                length={steps.length}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </Grid>
  )
}
export default Calculation