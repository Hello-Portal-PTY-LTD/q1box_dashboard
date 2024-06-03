import React, {FC} from 'react'
import {KTSVG} from '../../helpers'
import './Style/style.css'
import {LoadingOutlined} from '@ant-design/icons'
import {Spin} from 'antd'
interface ButtonProps {
  Name: string
  Icon?: string
  className?: string
  primary?: boolean
  iconsize?: string
  click?: any
  loading?: boolean
}

const Button: FC<ButtonProps> = ({Name, Icon, className, primary, iconsize, loading, click}) => {
  const antIcon = (
    <LoadingOutlined
      rev={undefined}
      style={{
        fontSize: 24,
      }}
      spin
    />
  )
  return (
    <button
      onClick={click}
      className={`${className ? className : ''} t-whitespace-nowrap  t-cursor-pointer t-border ${
        primary
          ? 't-border-primaryblue t-text-white t-bg-primaryblue'
          : 't-border-primaryblue t-text-primaryblue hover:t-bg-[#EDEFF3]'
      }  t-rounded-full  t-flex t-flex-row t-justify-center t-items-center t-gap-3 t-py-3 t-px-4 t-font-medium `}
    >
      {loading && <Spin style={{color: '#ffff'}} indicator={antIcon} />}
      <div className='von'>
        {Icon ? (
          <KTSVG path={Icon} className={`${iconsize ? iconsize : 'svg-icon-3'}`} svgClassName='' />
        ) : (
          ''
        )}
      </div>
      <span>{Name}</span>
    </button>
  )
}

export default Button
