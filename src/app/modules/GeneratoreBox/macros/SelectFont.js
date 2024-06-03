import {useOnClickOutside} from 'hooks/useOnClickOutside'
import React, {useEffect, useRef, useState} from 'react'
import {useFormContext, useWatch} from 'react-hook-form'
import {GRAPHICS} from '../graphics'

// List of font options
const fontOptions = [
  {label: 'Default', value: 'Sans-serif'},
  {label: 'Monospace', value: 'monospace'},
  {label: 'Cursive', value: 'cursive'},
  {label: 'Arimo', value: 'Arimo, sans-serif'},
  {label: 'EB Garamond', value: 'EB Garamond, serif'},
  {label: 'Georgia', value: 'Georgia, serif'},
  {label: 'Merriweather Sans', value: 'Merriweather Sans, sans-serif'},
  {label: 'Inconsolata', value: 'Inconsolata, monospace'},
]

const FontDropdown = () => {
  const [selectedFont, setSelectedFont] = useState({
    label: 'Default',
    value: 'Sans-serif',
  })
  const font = useWatch({name: 'preview'})
  const {setValue} = useFormContext()
  const handleFontChange = (fonts) => {
    console.log(fonts)
    setSelectedFont(fonts)
    setValue('preview.fontFamily', fonts?.value)
    setIsOpen(false)
  }

  const [isOpen, setIsOpen] = useState(false)

  const dropDownRef = useRef()
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const found = fontOptions.find((option) => option.value === font?.fontFamily)

    if (found) {
      setSelectedFont({label: found?.label, value: found?.value})
    }
  }, [font])
  return (
    <div className='t-relative  t-flex-column t-gap-2' ref={dropDownRef}>
      <p className='text-base text-t1 font-medium'>Select Font</p>

      <button
        name='drop-down'
        className='t-bg-light t-text-t1 t-gap-6 t-px-4 t-w-[50%] t-py-5 t-rounded-xl t-flex t-items-center t-whitespace-nowrap t-justify-between t-border t-border-grey'
        onClick={toggleDropdown}
        type='button'
      >
        <span>{selectedFont.label}</span>
        <img src={GRAPHICS.ARROW_DOWN} width={15} alt='arrowdown' height={9} />
      </button>
      {isOpen && fontOptions.length > 0 && (
        <ul className='t-absolute t-z-50 t-max-h-[150px] t-mt-[10px] t-overflow-auto t-flex-column t-w-[50%] t-py-1 t-top-[65px] t-left-0 t-bg-light t-border t-border-grey t-rounded-xl'>
          {fontOptions.map((fonts, index) => {
            return (
              <li
                className='t-cursor-pointer t-text-left t-pl-4 t-text-t1 t-py-1 t-rounded-[3px] hover:t-text-primary hover:t-font-semibold'
                key={index * Math.random()}
                onClick={() => handleFontChange(fonts)}
                style={{
                  color: `${selectedFont.label === fonts.label ? '#5E61F6' : ''} `,
                  fontWeight: `${selectedFont.label === fonts.label ? 600 : ''} `,
                }}
              >
                {fonts.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FontDropdown

//  <div className="flex flex-col w-[50%] ">
//       <label
//         htmlFor="fontDropdown "
//         className="text-base text-t1 font-medium mb-3"
//       >
//         Select Font:
//       </label>
//       <select
//         className="border-blue-500 rounded-lg"
//         id="fontDropdown"
//         onChange={handleFontChange}
//         value={selectedFont}
//       >
//         {fontOptions.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
