import React, {FC} from 'react'
import {KTSVG} from '../../helpers'
import './Style/style.css'
interface ButtonProps {
  Name?: string
  Icon?: string
  className?: string
  placeholder?: string
  height?: string
  onChange?: any
  value?: any
}

const Search2: FC<ButtonProps> = ({placeholder = 'Search', height, onChange, value}) => {
  return (
    <form className='t-flex t-items-center t-w-full'>
      <label className='sr-only'>Search</label>
      <div className='t-relative t-w-full'>
        <div className='t-absolute t-inset-y-0 t-left-0 t-flex t-items-center t-pl-4 pointer-events-none'>
          <KTSVG path='/media/svg/qr_dashboard/searchgrey.svg' className=' svg-icon-2' />
        </div>
        <input
          type='text'
          id='simple-search'
          value={value}
          onChange={onChange && onChange}
          className={`t-bg-white ${
            height ? height : 't-h-[40px]'
          } t-border t-border-[#9D9DA6] t-text-gray-900 t-text-[16px] t-rounded-full  focus:t-ring-blue-500 focus:t-border-blue-500 t-block t-w-full t-pl-[45px]  t-px-8`}
          placeholder={placeholder}
        />
      </div>
    </form>
  )
}

export default Search2
