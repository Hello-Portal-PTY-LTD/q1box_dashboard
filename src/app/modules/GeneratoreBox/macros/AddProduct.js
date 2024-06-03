import React, {useEffect, useState} from 'react'

import {useFormContext, useWatch} from 'react-hook-form'
import FileUpload from './FileUpload'
import Input from './Input'
import InputColor from './inputColor'
import Button from './Button'
import bin from '../graphics/svgs/icons/bin_2.svg'
function AddProduct() {
  const [productCount, setProductCount] = useState(1)
  const {setValue} = useFormContext()
  const products = useWatch({name: 'products'})

  useEffect(() => {
    setProductCount(products?.length || 1)
  }, [products])

  const handleAddProduct = () => {
    setProductCount((prevCount) => prevCount + 1)
    setValue(`products[${productCount}]`, {
      price: null,
      name: '',
      textColor: '#00000',
      bgColor: '#ffffff',
    })
  }

  const handleDeleteProduct = (index) => {
    setProductCount((prevCount) => prevCount - 1)
    setValue(
      'products',
      products.filter((_, productIndex) => productIndex !== index)
    )
  }

  return (
    <>
      {Array.from({length: productCount}, (_, index) => (
        <div
          key={index}
          className='t-bg-light t-relative t-rounded-[10px] t-text-t1 t-antialiased t-px-6 t-py-6 t-mt-5'
        >
          {index >= 1 && (
            <img
              className='t-cursor-pointer t-absolute t-right-[30px]'
              src={bin}
              width={36}
              height={36}
              alt='input-delete'
              onClick={() => handleDeleteProduct(index)}
            />
          )}

          <div className='t-space-y-3'>
            <FileUpload
              label={`Product Image ${index}`}
              preLabel='Product Image'
              name={`products[${index}].image`}
              qrType='Menu'
              keyIndex={index}
            />
            <div className='t-grid t-grid-cols-1 sm:t-grid-cols-2 t-gap-4'>
              <Input
                inputLabel='Product Name'
                placeholder='Product Name'
                name={`products[${index}].name`}
                bg='light'
              />
              <Input
                inputLabel='Price'
                placeholder='E.g $20'
                bg='light'
                name={`products[${index}].price`}
              />
            </div>
            <div className='t-flex t-w-full t-gap-2'>
              <InputColor name={`products[${index}].textColor`} inputLabel='Text Color' />
              <InputColor name={`products[${index}].bgColor`} inputLabel='Background Color' />
            </div>
          </div>
        </div>
      ))}
      <div className='t-mt-10'>
        <Button
          text='+ Add More'
          actionType='button'
          type='gradient'
          buttonClass='t-rounded-xl t-h-[50px] t-bg-none t-w-full'
          onClick={handleAddProduct}
        />
      </div>
    </>
  )
}

export default AddProduct
