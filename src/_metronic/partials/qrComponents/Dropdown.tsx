import React, {useRef, useState} from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {KTSVG} from '../../helpers'

interface ListItem {
  label: string
  value: string
}

interface Props {
  title: string
  label?: string
  listItems: ListItem[]
  fontsize?: string
  primary?: boolean
  onSelect?: (param: string) => void
}

const Dropdown: React.FC<Props> = ({
  title,
  label,
  listItems,
  fontsize,
  primary = false,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')

  const dropDownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const listClass = `t-cursor-pointer t-text-[16px] t-text-t1 t-px-8 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap`

  const selectionChange = (item: ListItem) => {
    if (onSelect) onSelect(item.value)
    setValue(item.label)
    setIsOpen(false)
  }
  return (
    <div className=' t-w-full'>
      <div className='t-relative  flex-column t-gap-2 ' ref={dropDownRef}>
        <button
          name='drop-down'
          className={` t-w-full ${
            primary
              ? 't-bg-primary t-text-white'
              : 't-bg-white t-text-t1 t-text-[16px] t-shadow-md t-border t-h-[50px]'
          }   t-gap-6 t-px-7  t-py-4 t-rounded-full t-flex t-items-center t-whitespace-nowrap t-justify-between `}
          onClick={toggleDropdown}
        >
          <span>{value ? value : title}</span>
          {primary ? (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down_white.svg' className=' svg-icon-5' />
          ) : (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down.svg' className=' svg-icon-5' />
          )}
        </button>
        {isOpen && listItems.length > 0 && (
          <ul className='t-absolute t-z-[9999999] flex-column t-w-full t-py-1 t-top-[55px] t-left-0 t-bg-white t-border t-border-greyp t-rounded-xl'>
            {listItems.map((item, index) => {
              return (
                <li key={index} onClick={() => selectionChange(item)} className={listClass}>
                  {item.label}
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {isOpen ? (
        <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)]'></div>
      ) : (
        ''
      )}
    </div>
  )
}

export default Dropdown
