import {useEffect, useRef, useState} from 'react'
import {Button, Search2} from '../../../../../_metronic/partials/qrComponents'
import {PERMISSION_LEVEL} from '../../../../../mock'
import TeamTable from './TeamTable'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {images} from '../../../../../assets'
import Input from '../../../../../_metronic/partials/qrComponents/Input'
import DropdownForm from '../../../../../_metronic/partials/qrComponents/DropdownForm'
import {toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {message, Spin} from 'antd'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {
  deleteMember,
  getTeamMembers,
  searchTeamMembers,
  sendInvite,
  updateMember,
} from 'store/teamStore/teamAction'
import {RootState} from 'store'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import {Modal, ModalBody} from 'react-bootstrap'
import {getSubscriptionInfo} from 'store/payment/paymentAction'

export function TeamCollab() {
  const modalRef = useRef(null)
  const [alert, setAlert] = useState(false)
  const [addTeam, setAddTeam] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 0)
  const dispatch = useDispatch()
  const [showNotAllowed, setShowNotAllowed] = useState(false)
  const {loading} = useSelector((state: RootState) => state.team)
  const [canAddUser, setCanAddUser] = useState(true)
  const [currentOffset, setCurrentOffset] = useState(0)
  const [deleteCollab, setDeleteCollab] = useState(false)
  const [deleteCollabId, setDeleteCollabId] = useState(null)

  useOnClickOutside(modalRef, () => {
    setAlert(false)
    setAddTeam(false)
    formik.resetForm()
  })

  useEffect(() => {
    dispatch(getSubscriptionInfo())
      .unwrap()
      .then((res: any) => {
        if (!res.canAddMoreUser) {
          setCanAddUser(false)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required('First Name is required'),
    lastName: Yup.string().trim().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().required('Permission Level is required'),
  })

  const onSubmit = (values: any) => {
    const data = {
      id: formik.values.id,
      role: values.role,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
    }
    if (isUpdated) {
      dispatch(updateMember(data))
        .unwrap()
        .then(() => {
          setIsUpdated(false)
          setAddTeam(false)
        })
        .catch((error: any) => {
          console.log('error updating user Status: ', error)
        })
    } else {
      dispatch(sendInvite(data))
        .unwrap()
        .then(() => {
          setAddTeam(false)
          message.success('Invite Sent Successfully')
        })
        .catch((err: any) => {
          setAddTeam(false)
          message.error(err)
        })
      return
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })
  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(searchTeamMembers(searchTerm))
    } else {
      dispatch(getTeamMembers({isDeleted: false, offset: currentOffset}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleDeletePost = () => {
    if (deleteCollabId) {
      const afterDelete = () => {
        // setDeleteAll(false)
        dispatch(getTeamMembers({type: 'all', offset: 0}))
      }
      updateQrStatus('QR Deleted Successfully', afterDelete)
    }
  }
  const updateQrStatus = (updateMessage: string, handleAfterDelete: any) => {
    dispatch(deleteMember(deleteCollabId))
      .unwrap()
      .then(() => {
        message.success(updateMessage)
        handleAfterDelete && handleAfterDelete()
      })
      .catch((err: any) => console.log(err))
  }
  return (
    <div className='t-relative t-flex t-h-full t-justify-center t-w-full t-overflow-hidden'>
      <div className=' t-w-full t-bg-white t-shadow-lg t-border t-py-4 t-px-4 500:t-px-8 sm:t-px-12 t-rounded-lg t-text-t2'>
        <div className='t-flex t-flex-col md:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3 md:t-px-5'>
          <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Team Collaboration </h3>

          <div className='t-flex t-flex-col 500:t-flex-row t-gap-3 md:t-gap-6 t-my-2  t-w-full 500:t-w-auto'>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <Search2
                placeholder='Search Client'
                height='t-h-[45px]'
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
            <div className='t-relative t-w-[145px]'>
              <Button
                Name='Add Team'
                Icon='/media/svg/qr_dashboard/plus.svg'
                primary
                iconsize='svg-icon-6'
                className='t-w-full t-h-[45px]'
                click={() => {
                  if (canAddUser) {
                    setAddTeam(true)
                    formik.resetForm()
                  } else {
                    if (!canAddUser) {
                      setShowNotAllowed(true)
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
        <Spin spinning={loading}>
          <TeamTable
            currentOffset={currentOffset}
            setCurrentOffset={setCurrentOffset}
            actionclick={(user: any, action) => {
              if (action === 'edit') {
                setIsUpdated(true)
                formik.setValues(user)
                setAddTeam(true)
              } else {
                setDeleteCollab(true)
                setDeleteCollabId(user?.id)
              }
            }}
          />
        </Spin>
      </div>
      {alert ? (
        <div
          ref={modalRef}
          className='t-absolute t-bg-white t-px-16 t-py-20 t-w-[90%] 500:t-w-[75%] t-z-[9999999] t-flex t-flex-col t-items-center t-justify-center t-gap-6 t-rounded-2xl'
        >
          <img src={images.alert} alt='scanQr' className='' />
          <h3 className='t-text-[18.7px]  t-text-black'>Alert Message</h3>
        </div>
      ) : (
        ''
      )}

      <Modal show={addTeam} scrollable dialogClassName='modal-md' className='t-mt-[50px]'>
        <div className='t-bg-white t-flex t-flex-col t-gap-6 t-p-7 t-h-full t-overflow-scroll'>
          <div className='t-flex t-flex-row t-items-center t-justify-between'>
            <h3 className='t-text-[16px] md:t-text-[20px] t-text-black t-font-bold'>
              {isUpdated ? 'Update Team Member' : 'Add New Team Member'}
            </h3>
            <div
              className='t-cursor-pointer t-flex t-items-center t-justify-center'
              onClick={() => {
                setAddTeam(false)
                setIsUpdated(false)
                formik.resetForm()
              }}
            >
              <img
                alt='img'
                src={toAbsoluteUrl('/media/svg/qr_dashboard/cross.svg')}
                className='t-w-[13px] t-cursor-pointer svg-icon-1'
              />
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className='t-flex t-flex-col t-gap-3 '>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>First Name:</p>
              <div className='t-w-full'>
                <Input
                  isDisabled={isUpdated}
                  type='text'
                  value={formik.values.firstName}
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter First Name'
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='t-text-primary'>{formik.errors.firstName}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Last Name:</p>
              <div className='t-w-full'>
                <Input
                  isDisabled={isUpdated}
                  type='text'
                  name='lastName'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Last Name'
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='t-text-primary'>{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Email:</p>
              <div className='t-w-full'>
                <Input
                  isDisabled={isUpdated}
                  type='email'
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='you@company.com'
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='t-text-primary'>{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-flex-col t-gap-1 font-inter'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium'>Permission:</p>
              <div className='t-w-full'>
                <DropdownForm
                  selectOption={formik.setFieldValue}
                  name='role'
                  value={formik.values.role}
                  title='Select Permission Level'
                  listItems={PERMISSION_LEVEL}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className='t-text-primary'>{formik.errors.role}</div>
                )}
              </div>
            </div>

            <Button
              Name={isUpdated ? 'Update Member' : 'Send Invitation'}
              primary
              loading={loading}
              className=' t-mt-5 t-h-[50px] md:t-h-[60px] '
            />
          </form>
        </div>
      </Modal>

      <Modal show={showNotAllowed} dialogClassName='modal-md' className='t-mt-[50px]'>
        <ModalBody>
          <div className='t-flex t-flex-col t-gap-5'>
            <p className='t-text-xl t-font-medium'>
              Oops, you can't add things right now. But don't worry, just upgrade your plan to
              unlock this feature!.
            </p>
            <div>
              <Button
                Name='OK'
                primary
                className='t-w-[30%] t-ml-auto t-h-[45px] t-p-2'
                click={() => {
                  setShowNotAllowed(false)
                }}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>

      {deleteCollab && (
        <ConfirmPopUp
          message='Are you sure you want to delete this QR?'
          handleClick={handleDeletePost}
          setState={() => setDeleteCollab(false)}
          btnText='Delete'
        />
      )}
    </div>
  )
}

interface ConfirmPopUpProps {
  setState: (state: boolean) => void
  handleClick: () => void
  message: string
  btnText: string
}

const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({setState, handleClick, message, btnText}) => {
  const popUpRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popUpRef, () => setState(false))

  return (
    <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-text-t2 t-px-3'>
      <div
        ref={popUpRef}
        className='t-bg-white t-p-7 t-w-[412px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
      >
        {/* Assuming KTSVG is a component */}
        {/* <KTSVG path='/media/svg/qr_dashboard/exclamationred.svg' className=' svg-icon-1' /> */}
        <p className='t-text-[14px] t-font-medium t-text-center'>{message}</p>
        <div className='t-flex t-items-center t-gap-6 t-w-full t-text-[16px] t-text-t1 '>
          <button
            onClick={() => setState(false)}
            type='button'
            className='t-border t-border-[#D0D5DD] t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleClick}
            className='t-border t-border-[#D92D20] t-bg-[#D92D20] t-text-white t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}
