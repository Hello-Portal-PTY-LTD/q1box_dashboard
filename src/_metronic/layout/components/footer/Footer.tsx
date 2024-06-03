/* eslint-disable react/jsx-no-target-blank */
import {useEffect} from 'react'
import {ILayout, useLayout} from '../../core'

const Footer = () => {
  const {config} = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])
  return (
    <>
      <div className='text-dark order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        <a
          href={process.env.REACT_APP_QR_APP}
          target='_blank'
          className='text-gray-800 text-hover-primary'
        >
          Q1 Box
        </a>
      </div>

      <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
        <li className='menu-item'>
          <a
            href={`${process.env.REACT_APP_QR_APP}help/faq`}
            target='_blank'
            className='menu-link px-2'
          >
            FAQ
          </a>
        </li>

        <li className='menu-item'>
          <a
            href={`${process.env.REACT_APP_QR_APP}help/support`}
            target='_blank'
            className='menu-link px-2'
          >
            Support
          </a>
        </li>

        <li className='menu-item'>
          <a
            href={`${process.env.REACT_APP_QR_APP}pricing`}
            target='_blank'
            className='menu-link px-2'
          >
            Pricing
          </a>
        </li>
      </ul>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export {Footer}
