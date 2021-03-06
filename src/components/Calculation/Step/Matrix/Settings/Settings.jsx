import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import { ExcelRenderer } from 'react-excel-renderer'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import { setAlternatives, setCriteria, setMatrix, setMatrixFile } from './../../../../../data/actions/calculations.js'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  numberInput: {
    width: '80px'
  }
})

const Settings = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [option, setOption] = useState(false)

  const { alternatives, criteria } = useSelector((state) => state.calculations)

  const handleSwitch = (event) => {
    setOption(!option)
    dispatch(setMatrixFile(undefined))
    dispatch(setAlternatives(undefined))
    dispatch(setCriteria(undefined))
  }

  const handleUpload = (event) => {
    ExcelRenderer(event.target.files[0], (err, resp) => {
      if (err) {
        console.log(err)
        window.alert(t('calculation:file-load-error'))
      } else {
        dispatch(setMatrixFile(event.target.files[0]))
        dispatch(setMatrix(resp.rows))
        dispatch(setAlternatives(resp.rows.length))
        dispatch(setCriteria(resp.rows[0].length))
      }
    })
  }

  const handleAlternatives = (event) => {
    dispatch(setAlternatives(Number.isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value)))
  }

  const handleCriteria = (event) => {
    dispatch(setCriteria(Number.isNaN(parseInt(event.target.value)) ? 1 : parseInt(event.target.value)))
  }

  return (
    <Grid className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={option ?? false}
            onChange={handleSwitch}
            name="Upload file"
            color="primary"
          />
        }
        label={option ? t('calculation:data-input') : t('calculation:load-file')}
      />
      {
        !option
        ? <>
          <TextField
            label={t('calculation:alternatives')}
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                min: 1
            }}
            value={alternatives ?? ''}
            variant="outlined"
            className={classes.numberInput}
            onChange={handleAlternatives}
          />
          <TextField
            label={t('calculation:criteria')}
            type="number"
            InputLabelProps={{
                shrink: true
            }}
            inputProps={{
                min: 1
            }}
            value={criteria ?? ''}
            variant="outlined"
            className={classes.numberInput}
            onChange={handleCriteria}
          />
        </>
      :
        <Input
            type='file'
            inputProps={{accept: ".xlsx, .xls, .csv"}}
            onChange={handleUpload}
        />
      }
    </Grid>
  )
}

export default Settings