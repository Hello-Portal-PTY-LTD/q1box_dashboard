import {toAbsoluteUrl} from '_metronic/helpers'
import {DropdownForm} from '_metronic/partials/qrComponents'
import Input from '_metronic/partials/qrComponents/Input'
import {useFormik} from 'formik'
import React, {useEffect, useState} from 'react'
import {ADMIN_PERMISSION_LEVEL, IS_SUPER_OR_SUPER_ACTING_ADMIN} from 'mock'
import * as Yup from 'yup'
import camera from '../../../../../../../assets/media/camera.svg'
import {uploadFileGCP} from 'store/userStore/userActions'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from 'store'
import {getTeamMembers, sendInvite, updateMember} from 'store/teamStore/teamAction'
import {Spin, message, Modal} from 'antd'
import {roleFormat} from 'utils/functions'
type Props = {
  show: boolean
  offset?: number
  handleClose: () => void
  user?: {
    firstName: string
    lastName: string
    phone?: string
    country?: string
    picture?: string
    city?: string
    email?: string
    role?: string
    id?: string
  }
}
const AddUserModal: React.FC<Props> = ({show, handleClose, offset, user}) => {
  const [preview, setPreview] = useState<string | null>(user?.picture || null)
  const [profileUrl, setProfileUrl] = useState<string | null>(user?.picture || null)
  const dispatch = useDispatch<AppDispatch>()
  const {uploadFileLoading} = useSelector((state: any) => state.user)
  const {loading} = useSelector((state: any) => state.team)
  const currentRole = user && user.role ? roleFormat(user?.role) || '' : ''
  const authUser = useSelector((state: any) => state.auth.user)

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: user?.city || '',
    email: user?.email || '',
    role: user?.role || '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().required('Permission Level is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const userInfo = {
        ...values,
        picture: profileUrl,
      }

      if (user) {
        dispatch(updateMember({...userInfo, id: user?.id}))
          .unwrap()
          .then(() => {
            message.success('User updated successfully')
            closeModal()
          })
          .catch((err: any) => {
            message.error(err)
          })
      } else {
        dispatch(sendInvite(userInfo))
          .unwrap()
          .then(() => {
            message.success('Invite sent successfully')
            dispatch(getTeamMembers({offset: offset, isDeleted: false}))
            closeModal()
          })
          .catch((err: any) => {
            message.error(err)
          })
      }
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result)
          dispatch(uploadFileGCP([selectedFile]))
            .unwrap()
            .then((res: any) => {
              setProfileUrl(res[0].url)
            })
        }
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const closeModal = () => {
    setPreview(null)
    setProfileUrl(null)
    handleClose()
    formik.resetForm()
  }

  useEffect(() => {
    if (user?.picture !== undefined && user?.picture?.length > 0) {
      setPreview(user?.picture)
    }
  }, [user?.picture])

  return (
    <Modal width={600} onCancel={closeModal} footer={false} closeIcon={true} open={show}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>{user ? 'Update User' : 'Add User'}</h5>
        </div>
        <div className='modal-body '>
          <form onSubmit={formik.handleSubmit} className='t-flex t-flex-col t-gap-3  '>
            <div className='t-flex t-items-center t-justify-center t-gap-6 t-bg-lightGreen t-p-4 t-rounded-xl'>
              <div className='t-relative '>
                <Spin spinning={uploadFileLoading}>
                  <img
                    src={preview || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                    className='t-min-w-[140px] t-items-center t-flex t-justify-center t-object-cover t-max-w-[140px] t-h-[140px]  t-rounded-[100px]'
                    alt='User avatar'
                  />
                </Spin>

                <div className='t-p-3 t-cursor-pointer t-w-[40px] t-absolute t-bottom-1 t-right-0 t-rounded-[100px] t-flex t-items-center t-bg-primary'>
                  <label htmlFor='filePicker'>
                    <input
                      id='filePicker'
                      type='file'
                      accept='image/png, image/jpg, image/jpeg'
                      className='t-hidden'
                      onChange={handleFileChange}
                      disabled={uploadFileLoading}
                    />
                    <img src={camera} className='t-w-full t-cursor-pointer' alt='Camera Icon' />
                  </label>
                </div>
              </div>
            </div>
            <div className='t-flex  t-gap-10 font-inter'>
              <div className='t-w-full '>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>First Name</p>
                <Input
                  type='text'
                  name='firstName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter First Name'
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='t-text-primary'>{formik?.errors?.firstName}</div>
                )}
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium  t-mb-2'>Last Name</p>
                <Input
                  type='text'
                  name='lastName'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Last Name'
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='t-text-primary'>{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-gap-10  font-inter'>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Email</p>
                <Input
                  type='text'
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Email'
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='t-text-primary'>{formik.errors.email}</div>
                )}
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Phone</p>
                <Input
                  type='text'
                  name='phone'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Phone'
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className='t-text-primary'>{formik.errors.phone}</div>
                )}
              </div>
            </div>

            <div className='t-w-full'>
              <div>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>
                  Select User Permission Level
                </p>
                <DropdownForm
                  selectOption={formik.setFieldValue}
                  name='role'
                  disable={!IS_SUPER_OR_SUPER_ACTING_ADMIN(authUser?.role)}
                  title={currentRole || 'Select Permission Level'}
                  listItems={ADMIN_PERMISSION_LEVEL}
                />
                {formik.touched.role && formik.errors.role && (
                  <div className='t-text-primary'>{formik.errors.role}</div>
                )}
              </div>
            </div>

            <Spin className='t-w-full' spinning={loading}>
              <button
                disabled={loading || uploadFileLoading}
                type='submit'
                className='t-bg-primary t-w-full t-h-[50px] md:t-h-[51px] t-text-white t-rounded-[12px] font-inter t-text-[16px] t-font-semibold t-mt-5'
              >
                {user ? 'Update user' : 'Create user'}
              </button>
            </Spin>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export {AddUserModal}
