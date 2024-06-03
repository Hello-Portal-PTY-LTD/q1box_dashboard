import React from 'react'
import InputUpload from '../macros/InputUpload'
import Input from '../macros/Input'
import {useFormContext} from 'react-hook-form'
import InputColor from '../macros/inputColor'

const UploadImage = () => {
  const {formState} = useFormContext()
  const errors = formState.errors
  return (
    <div className='t-flex-column t-gap-3'>
      <Input
        placeholder='Gallery Name'
        inputLabel='Gallery Name'
        classNames='t-h-[45px]'
        name='galleryName'
      />
      <InputColor
        name='backgroundColor'
        inputLabel='Background Color'
        defaultColor='#ffffff'
        classNames='t-w-[25%]'
      />
      <InputUpload
        text='Upload Photo'
        label='Images'
        type='uploadImage'
        name='files'
        maxFiles={10}
        fileType={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg', '.jpg'],
        }}
        description='10 Photos Max'
      />
      {errors?.files && (
        <p className='t-text-primary t-text-xs'>Please Select at least one file.</p>
      )}
    </div>
  )
}

export default UploadImage
