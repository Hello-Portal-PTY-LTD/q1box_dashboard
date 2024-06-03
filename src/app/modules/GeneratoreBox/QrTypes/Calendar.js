import React from 'react'
import Input from '../macros/Input'

function Calendar() {
  return (
    <div className='t-flex-column t-gap-6'>
      <Input
        placeholder='https://www.yoursite.com/'
        inputLabel='Google Calendar URL'
        classNames='t-h-[45px]'
        name='url'
      />
    </div>
  )
}

export default Calendar
