import {useOnClickOutside} from 'hooks/useOnClickOutside'
import React, {useRef, useState} from 'react'
import {useFormContext, useWatch} from 'react-hook-form'
import {GRAPHICS} from '../graphics'

const listClass = `t-cursor-pointer t-text-left t-pl-4 t-text-t1 t-py-1 t-rounded-[3px] t-hover:text-primary t-hover:font-semibold`

const DropDown = ({title, label, listItems, name}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const {control} = useFormContext()
  const {couponTime} = useWatch(control, {
    name: 'couponTime',
  })
  const {setValue} = useFormContext()
  const dropDownRef = useRef()
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (value) => {
    setValue(name, value)
    setSelected(value)
    setIsOpen(false)
  }

  return (
    <div className='t-relative t-width t-flex-column t-gap-2' ref={dropDownRef}>
      {label && (
        <p className='t-block t-text-sm t-lg:text-base t-mb-2 t-font-medium t-text-gray-90'>
          {label}
        </p>
      )}
      <button
        name='drop-down'
        className='t-bg-light t-text-t1 t-gap-6 t-px-4 t-w-full t-py-4 t-rounded-xl t-flex t-items-center t-whitespace-nowrap t-justify-between t-border t-border-grey'
        onClick={toggleDropdown}
        type='button'
      >
        <span>
          {name === 'couponTime.hours'
            ? couponTime?.hours
            : name === 'couponTime.minutes'
            ? couponTime?.minutes
            : name === 'couponTime.seconds'
            ? couponTime?.seconds
            : title}
        </span>
        <img src={GRAPHICS.ARROW_DOWN} width={15} alt='arrowdown' height={9} />
      </button>
      {isOpen && listItems.length > 0 && (
        <ul className='t-absolute t-z-50 t-max-h-[150px] t-overflow-auto flex-column t-w-full t-py-1 t-top-[65px] t-left-0 t-bg-light t-border t-border-grey t-rounded-xl'>
          {listItems.map(({label}, index) => {
            return (
              <li
                key={index * Math.random()}
                onClick={() => handleSelect(label)}
                className={`${listClass}`}
                style={{
                  color: `${selected === label ? '#5E61F6' : ''} `,
                  fontWeight: `${selected === label ? 600 : ''} `,
                }}
              >
                {label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropDown
