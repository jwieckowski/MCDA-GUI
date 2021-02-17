import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from "react-i18next"

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
    flexDirection: 'column'
  },
  button: {
    marginTop: '10%'
  }
})

const Step = ({ handleBack, handleNext, activeStep, length }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const content = {
    0: <Method />,
    1: <Normalization />,
    2: <Matrix />,
    3: <Criteria />
  }

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
            <Typography>{t('calculation:back')}</Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            <Typography>{activeStep === length - 1 ? t('calculation:finish') : t('calculation:next')}</Typography>
          </Button>
        </div>
      </div>
    </Grid>
  )
}
export default Step