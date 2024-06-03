import React from 'react'

const Linkedin = ({light}) => {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='0.330811'
        y='0.330811'
        width='39.3384'
        height='39.3384'
        rx='19.6692'
        stroke='url(#paint0_linear_953_77107)'
        stroke-width='0.661622'
      />
      <path
        d='M13.4764 11.3711C13.4761 11.9996 13.24 12.6022 12.82 13.0465C12.4001 13.4907 11.8307 13.7401 11.2371 13.7397C10.6435 13.7394 10.0743 13.4894 9.65476 13.0448C9.23523 12.6001 8.9997 11.9972 9 11.3687C9.0003 10.7402 9.23639 10.1375 9.65634 9.69328C10.0763 9.24907 10.6457 8.99969 11.2393 9C11.8329 9.00031 12.4021 9.2503 12.8216 9.69496C13.2412 10.1396 13.4767 10.7425 13.4764 11.3711ZM13.5435 15.4946H9.06715V30.33H13.5435V15.4946ZM20.6162 15.4946H16.1622V30.33H20.5715V22.545C20.5715 18.2081 25.9096 17.8052 25.9096 22.545V30.33H30.33V20.9335C30.33 13.6224 22.4292 13.895 20.5715 17.4853L20.6162 15.4946Z'
        fill='url(#paint1_linear_953_77107)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_953_77107'
          x1='20'
          y1='0'
          x2='20'
          y2='40'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color={light ? '#CBD5E1' : '#3A57EC'} />
          <stop offset='1' stop-color={light ? '#CBD5E1' : '#7F6AFF'} />
        </linearGradient>
        <linearGradient
          id='paint1_linear_953_77107'
          x1='19.665'
          y1='9'
          x2='19.665'
          y2='30.33'
          gradientUnits='userSpaceOnUse'
        >
          <stop stop-color={light ? '#CBD5E1' : '#3A57EC'} />
          <stop offset='1' stop-color={light ? '#CBD5E1' : '#7F6AFF'} />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Linkedin
