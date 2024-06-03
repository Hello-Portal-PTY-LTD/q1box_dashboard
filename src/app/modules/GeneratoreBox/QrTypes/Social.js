import { COLOR_PALLETES_ADVANCE_LINKS, socialIcons } from '../utils/mock'
import { setSelectedPallets } from '../utils/functions'
import { useFieldArray, useFormContext } from 'react-hook-form'
import ColorPallete from '../ColorPallete'
import FileUpload from '../macros/FileUpload'

import Input from '../macros/Input'
import InputColor from '../macros/inputColor'
import InputWithIcon from '../macros/InputWithIcon'
import PremiumText from '../macros/PremiumText'
import React, { useEffect, useState } from 'react'
import { GRAPHICS } from '../graphics'

function Social() {
  const { fields, append, remove, move } = useFieldArray({ name: 'links' })
  const { getValues, setValue } = useFormContext()
  const [formValues, setFormValues] = useState([])

  const onChange = (value) => {
    if (value) {
      setSelectedPallets(setValue, value)
    }
  }

  useEffect(() => {
    const formValues = getValues()
    setFormValues(formValues.links)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues()])

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
  }

  const handleDrop = (e, dropIndex) => {
    const draggedIndex = e.dataTransfer.getData('text/plain')
    move(draggedIndex, dropIndex)
  }

  return (
    <section className='t-flex-column t-gap-2'>
      <div className='t-text-lg t-font-medium'>
        <PremiumText text='Design' />
      </div>
      <div className='t-flex-column t-gap-6 '>
        <ColorPallete
          pallete={COLOR_PALLETES_ADVANCE_LINKS}
          palleteClass='t-color-palette-flex'
          onChange={onChange}
          type='advanceLinks'
        />
        <div className='t-input-color-wrapper'>
          <InputColor name='preview.bgColor' inputLabel='Background Color' defaultColor='#5E61F6' />
          <InputColor name='preview.iconsColor' inputLabel='Icons color' defaultColor='#5E61F6' />
          <InputColor name='preview.textColor' inputLabel='Text color' defaultColor='#ffffff' />
        </div>

        <div className='t-row-flex t-w-full t-gap-10 t-md:gap-40'>
          <FileUpload
            label='Cover Image'
            accept='image/*'
            // onChange={handleProfileImage}
            name='preview.coverImage'
          />
          <FileUpload
            label='Profile Image'
            accept='image/*'
            name='preview.profileImage'
          // onChange={handleCoverImage}
          />
        </div>

        <div className='t-flex-column t-gap-5'>
          <div className='t-flex t-items-center t-flex-wrap 1320:t-flex-nowrap t-gap-5'>
            {socialIcons.map(({ name, url, Icon, type }) => {
              return (
                <div
                  key={name}
                  className='cursor-pointer'
                  onClick={() => {
                    const isTypeExist = formValues.some(({ type: valueType }) => valueType === type)
                    if (!isTypeExist) {
                      append({ name, url, type })
                    }
                  }}
                >
                  <Icon isLight={!formValues?.some(({ type: valueType }) => valueType === type)} />
                </div>
              )
            })}
          </div>
          <div className=''>
            <Input
              inputLabel='Profile Name'
              name={`preview.profileName`}
              placeholder={'Profile Name'}
            />
          </div>
          <Input
            inputLabel='Summary'
            type='textarea'
            name={`preview.summary`}
            placeholder={'Summary'}
          />
          <div className='t-w-[93%] t-flex t-flex-col t-gap-3'>
            <h2 className='t-font-medium'> Social Links</h2>
          </div>
          <div className="t-flex-column t-gap-5">
            <div className="t-grid t-grid-cols-1 sm:t-grid-cols-2 t-gap-4">
              {fields.map(({ placeHolder, name }, index) => {
                return (
                  <div
                    className='t-relative t-bg-[#fafafa] t-p-3'
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div
                      key={index}
                      className=' t-flex-column t-items-center t-rounded-md t-gap-3 t-w-[93%]'
                    >
                      <div className='t-relative t-w-full t-flex t-items-center'>
                        <Input
                          width='t-w-full'
                          name={`links.${index}.name`}
                          placeholder='/Handle Name'
                          index={index}
                        />
                        <img
                          className='t-cursor-pointer t-absolute t--right-5  md:t--right-9 '
                          src={GRAPHICS.DRAG}
                          style={{
                            cursor: 'grab',
                          }}
                          width={18}
                          height={20}
                          alt='input-delete'
                        />
                      </div>

                      <div className='t-relative t-w-full t-flex t-items-center'>
                        <InputWithIcon
                          name={`links.${index}.url`}
                          width='t-w-full'
                          index={index}
                          type={name}
                          placeholder={placeHolder}
                        />
                        {fields.length > 1 && (
                          <img
                            className='t-cursor-pointer t-absolute t--right-5  md:t--right-9 '
                            src={GRAPHICS.BIN}
                            width={18}
                            height={20}
                            alt='input-delete'
                            onClick={() => {
                              remove(index)
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Social
