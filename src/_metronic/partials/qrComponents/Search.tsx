import React, {FC, useEffect, useState} from 'react'
import {KTSVG} from '../../helpers'
import './Style/style.css'
interface ButtonProps {
  Name?: string
  Icon?: string
  className?: string
  placeholder?: string
  onChange?: any
  filterClear?: any
}

const Search: FC<ButtonProps> = ({
  Name,
  Icon,
  className,
  placeholder = 'Search',
  onChange,
  filterClear,
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setSearchTerm('')
  }, [filterClear])

  return (
    <form className='t-flex t-items-center t-w-full t-min-w-[150px]'>
      <label className='sr-only'>Search</label>
      <div className='t-relative t-w-full'>
        <div className='t-absolute t-inset-y-0 t-left-0 t-flex t-items-center t-pl-5 pointer-events-none'>
          <KTSVG path='/media/svg/qr_dashboard/search.svg' className=' svg-icon-5' />
        </div>
        <input
          type='text'
          id='simple-search'
          className='t-bg-white placeholder-grey t-shadow-md t-border t-border-[#e5e7eb] t-text-gray-900 t-text-[16px] t-rounded-full t-h-[50px] focus:t-ring-blue-500 focus:t-border-blue-500 t-block t-w-full t-pl-12 t-py-3 t-px-8'
          placeholder={placeholder}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            onChange && onChange(e.target.value)
          }}
          value={searchTerm}
        />
      </div>
    </form>
  )
}

export default Search
