import React from 'react'
import Input from '../macros/Input'

function ReviewCollector() {
  return (
    <div className='t-flex-column t-gap-6'>
      <Input
        placeholder='example (https://www.google.com)'
        inputLabel='Enter Link To Collect Review'
        classNames='t-h-[45px]'
        name='url'
      />
    </div>
  )
}

export default ReviewCollector
