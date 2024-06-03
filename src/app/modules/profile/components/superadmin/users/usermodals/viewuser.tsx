import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import React from 'react'
import {Modal} from 'react-bootstrap'
import {roleFormat} from 'utils/functions'
type Props = {
  show: boolean
  handleClose: () => void
  user: {
    firstName: string
    lastName: string
    id: string
    role: string
    email: string
    picture: string
  }
}

const ViewUserModal: React.FC<Props> = ({show, user, handleClose}) => {
  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={show}
      scrollable
      dialogClassName='modal-md'
      aria-hidden='true'
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>User Details</h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <div className='t-items-center t-bg-[white] t-py-10 t-relative'>
            <div className='t-flex t-flex-col t-items-center t-mb-3'>
              <img
                alt='img'
                src={user?.picture || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                height={70}
                width={70}
                className='t-rounded-full'
              />{' '}
              <h3 className='t-text-xl t-mt-2 t-text-[green]'>{roleFormat(user.role)}</h3>
              {/* <h3 className='t-text-xl t-mt-2 '>{user.id}</h3> */}
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <img
                alt='img'
                src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <p className='t-text-lg  t-mt-2 t-underline t-cursor-pointer'>{user.email}</p>
            </div>
            <hr className='t-mx-5' />

            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <p>{user.firstName + ' ' + user.lastName}</p>

              {/* <h2 className='t-text-lg  t-mt-2'>31232323213</h2> */}
            </div>
            <hr className='t-mx-5' />
            <div className='t-flex t-flex-col t-items-center t-mt-2 t-mb-2'>
              <img
                alt='img'
                src={toAbsoluteUrl('/media/icons/duotune/communication/com001.svg')}
                height={20}
                width={20}
                className='t-text-[green]'
              />
              <h2 className='t-text-lg  t-mt-2'>Islamabad Pakistan</h2>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export {ViewUserModal}
