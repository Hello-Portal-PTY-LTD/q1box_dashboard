import React from 'react'
import PremiumText from '../macros/PremiumText'
import InputColor from '../macros/inputColor'
import ColorPallete from '../ColorPallete'
import {VIDEO_PALLETE} from '../utils/mock'
import Input from '../macros/Input'
import Textarea from '../macros/TextArea'
import {useFormContext} from 'react-hook-form'

function Video() {
  const {setValue} = useFormContext()
  const handlePalleteChange = (pallete) => {
    setValue('preview.backGroundColor', pallete.backGroundColor)
    setValue('preview.buttonColor', pallete.iconsColor)
    setValue('preview.textColor', pallete.textColor)
  }

  return (
    <>
      <div className='t-row-flex t-gap-[10px] t-items-center'>
        <PremiumText text='Design' />
      </div>
      <div className='t-flex-column t-break-words t-gap-6'>
        <ColorPallete
          pallete={VIDEO_PALLETE}
          palleteClass='t-color-palette-flex'
          onChange={handlePalleteChange}
        />
        <div className='t-input-color-wrapper'>
          <InputColor
            classNames='t-gap-5'
            inputLabel='Background Color'
            name='preview.backGroundColor'
            defaultColor='#5E61F6'
          />
          <InputColor
            classNames='t-gap-5'
            inputLabel='Button Color'
            name='preview.buttonColor'
            defaultColor='#ffffff'
          />
          <InputColor
            classNames='t-gap-5'
            inputLabel='Text Color'
            defaultColor='#ffffff'
            name='preview.textColor'
          />
        </div>
        <Input name='videoTitle' inputLabel='Video Title' placeholder='Video Title (e.g)' />
        <Textarea name='description' inputLabel='Description' inputClass='t-h-[70px]' />
        <Input name='videoUrl' inputLabel='Video URL' placeholder='Paste a video link' />
      </div>
    </>
  )
}

export default Video
