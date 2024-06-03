import React from 'react'
import Input from '../macros/Input'

const MakeCall = () => {
  return (
    <div className='t-flex-column t-gap-5'>
      <Input name='phone' placeholder='+61 1234567890' inputLabel='Mobile Number' />
    </div>
  )
}

export default MakeCall
