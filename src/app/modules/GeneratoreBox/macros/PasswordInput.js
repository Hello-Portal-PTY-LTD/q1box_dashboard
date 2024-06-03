import React, {useState} from 'react'
import {Controller} from 'react-hook-form'

const PasswordInput = ({inputLabel, placeholder, name, control, errors}) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const eyeIcon = 't-absolute t-right-3 t-h-6 t-w-6 t-text-gray-500 t-cursor-pointer'

  const hasError = errors[name] !== undefined
  return (
    <div className='t-flex t-flex-col t-gap-2'>
      {inputLabel && <span className='t-input-label'>{inputLabel}</span>}
      <div className='t-relative t-flex t-items-center'>
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              className='t-input'
              {...field}
            />
          )}
        />
        {showPassword ? (
          <img
            src='/graphics/svgs/Authentication/eyeOff.svg'
            width={100}
            height={100}
            className={eyeIcon}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <img
            src='/graphics/svgs/Authentication/eye.svg'
            width={100}
            height={100}
            className={eyeIcon}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {hasError && <span className='t-text-primary t-text-xs'>{errors[name].message}</span>}
    </div>
  )
}

export default PasswordInput
