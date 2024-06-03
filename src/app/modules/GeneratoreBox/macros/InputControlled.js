import {useFormContext, Controller} from 'react-hook-form'

const InputControlled = ({
  inputLabel,
  placeholder,
  name,
  classNames,
  width,
  type = 'text',
  bg,
  maxLength,
  control,
  errors,
  premium = false,
}) => {
  const hasError = errors[name] !== undefined

  return (
    <div className={`t-w-full ${width}`}>
      {premium && inputLabel ? (
        <div className='input-label'>
          <PremiumText text={inputLabel} />
        </div>
      ) : inputLabel ? (
        <span className='input-label'>{inputLabel}</span>
      ) : null}
      <div className='t-relative t-flex t-flex-col t-gap-2'>
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <input
              type={type}
              maxLength={maxLength}
              placeholder={placeholder}
              className={`${(classNames, bg === 'light' ? '#ffffff' : 't-bg-light', 'input')}`}
              {...field}
            />
          )}
        />
        {hasError && <span className='t-text-primary t-text-xs'>{errors[name].message}</span>}
      </div>
    </div>
  )
}

export default InputControlled
