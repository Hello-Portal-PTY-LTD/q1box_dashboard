import React from 'react'
import {useFormContext} from 'react-hook-form'

function InputGradient({label, placeholder, name, maxLength}) {
  const {
    register,
    formState: {errors},
  } = useFormContext()
  const hasError = errors[name] !== undefined
  return (
    <span className='center-input t-w-full'>
      <p className='t-block t-text-sm lg:t-text-[13.3px] t-mb-2.5 t-text-t1 t-antialiased'>
        {label}
      </p>
      <input
        maxLength={maxLength}
        className='gradient-border  t-text-primary py-3 t-w-full t-rounded-[9px] t-font-semibold t-placeholder:text-gray-500'
        placeholder={placeholder}
        {...(name ? register(name) : {})}
      />
      {hasError && <span className='t-text-[red] t-text-xs'>{errors[name].message}</span>}
    </span>
  )
}

export default InputGradient
