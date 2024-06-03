import React from 'react'
import {useFormContext} from 'react-hook-form'

const Textarea = (props) => {
  const {inputLabel, name, placeholder, className, bg, inputClass, maxLength} = props

  const {
    register,
    formState: {errors},
  } = useFormContext()
  const hasError = errors[name] !== undefined
  return (
    <div className={`t-w-full ${className}`}>
      {inputLabel && (
        <label className='t-block t-mb-2 t-font-medium t-text-gray-90'>{inputLabel}</label>
      )}
      <div className='t-relative'>
        <textarea
          className={`${
            bg === 't-light' ? '#ffffff' : 't-bg-light'
          } t-block t-w-full t-h-20 t-py-2 t-pl-4 t-px-3  t-placeholder-gray t-border t-border-gray-300 t-rounded-[12px] focus:t-outline-none focus:t-ring-2 focus:t-ring-secondary focus:t-border-transparent ${inputClass}`}
          placeholder={placeholder}
          name={name}
          {...(name ? register(name) : {})}
          maxLength={maxLength}
        />
        {hasError && <span className='t-text-primary t-text-xs'>{errors[name].message}</span>}
      </div>
    </div>
  )
}

export default Textarea
