import React from 'react'

function CheckBox({inputLabel, placeholder, onChange, classNames, defaultvalue}) {
  return (
    <div className='t-flex t-items-center t-gap-2'>
      {defaultvalue ? (
        <input
          onChange={onChange}
          type='checkbox'
          checked
          className={`t-w-5 t-h-5 t-rounded-[5px] t-border t-border-grey-500`}
        />
      ) : (
        <input
          onChange={onChange}
          type='checkbox'
          className={`t-w-5 t-h-5 t-rounded-[5px] t-border t-border-grey-500`}
        />
      )}
      <label
        className={`t-text-sm t-antialiased t-text-t1 t-font-medium t-text-gray-90 ${classNames}`}
      >
        {inputLabel}
      </label>
    </div>
  )
}

export default CheckBox
