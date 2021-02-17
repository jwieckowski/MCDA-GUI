import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50
  }
}))

export default function LanguageSelect () {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language)

  const changeLanguage = (e) => {
    const lang = e.target.value
    if (lang === language) { return }
    window.localStorage.setItem('language', lang)
    i18n.changeLanguage(lang)
    setLanguage(lang)
  }

  if (i18n.language !== 'en' && i18n.language !== 'pl') {
    changeLanguage('en')
  }

  return (
    <FormControl className={classes.formControl} variant='outlined'>
      <Select
        value={language}
        onChange={changeLanguage}
        displayEmpty
      >
        <MenuItem value='en'>EN</MenuItem>
        <MenuItem value='pl'>PL</MenuItem>
      </Select>
    </FormControl>
  )
}