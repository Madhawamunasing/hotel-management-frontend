import { useSearchParams } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateRangePicker from '@mui/lab/DateRangePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import * as React from 'react'

export default function DatepickerModal({ setDateRange, dateRange }) {
  const [searchedParams, setSearchedparams] = useSearchParams()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText='Check-in'
        endText='Check-out'
        value={dateRange}
        onChange={(newValue) => {
          setDateRange(newValue)
        }}
        disablePast
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  )
}
