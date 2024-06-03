import {KTSVG} from '_metronic/helpers'

import React from 'react'
import {Modal} from 'react-bootstrap'
import {message} from 'antd'
import {Button} from '_metronic/partials/qrComponents'

import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
import {getTeamMembers, updateMember} from 'store/teamStore/teamAction'
type Props = {
  show: boolean
  offset: number
  handleClose: () => void
  user: {
    id: string
  }
}

const DeleteUserModal: React.FC<Props> = ({show, user, handleClose, offset}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDeleteUser = () => {
    dispatch(updateMember({id: user.id, isDeleted: true}))
      .unwrap()
      .then(() => {
        message.success('User deleted successfully')
        dispatch(getTeamMembers({isDeleted: false, offset: offset}))
        handleClose()
      })
  }

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
          <h5 className='modal-title t-text-xl t-font-bold t-text-[red]'>Delete User</h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <div className='t-text-xl'>Are you Sure you Want to Delete this User?</div>
        </div>
        <div className='modal-footer'>
          <Button Name='Confirm' click={handleDeleteUser} primary className='' />
          <Button Name='Cancel' click={handleClose} />
        </div>
      </div>
    </Modal>
  )
}

export {DeleteUserModal}
