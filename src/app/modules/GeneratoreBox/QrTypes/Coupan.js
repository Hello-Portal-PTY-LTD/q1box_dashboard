import {COLOR_PALLETES_COUPON} from '../utils/mock'
import {SECONDS, HOURS, MINUTES} from '../utils/mock'
import {useFormContext} from 'react-hook-form'
import ColorPallete from '../ColorPallete'
import DropDown from '../macros/DropDown'
import FileUpload from '../macros/FileUpload'
import Input from '../macros/Input'
import InputColor from '../macros/inputColor'
import InputGradient from '../macros/InputGradient'
import PremiumText from '../macros/PremiumText'
import React from 'react'
import Textarea from '../macros/TextArea'

function Coupan() {
  const {setValue} = useFormContext()

  const handlePalleteChange = (pallete) => {
    setValue('preview.bgColor', pallete.backGroundColor)
    setValue('preview.textColor', pallete.textColor)
    setValue('preview.buttonColor', pallete.iconsColor)
  }

  return (
    <section className='t-flex-column t-gap-2'>
      <div className='t-text-lg t-font-medium'>
        <PremiumText text='Design' />
      </div>
      <div className=' t-flex-column t-gap-6 '>
        <ColorPallete
          pallete={COLOR_PALLETES_COUPON}
          palleteClass='t-color-palette-flex'
          onChange={handlePalleteChange}
        />
        <div className='t-input-color-wrapper'>
          <InputColor
            name='preview.bgColor'
            contextFor='coupan'
            classNames='input-color-gap'
            inputLabel='Background Color'
          />
          <InputColor inputLabel='Button color' contextFor='coupan' name='preview.buttonColor' />
          <InputColor
            name='preview.textColor'
            inputLabel='Text color'
            contextFor='coupan'
            defaultColor='#ffffff'
          />
        </div>
        <div className='t-row-flex t-w-full t-gap-10 md:gap-40'>
          <FileUpload label='Cover Image' name='preview.coverImage' />
        </div>
        <div className='t-flex-column t-gap-2 t-md:gap-4'>
          <div className='t-grid t-grid-cols-1 sm:t-grid-cols-2 t-gap-4'>
            <Input
              inputLabel='Coupon No*'
              classNames='input-color-gap'
              placeholder='e.g. CouponID100'
              defaultColor='#ffffff'
              name='couponNo'
            />
            <Input
              inputLabel='Sales Badge*'
              classNames='input-color-gap'
              placeholder='10%  OFF'
              defaultColor='#ffffff'
              name='salePercentage'
            />
          </div>
          <div className=''>
            <p className='t-block t-text-sm lg:t-text-base t-mb-2 t-font-medium t-text-gray-90'>
              Coupon Timer
            </p>
            <div className='t-grid t-grid-cols-1 lg:t-grid-cols-2 xl:t-grid-cols-3 t-gap-6'>
              <DropDown name='couponTime.hours' title='Select hours' listItems={HOURS} />
              <DropDown name='couponTime.minutes' title='Select Minutes' listItems={MINUTES} />
              <DropDown name='couponTime.seconds' title='Select Seconds' listItems={SECONDS} />
            </div>
          </div>
          <Textarea
            inputLabel='Coupon Details'
            placeholder='Enter Coupon Detail..'
            name='couponDetails'
          />
          <div className=' t-flex-column t-mt-2'>
            <p className='t-block t-mb-2 t-font-medium t-text-gray-90'>Call to Action</p>
            <span className='t-flex t-flex-column 500:t-flex-row t-gap-5 t-font-medium'>
              <InputGradient
                name='buttonText'
                label='Button Name'
                maxLength={18}
                placeholder='Get It Now!'
              />
              <InputGradient name='buttonLink' label='Button Link' placeholder='www.example.com' />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Coupan
