import React from 'react'
import Input from '../macros/Input'
import InputUpload from '../macros/InputUpload'

const DownloadPdf = () => {
  return (
    <div className='t-flex-column t-gap-7'>
      <div className='t-flex-column t-gap-3'>
        <Input placeholder='https://www.yoursite.com/pdf' inputLabel='PDF URL' name='url' />
        <InputUpload
          text='Upload PDF'
          label='Upload File'
          fileType={{'application/pdf': ['.pdf']}}
          variant='pdf'
          description='Max 5 mb'
          name='url'
          maxFiles={1}
        />
      </div>
    </div>
  )
}

export default DownloadPdf
