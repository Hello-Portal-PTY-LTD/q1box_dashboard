import React from 'react'
import Input from '../macros/Input'

function LandingPage() {
  return (
    <div className='t-flex-column t-gap-6'>
      <Input
        placeholder='(https://www.google.com)'
        inputLabel='Landing Page URL'
        classNames='t-h-[45px]'
        name='url'
      />
      <Input
        placeholder='(https://www.google.com)'
        inputLabel='Landing Page URL'
        classNames='t-h-[45px]'
        name='url2'
      />
      <Input
        placeholder='(https://www.google.com)'
        inputLabel='Landing Page URL'
        classNames='t-h-[45px]'
        name='url3'
      />
    </div>
  )
}

export default LandingPage
