import React, {useState, forwardRef, Ref} from 'react'

type InputProps = {
  placeholder?: string
  name?: string
  onChange?: any
  onBlur?: any
  classNames?: string
  value?: any
  width?: string
  type?: string
  bg?: string
  label?: string
  max?: number
  isDisabled?: boolean
}

const EyeOff = () => (
  <svg width='22' height='19' viewBox='0 0 22 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.83 6L14 9.16V9C14 8.20435 13.6839 7.44129 13.1213 6.87868C12.5587 6.31607 11.7956 6 11 6H10.83ZM6.53 6.8L8.08 8.35C8.03 8.56 8 8.77 8 9C8 9.79565 8.31607 10.5587 8.87868 11.1213C9.44129 11.6839 10.2044 12 11 12C11.22 12 11.44 11.97 11.65 11.92L13.2 13.47C12.53 13.8 11.79 14 11 14C9.67392 14 8.40215 13.4732 7.46447 12.5355C6.52678 11.5979 6 10.3261 6 9C6 8.21 6.2 7.47 6.53 6.8ZM1 1.27L3.28 3.55L3.73 4C2.08 5.3 0.78 7 0 9C1.73 13.39 6 16.5 11 16.5C12.55 16.5 14.03 16.2 15.38 15.66L15.81 16.08L18.73 19L20 17.73L2.27 0M11 4C12.3261 4 13.5979 4.52678 14.5355 5.46447C15.4732 6.40215 16 7.67392 16 9C16 9.64 15.87 10.26 15.64 10.82L18.57 13.75C20.07 12.5 21.27 10.86 22 9C20.27 4.61 16 1.5 11 1.5C9.6 1.5 8.26 1.75 7 2.2L9.17 4.35C9.74 4.13 10.35 4 11 4Z'
      fill='#9D9DA6'
    />
  </svg>
)

const EyeOn = () => (
  <svg width='22' height='15' viewBox='0 0 22 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 12.5C8.24 12.5 6 10.26 6 7.5C6 4.74 8.24 2.5 11 2.5C13.76 2.5 16 4.74 16 7.5C16 10.26 13.76 12.5 11 12.5ZM11 4.5C9.34 4.5 8 5.84 8 7.5C8 9.16 9.34 10.5 11 10.5C12.66 10.5 14 9.16 14 7.5C14 5.84 12.66 4.5 11 4.5Z'
      fill='#9D9DA6'
    />
  </svg>
)

const eyeIcon = 't-absolute t-top-12 t-right-4 t-h-6 t-w-6 t-text-gray-500 t-cursor-pointer'
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      name,
      max,
      onChange,
      onBlur,
      value,
      width,
      type = 'text',
      isDisabled,
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
      setPasswordVisible((prev) => !prev)
    }

    return (
      <div className={`${width ? width : 't-w-full'} t-relative t-h-[50px]`}>
        {type === 'password' && <label className='t-text-lg t-font-semibold'>{label}</label>}
        <input
          disabled={isDisabled}
          name={name}
          type={passwordVisible ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          max={type === 'number' ? max : ''}
          className='t-border t-placeholder-gray t-h-full t-pl-4 t-border-gray-300 t-rounded-[12px] t-bg-[#F8FAFC] focus:t-outline-none focus:t-ring-2 focus:t-ring-secondary focus:t-border-transparent t-text-gray-700 t-text-[13px] md:t-text-[16px]  t-block t-w-full'
        />

        {type === 'password' && (
          <span className={eyeIcon} onClick={togglePasswordVisibility}>
            {passwordVisible ? <EyeOn /> : <EyeOff />}
          </span>
        )}
      </div>
    )
  }
)

export default Input
