import './Style/style.css'
import React from 'react'

interface Props {
  isCheckedAll: boolean
  handleCheckAll: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<Props> = ({isCheckedAll, handleCheckAll}) => {
  return (
    <div className='t-flex t-items-center'>
      <label className='container'>
        <input type='checkbox' checked={isCheckedAll} onChange={handleCheckAll} id='check-all' />
        <span className='checkmark'></span>
      </label>
    </div>
  )
}

export default Checkbox
