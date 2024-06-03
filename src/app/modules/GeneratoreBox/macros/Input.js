import React from 'react'
import PremiumText from './PremiumText'
import {useFormContext} from 'react-hook-form'

const Input = (props) => {
  const {
    register,
    formState: {errors},
  } = useFormContext()

  const {
    inputLabel,
    placeholder,
    name,
    classNames,
    width,
    type = 'text',
    bg,
    maxLength,
    premium = false,
    required,
  } = props

  function getPropertyFromError(path, value) {
    const properties = path.split('.') // Split the path by '.'
    for (let property of properties) {
      if (property.includes('[') && property.includes(']')) {
        // Handle array index
        const arrayProp = property.slice(0, property.indexOf('['))
        const index = Number(property.slice(property.indexOf('[') + 1, property.indexOf(']')))
        if (
          !value[arrayProp] ||
          !Array.isArray(value[arrayProp]) ||
          index >= value[arrayProp].length
        ) {
          return undefined
        }
        value = value[arrayProp][index]
      } else {
        // Handle object property
        if (!value || typeof value !== 'object' || !(property in value)) {
          return undefined
        }
        value = value[property]
      }

      if (value === undefined) {
        return undefined
      }
    }

    return value
  }

  return (
    <div className={`t-w-full ${width}`}>
      {premium && inputLabel ? (
        <div className='t-input-label'>
          <PremiumText text={inputLabel} />
        </div>
      ) : inputLabel && !required ? (
        <span className='t-input-label'>{inputLabel}</span>
      ) : (
        inputLabel &&
        required && (
          <div className='t-input-label t-flex'>
            {inputLabel} <p className='t-text-[red]'>*</p>
          </div>
        )
      )}
      <div className='relative'>
        {type === 'textarea' ? (
          <textarea
            style={{height: '80px'}}
            rows={12}
            type={type}
            name={name}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${(classNames, bg === 'light' ? '#ffffff' : 't-bg-light', 't-input')}`}
            {...(name ? register(name) : {})}
          />
        ) : (
          <input
            type={type}
            name={name}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${(classNames, bg === 'light' ? '#ffffff' : 't-bg-light', 't-input')}`}
            {...(name ? register(name) : {})}
          />
        )}
        {true && (
          <span className='t-text-primary t-text-xs'>
            {getPropertyFromError(name, errors)?.message}
          </span>
        )}
      </div>
    </div>
  )
}
export default Input
