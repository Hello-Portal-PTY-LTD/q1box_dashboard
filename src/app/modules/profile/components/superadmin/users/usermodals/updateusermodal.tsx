import {KTSVG, toAbsoluteUrl} from '_metronic/helpers'
import {DropdownForm} from '_metronic/partials/qrComponents'
import Input from '_metronic/partials/qrComponents/Input'
import {useFormik} from 'formik'
import {PERMISSION_LEVEL} from 'mock'
import React, {Dispatch, SetStateAction, useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import camera from '../../../../../../../assets/media/camera.svg'
type Props = {
  show: boolean
  handleClose: () => void
}

const UpdateUserModal: React.FC<Props> = ({show, handleClose}) => {
  const initialValues = {
    firstName: 'Waqar',
    lastName: 'Ahmed',
    phone: '23232331131',
    address: 'islamabad Pakistan',
    designation: 'developer',
    country: 'Pakistan',
    state: '',
    city: 'Islamabad',
    zipCode: '323',
    email: 'waqar.neslit@gmail.com',
    permission: '',
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    permission: Yup.string().required('Permission Level is required'),
  })

  const onSubmit = (values: any) => {
    const data = {
      role: values.permission,
      email: values.email,
      name: values.fullName,
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,

    onSubmit,
  })

  return (
    <Modal
      className='modal fade'
      id='kt_modal_select_location'
      data-backdrop='static'
      tabIndex={-1}
      role='dialog'
      show={show}
      scrollable
      dialogClassName='modal-lg'
      aria-hidden='true'
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>Edit User</h5>

          <div className='btn btn-icon btn-sm btn-active-light-primary ms-2' onClick={handleClose}>
            <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-2x' />
          </div>
        </div>
        <div className='modal-body'>
          <form onSubmit={formik.handleSubmit} className='t-flex t-flex-col t-gap-3'>
            <div className='t-flex t-items-center t-justify-center t-gap-6 t-bg-lightGreen t-p-4 t-rounded-xl'>
              <div className='t-relative'>
                <img
                  src={toAbsoluteUrl('/media/avatars/300-1.jpg')}
                  className='t-min-w-[160px] t-items-center t-flex t-justify-center t-max-w-[160px] t-h-[160px]  t-rounded-[100px]'
                  alt='User avatar'
                />

                <div className='t-p-3 t-cursor-pointer t-w-[40px] t-absolute t-bottom-1 t-right-0 t-rounded-[100px] t-flex t-items-center t-bg-primary'>
                  <label htmlFor='filePicker'>
                    <input
                      id='filePicker'
                      type='file'
                      className='t-hidden'
                      // onChange={handleFileChange}
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
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className='t-text-[#ff0000]'>{formik.errors.firstName}</div>
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
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className='t-text-[#ff0000]'>{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div className='t-flex  t-gap-10 font-inter'>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Email</p>
                <Input
                  type='text'
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Enter Email'
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='t-text-[#ff0000]'>{formik.errors.email}</div>
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
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className='t-text-[#ff0000]'>{formik.errors.phone}</div>
                )}
              </div>
            </div>
            <div className='t-w-full'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Address</p>
              <Input
                type='text'
                name='address'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Address'
              />
              {formik.touched.address && formik.errors.address && (
                <div className='t-text-[#ff0000]'>{formik.errors.address}</div>
              )}
            </div>
            <div className='t-flex  t-gap-10 font-inter'>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Country</p>
                <Input
                  type='text'
                  name='country'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Country'
                />
                {formik.touched.country && formik.errors.country && (
                  <div className='t-text-[#ff0000]'>{formik.errors.email}</div>
                )}
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>State</p>
                <Input
                  type='text'
                  name='state'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='State'
                />
                {formik.touched.state && formik.errors.state && (
                  <div className='t-text-[#ff0000]'>{formik.errors.state}</div>
                )}
              </div>
            </div>
            <div className='t-flex  t-gap-10 font-inter'>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>City</p>
                <Input
                  type='text'
                  name='city'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='City'
                />
                {formik.touched.city && formik.errors.city && (
                  <div className='t-text-[#ff0000]'>{formik.errors.city}</div>
                )}
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>Zip Code</p>
                <Input
                  type='text'
                  name='zipCode'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Zip Code'
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className='t-text-[#ff0000]'>{formik.errors.zipCode}</div>
                )}
              </div>
            </div>

            <button
              type='submit'
              className='t-bg-[#1E1E2D] t-h-[50px] md:t-h-[60px] t-text-white t-rounded-[12px] font-inter t-text-[16px] t-font-semibold t-mt-5'
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export {UpdateUserModal}
