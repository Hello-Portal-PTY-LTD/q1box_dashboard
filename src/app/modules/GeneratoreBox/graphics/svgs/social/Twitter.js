import React from 'react'

const Twitter = ({light}) => {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      {/* Circle background */}
      <rect
        x='0.5'
        y='0.5'
        width='39'
        height='39'
        rx='19.5'
        stroke={light ? '#CBD5E1' : '#3A57EC'}
        strokeWidth='0.661622'
      />
      {/* X icon */}
      <path
        d='M12.1111 12.1111L27.8889 27.8889M12.1111 27.8889L27.8889 12.1111'
        stroke={light ? '#CBD5E1' : '#3A57EC'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Twitter
