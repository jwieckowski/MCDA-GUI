import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'

import Summary from './Summary'
import MyStep from './Step'
import Results from './Results'

import { checkForm, resetForm } from './../../data/actions/calculations.js'
import { getResults } from './../../data/actions/results.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '85%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  content: {
    width: '80%',
    height: '70%',
  },
  step: {
    width: '100%',
  }
})

const Calculation = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const initialSteps = [t('calculation:step1'), t('calculation:step2'), t('calculation:step3'), t('calculation:step4')]

  const { method, normalization, alternatives, criteria, matrix, matrixFile, weightsValue, weightsType, weightsMethod, preferenceFunction, formFilled } = useSelector((state) => state.calculations)

  
  const [steps, setSteps] = useState(initialSteps)
  const [activeStep, setActiveStep] = React.useState(0)

  const showFormInfo = () => {
    let message = method === undefined ? t('calculation:message1') : ''
    message += (normalization === undefined  && preferenceFunction === undefined) ? t('calculation:message2') : ''
    message += alternatives === undefined ? t('calculation:message3') : ''
    message += criteria === undefined ? t('calculation:message4') : ''
    if (matrix !== undefined) {
      message += (matrix.reduce((total, array) => {
        return total + array.reduce((sum, current) => sum + current)
      })[0] === 0) ? t('calculation:message5'): ''
    }
    if (weightsMethod === undefined) {
      if (weightsValue !== undefined) { 
        message += (weightsValue.reduce((total, current) => total + current) !== 1)
          ? t('calculation:message6') : ''
      }
    }
    message !== '' && window.alert(message)
  }
  
  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      dispatch(checkForm())
      showFormInfo()
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    dispatch(resetForm())
    setActiveStep(0)
  }

  const sendData = () => {
    dispatch(getResults({
      method,
      normalization,
      alternatives,
      criteria,
      matrix,
      matrixFile,
      weightsType,
      weightsValue,
      weightsMethod,
      preferenceFunction
    }))
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  useEffect(() => {
    if (activeStep + 1 === steps.length) {
      formFilled && sendData()
    }
  }, [formFilled])

  useEffect(() => {
    method === 'PROMETHEE'
      ? setSteps(steps.map((step, index) => {
        return index === 1
          ? t('calculation:step2-1')
          : step
      }))
      : setSteps(initialSteps)
  }, [method])
  
  return (
    <Grid className={classes.root}>
      <Summary />
      {
        !formFilled
        ? <>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.content}
          >
            {steps.map((label, index) => (
              <Step key={index} className={classes.step}>
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
        </>
        : <Results
            handleReset={handleReset}
          />
      }
    </Grid>
  )
}
export default Calculation