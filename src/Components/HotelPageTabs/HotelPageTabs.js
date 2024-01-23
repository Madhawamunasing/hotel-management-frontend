import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function HotelPageTabs() {
  const [value, setValue] = React.useState('Overview')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className='hotel-tabs mt-4 '>
      <Box sx={{ flexGrow: 1, bgcolor: 'bg-transparent' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          textColor='secondary'
          indicatorColor='secondary'
          scrollButtons
          aria-label='visible arrows tabs example'
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.9 },
            },
          }}
        >
          <div className='container-tags'>
            <i class='fa-solid fa-book-open'></i>
            <Tab value='Overview' label='Overview' href='#hotel-description' />
          </div>
          <div className='container-tags'>
            <i class='fa-solid fa-magnifying-glass'></i>
            <Tab
              value='Room-Type'
              label='RoomType'
              href='#room-Type-Selector'
            />
          </div>
          <div className='container-tags'>
            <i class='fa-solid fa-bell-concierge'></i>
            <Tab
              value='Facilities'
              label='Facilities'
              href='#hotel-facilities'
            />
          </div>
          <div className='container-tags'>
            <i class='fa-solid fa-pen-to-square'></i>
            <Tab value='Reviews' label='Reviews' href='#hotel-review' />
          </div>
          <div className='container-tags'>
            <i class='fa-solid fa-location-crosshairs'></i>
            <Tab value='Location' label='Location' href='#hotel-location' />
          </div>
        </Tabs>
      </Box>
    </div>
  )
}
