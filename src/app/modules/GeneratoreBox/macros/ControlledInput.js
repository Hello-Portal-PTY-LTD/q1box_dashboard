import React from 'react'
import Input from './Input'
import Textarea from './TextArea'
import {Controller} from 'react-hook-form'

function ControlledInput({
  name,
  control,
  defaultValue,
  render,
  error,
  type = 'input',
  inputLabel,
  placeholder,
}) {
  return (
    <>
      {type === 'textarea' ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({field}) => (
            <Textarea
              inputLabel={inputLabel}
              placeholder={placeholder}
              width='t-w-full'
              {...field}
              error={error?.message}
            />
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({field}) => (
            <Input
              inputLabel={inputLabel}
              placeholder={placeholder}
              t-width='t-w-full'
              {...field}
              error={error?.message}
            />
          )}
        />
      )}
    </>
  )
}

export default ControlledInput
