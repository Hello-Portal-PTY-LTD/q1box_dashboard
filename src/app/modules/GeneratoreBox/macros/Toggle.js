import React from 'react'

function Toggle({name}) {
  const token = localStorage.getItem('token')

  const handleToggle = (event) => {
    if (!token) {
      {
        return
      }
    } else {
      // if (name) {
      //   setValue(name, value);
      // } else {
      //   setValue("updateAndTrack", value);
      // }
    }
  }

  return (
    <div>
      <label className='switch t-scale-75'>
        <input type='checkbox' disabled={!token} onChange={handleToggle} />
        <span className='slider round'></span>
      </label>
    </div>
  )
}

export default Toggle
