import React, {useState, useEffect} from 'react'
import {useFormContext} from 'react-hook-form'

//--- default disabled, enabled only where it requireds
function InputColor({inputLabel, classNames, name, onChange, enabled}) {
  const {register, watch} = useFormContext()
  const [watchedValue, setWatchedValue] = useState()

  useEffect(() => {
    //--- first check the watch returning the string if yes so then
    //--- set this to the state other wise set as dummy string value
    const value = watch(name)
    if (typeof value === 'string') {
      setWatchedValue(value)
    } else {
      setWatchedValue('#ffffff')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(name)])

  const onColorChange = (e) => onChange(e.target.value)
  return (
    <div className={`t-flex t-flex-col t-gap-1 ${classNames}`}>
      <span className='t-text-sm t-text-t1'>{inputLabel}</span>
      <div
        className='t-flex t-items-center t-min-h-[30px]
        t-border-[1px] t-px-2
        t-rounded-full gradient-border t-gap-2'
      >
        <input
          type='color'
          // disabled={enabled ? false : true}
          onChange={onColorChange}
          className='input-color antialised'
          {...(name ? register(name) : {})}
        />
        <span className='t-text-sm t-md:text-base'>{watchedValue}</span>
      </div>
    </div>
  )
}

export default InputColor
