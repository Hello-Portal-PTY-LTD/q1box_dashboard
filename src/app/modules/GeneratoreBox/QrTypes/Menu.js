import React from 'react'
import ColorPallete from '../ColorPallete'
import InputColor from '../macros/inputColor'
import {COLOR_PALLETES_MENU} from '../utils/mock'
import Input from '../macros/Input'
import Textarea from '../macros/TextArea'
import AddProduct from '../macros/AddProduct'
import PremiumText from '../macros/PremiumText'
import FileUpload from '../macros/FileUpload'
import {useFormContext} from 'react-hook-form'
import {setMenuSelectedPallete} from '../utils/functions'

function Menu() {
  const {setValue} = useFormContext()

  const handlePalleteChange = (pallete) => {
    setMenuSelectedPallete(setValue, pallete)
  }

  return (
    <>
      <div className='t-row-flex t-gap-[10px] t-items-center'>
        <PremiumText text='Design' />
      </div>
      <div className='t-flex-column t-gap-5 md:t-gap-6'>
        <ColorPallete
          pallete={COLOR_PALLETES_MENU}
          palleteClass='t-color-palette-flex'
          onChange={handlePalleteChange}
          type='Menu'
        />
        <div className='t-input-color-wrapper'>
          <InputColor
            classNames='input-color-gap'
            inputLabel='Background Color'
            defaultColor='#5E61F6'
            name='preview.bgColor'
          />
          <InputColor
            classNames='input-color-gap'
            inputLabel='Text Color'
            defaultColor='#ffffff'
            name='preview.textColor'
          />
          <InputColor
            classNames='input-color-gap'
            inputLabel='Button Color'
            defaultColor='#ffffff'
            name='preview.buttonColor'
          />
          <InputColor
            classNames='input-color-gap'
            inputLabel='Border Color'
            defaultColor='#ffffff'
            name='preview.borderColor'
          />
        </div>
        <div className='t-grid t-grid-cols-1 sm:t-grid-cols-2 md:t-grid-cols-3 t-gap-4'>
          <Input name='shopName' inputLabel='Shop Name' placeholder='ShopName e.g' />
          <Input name='storeLink' inputLabel='Store Link' placeholder='https://www.store.com' />
          <Input name='buttonName' inputLabel='Button Name' placeholder='Button Name' />
        </div>
        <PremiumText text='Menu Information' />

        <FileUpload name='preview.coverImage' label='Cover Image' />
        <Input maxLength={30} name='menuName' inputLabel='Menu Name' placeholder='menu1 e.g' />

        <div className='t-flex-column t-gap-2 md:t-gap-6'>
          <Textarea name='description' inputLabel='Description' inputClass='t-h-[70px]' />
          <p>Product Information</p>
        </div>
        <AddProduct />
      </div>
    </>
  )
}

export default Menu
