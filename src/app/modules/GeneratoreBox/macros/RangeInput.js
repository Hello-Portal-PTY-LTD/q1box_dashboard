import React, {useState, useEffect} from 'react'
import {useFormContext, useWatch} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {setLogoSize} from 'store/barCode/barCodeSlice'

function RangeInput({label, name, onReset, onChange}) {
  const barCode = useSelector((state) => state.barCode)
  const [range, setRange] = useState(barCode.logoSize || 0.4)
  const {setValue} = useFormContext()
  const currentValue = useWatch({name: 'logoSize'})
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValue(name, Number(e.target.value))
    dispatch(setLogoSize(e.target.value))
    setRange(e.target.value)
    onChange && onChange(e)
  }

  useEffect(() => {
    if (currentValue) {
      setRange(currentValue)
    }
  }, [currentValue])

  return (
    <>
      <label
        htmlFor='steps-range'
        className='t-block t-mb-2 t-breif t-font-semibold t-1320:text-base t-text-gray-900'
      >
        {label}
      </label>
      <div className='t-flex t-items-center t-gap-5'>
        <input
          id='steps-range'
          type='range'
          min='0.2'
          max='0.7'
          onChange={handleChange}
          value={range}
          step='0.1'
          className='t-w-full t-h-2 t-rounded-lg t-appearance-none t-cursor-pointer 
        t-bg-secondary t-opacity-2'
        />
        <p
          onClick={onReset}
          className='t-breif t-text-primary t-font-[400] t-antialiased t-cursor-pointer'
        >
          Reset
        </p>
      </div>
    </>
  )
}

export default RangeInput
