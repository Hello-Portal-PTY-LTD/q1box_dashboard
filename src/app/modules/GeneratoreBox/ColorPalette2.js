import React, {useEffect, useState} from 'react'
import {UseSelectToggle, UseDisable} from './utils/functions'
import {GRAPHICS} from './graphics'

const ColorPallete2 = ({pallete, palleteClass, onChange, type, crossIcon = true}) => {
  const [colorPallets, setColorPallets] = useState(pallete)

  useEffect(() => {
    if (type !== 'qr') {
      UseSelectToggle(setColorPallets, 1, 'isSelected')
    }
    // eslint-disable-next-line
  }, [])

  const handlePalleteChange = (id, index) => {
    UseSelectToggle(setColorPallets, id, 'isSelected')
    let selectedPallets = pallete[index].palette

    if (type === 'qr') {
      onChange(selectedPallets)
    } else if (type === 'Menu') {
      selectedPallets = {
        borderColor: selectedPallets[0].color,
        textColor: selectedPallets[1].color,
      }
      onChange(selectedPallets)
    } else {
      selectedPallets = {
        textColor: selectedPallets[0].color,
        iconsColor: selectedPallets[1].color,
      }
      onChange(selectedPallets)
    }
  }
  const handleRemove = (index) => {
    UseDisable(setColorPallets, index, 'isSelected')
  }

  return (
    <div className='t-flex-column t-gap-5 t-mt-1 t-lg-mt-2'>
      <p className='t-text-base t-text-t1 t-font-medium'>Color Palette*</p>
      <div className={palleteClass}>
        {colorPallets.map(({palette, isSelected, id}, index) => (
          <div className='t-relative' key={index}>
            {crossIcon && isSelected && (
              <img
                src={GRAPHICS.CROSS}
                width={20}
                height={20}
                alt='check_arrow'
                className='t-absolute -t-right-2 t-cursor-pointer -t-top-[10px] t-z-10'
                onClick={() => handleRemove(id)}
              />
            )}
            <div
              onClick={() => handlePalleteChange(id, index)}
              className={`${
                isSelected
                  ? 't-rounded-[5px]  t-border t-border-primary'
                  : 't-rounded-[5px] t-border t-border-gray-200'
              }  t-row-flex t-p-1 t-justify-center t-cursor-pointer t-items-center t-gap-[10px]`}
            >
              {palette.map(({color}, idx) => (
                <div
                  key={idx}
                  className='t-cursor-pointer t-rounded-full t-border t-shadow-thin t-h-[25px] t-w-[25px] '
                  style={{backgroundColor: color}}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorPallete2
