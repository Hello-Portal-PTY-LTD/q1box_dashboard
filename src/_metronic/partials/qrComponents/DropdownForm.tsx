import React, {useRef, useState} from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {KTSVG} from '../../helpers'

interface ListItem {
  name: string
  value: string
}

interface Props {
  name: string
  title: string
  label?: string
  listItems: ListItem[]
  value?: string
  disable?: boolean
  selectOption?: (name: string, value: string) => void
}

const DropdownForm: React.FC<Props> = ({
  name,
  title,
  label,
  listItems,
  value: defaultValue,
  selectOption,
  disable,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue ? defaultValue : title)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    if (!disable) {
      setIsOpen(!isOpen)
    }
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const listClass = `t-cursor-pointer  t-text-[13px] md:t-text-[16px] t-text-black t-px-8 t-py-1.5 t-rounded-[3px] hover:t-bg-gray-100`

  const handleOptionSelect = (selectedName: string, selectedValue: string) => {
    setValue(selectedName)
    selectOption && selectOption(name, selectedValue) // Pass the name property to selectOption
    setIsOpen(false)
  }

  return (
    <div className=' t-w-full t-z-10 t-h-full'>
      <div className='t-relative  flex-column t-gap-2 ' ref={dropDownRef}>
        {label && (
          <p className='t-block t-text-sm lg:t-text-base t-mb-2 t-font-medium t-text-gray-90'>
            {label}
          </p>
        )}
        <button
          type='button'
          name='drop-down'
          className={`${
            disable && 't-text-gray-500'
          }t-h-[50px] md:t-h-[51px]  t-w-full t-text-[13px] md:t-text-[16px] t-text-gray t-border t-border-gray-300 t-gap-6 t-px-4 t-py-3 t-rounded-[12px] t-flex t-items-center t-whitespace-nowrap t-justify-between t-bg-[#F8FAFC] focus:t-outline-none focus:t-ring-2 focus:t-ring-secondary focus:t-border-transparent `}
          onClick={toggleDropdown}
        >
          <span>{value}</span>
          <KTSVG path='/media/svg/qr_dashboard/chevron_down.svg' className=' svg-icon-5' />
        </button>
        {isOpen && listItems.length > 0 && (
          <ul className='t-absolute t-bg-white t-max-h-[110px] t-overflow-auto  t-z-10 t-flex-column t-w-full t-py-1  md:t-top-[60px] t-left-0  t-border t-border-greyp t-rounded-xl'>
            {listItems.map(({name: itemName, value: itemValue}, index) => {
              return (
                <li
                  onClick={() => handleOptionSelect(itemName, itemValue)} // Use the modified function
                  className={listClass}
                  key={index}
                >
                  {itemName}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default DropdownForm
