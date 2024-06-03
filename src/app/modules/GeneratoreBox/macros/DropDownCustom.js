import {useOnClickOutside} from 'hooks/useOnClickOutside'
import React, {useRef, useState} from 'react'
import {GRAPHICS} from '../graphics'

const listClass = `t-cursor-pointer t-text-left t-pl-4 t-text-t1 t-py-1 t-rounded-[3px] t-hover:text-primary t-hover:font-semibold`

const DropDownCustomPlan = ({title, listItems, onChange}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const dropDownRef = useRef()
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='t-relative t-width t-flex-column t-gap-2' ref={dropDownRef}>
      <button
        name='drop-down'
        className='t-bg-light t-text-t1 t-gap-6 t-px-4 t-w-full t-py-4 t-rounded-xl t-flex t-items-center t-whitespace-nowrap t-justify-between t-border t-border-grey'
        onClick={toggleDropdown}
        type='button'
      >
        <span>{selected ? selected : title}</span>
        <img src={GRAPHICS.ARROW_DOWN} width={15} alt='arrowdown' height={9} />
      </button>
      {isOpen && listItems.length > 0 && (
        <ul className='t-absolute t-z-50 t-max-h-[150px] t-overflow-auto flex-column t-w-full t-py-1 t-top-[51px] t-left-0 t-bg-light t-border t-border-grey t-rounded-xl'>
          {listItems.map((list, index) => {
            return (
              <li
                key={index * Math.random()}
                onClick={() => {
                  setSelected(list.label)
                  setIsOpen(false)
                  onChange(list)
                }}
                className={`${listClass}`}
                style={{
                  color: `${selected === list.label ? '#5E61F6' : ''} `,
                  fontWeight: `${selected === list.label ? 600 : ''} `,
                }}
              >
                {list.label}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropDownCustomPlan
