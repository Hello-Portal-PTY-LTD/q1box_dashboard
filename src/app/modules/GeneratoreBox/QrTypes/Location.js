import React from 'react'
import LocationPicker from '../Location'
import AutoCompleteLocation from '../macros/AutoCompleteLocation'

const Location = () => {
  return (
    <div className='t-flex-column t-gap-5'>
      <div className='t-flex-column t-gap-5'>
        <AutoCompleteLocation />
        {/* <Input
          inputLabel='Google Map Url'
          name='mapUrl'
          placeholder='https://www.google.com/maps/@33.619968,73.039872,12z'
        /> */}
        {/* <span className='t-row-flex t-items-center t-gap-4'>
          <Toggle name='updateAndTrack' />
          <p className='t-text-sm t-text-t1'>Update & Track Later.</p>
        </span> */}
      </div>
      {/* <h3>OR</h3>
      <div className='t-flex t-items-center t-gap-2 t-text-primary t-cursor-pointer'>
        <img
          className='t-cursor-pointer'
          src={GRAPHICS.LOCATION}
          width={13}
          height={13}
          alt='Google_play'
        />
        <p className='t-text-[13px]'>Search on Google Map</p>
      </div> */}
      <LocationPicker />
    </div>
  )
}

export default Location
