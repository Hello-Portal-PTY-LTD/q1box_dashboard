import {useEffect, useState} from 'react'

import {confirmOtp, updateAuthUser} from 'store/authStore/authAction'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {Spin, message,Tooltip,Switch} from 'antd'
import camera from '../../../../../../../src/assets/media/camera.svg'
import {
  Button as BootstrapButton,
  Dropdown as BootstrapDropdown,
  FormControl,
} from 'react-bootstrap'
import './style.css'
import {Country, City} from 'country-state-city'
import {INDUSTRIES_LIST} from 'mock'
const {axiosInstance} = require('../../../../../../axios/index')

const profileDetailsSchema = Yup.object().shape({
  picture: Yup.string(),
  name: Yup.string().required(' Name is required'),
  email: Yup.string().required('Email is required'),
  location: Yup.string().required('Location is required'),
  industry: Yup.string().required('Industry is required'),
  role: Yup.string().required('Role is required'),
})

// const roles = {
//   admin: 'Admin',
//   superAdmin: 'Super Admin',
//   actingSuperAdmin: 'Super Admin (Acting)',
//   superEditor: 'Super Editor',
//   superViewer: 'Super Viewer',
//   actingAdmin: 'Acting Admin',
//   editor: 'Editor',
//   viewer: 'Viewer',
// }
const ProfileDetails = () => {
  const {user} = useSelector((state) => state.auth)
  const {billingInfo} = useSelector((state) => state.payment)
  const [imageloading, setimageLoading] = useState(false)
  const [tempUser, setTempUser] = useState()

  const [nameprofile, setNameProfile] = useState(null)
  const [countryCode, setCountryCode] = useState(null)
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  const [modal, setModal] = useState(false)
  const [imgUrl, setImgUrl] = useState(null)
  const [SSoEnable, SetSSoEnable] = useState(false)
  const [SSoEnableLoading, SetSSoEnableLoading] = useState(false)
  // const [connectAzureAd, setConnectAzureAd] = useState(false)
  // const [editConnectAzureAd, setEditConnectAzureAd] = useState(false)
  // const [connectAzureAdLoading, setConnectAzureAdLoading] = useState(false)

  const dispatch = useDispatch()

  const formik = useFormik({
    validationSchema: profileDetailsSchema,
    onSubmit: (values) => {
      values = {...values, picture: imgUrl}
    },
  })

  useEffect(() => {
    if (user) {
      // const role = user?.role || ''
      // formik.setValues({...user, role: roles[role]})
      formik.setValues({...user})
    }
    // eslint-disable-next-line
  }, [user])

  const uploadFileGCP = async (file) => {
    const form = new FormData()
    for (let i = 0; i < file.length; i++) {
      form.append('files', file[i])
    }
    try {
      const response = await axiosInstance.post(`/resource`, form)
      setImgUrl(response[0].url)
      message.success('Image Uploaded Successfully')
      setimageLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const [opt, setOpt] = useState()
  const handleChange = (event) => {
    setOpt(event.target.value)
  }
  useEffect(() => {
    if (user) {
      if (user.picture) {
        setImgUrl(user.picture)
      } else {
      }
      if (user?.firstName && user?.lastName) {
        setNameProfile(user?.firstName[0]?.toUpperCase() + user?.lastName[0]?.toUpperCase())
      } else if (user?.firstName) {
        setNameProfile(user?.firstName[0]?.toUpperCase())
      } else if (user?.lastName) {
        setNameProfile(user?.lastName[0]?.toUpperCase())
      }
      // if (user?.azureSSOEnables) {
      //   SetSSoEnable(user?.azureSSOEnables)
      // }
    }
  }, [user])
  useEffect(() => {
    const fetchCountryNames = async () => {
      try {
        const allCountries = Country.getAllCountries()
        const newzelandindex = allCountries.findIndex((country) => country.name === 'New Zealand')
        const australiaindex = allCountries.findIndex((country) => country.name === 'Australia')

        if (newzelandindex !== -1 && australiaindex !== -1) {
          const newzeland = allCountries.splice(newzelandindex, 1)[0]
          const australia = allCountries.splice(australiaindex, 1)[0]

          allCountries.unshift(newzeland, australia)
        }
        if (allCountries) {
          setCountries(allCountries)
        }
      } catch (error) {
        console.error('Error fetching country names:', error)
      }
    }

    fetchCountryNames()
  }, [])

  useEffect(() => {
    try {
      if (countryCode) {
        const allcities = City.getCitiesOfCountry(countryCode)
        if (allcities) {
          setCities(allcities)
        }
      }
    } catch (error) {
      console.error('Error fetching cities names:', error)
    }
  }, [countryCode])

  const handleConfirmOtp = () => {
    delete tempUser.otp
    dispatch(
      confirmOtp({
        user: tempUser,
        otp: parseInt(opt),
      })
    )
      .unwrap()
      .then((res) => {
        message.success(res.message)
      })
      .catch((err) => message.error(err))
      .finally(setOpt(''), setModal(false))
  }

  // const structurdRoles = (role) => {
  //   return roles[role]
  // }

  console.log({user})
  const HandleSSOEnable = (value) => {
    if (user?.role === 'admin' && billingInfo?.plan === 'PROFESSIONAL') {
      SetSSoEnableLoading(true)
      SetSSoEnable(value)
      let data = {
        azureSSOEnables: value,
        email: user.email,
        fullName: user?.firstName + ' ' + user?.lastName,
      }
      axiosInstance
        .post('/users/azure-user-create', data)
        .then((res) => {
          let msg = res?.data?.data || res?.data || 'Successfully!'
          if (res?.data !== 'Status change') message.success(msg)
        })
        .catch((err) => {
          let msg = err?.response?.data?.data || err?.response?.data || 'Error!'
          message.error(msg)
          SetSSoEnable(false)
        })
        .finally(() => {
          SetSSoEnableLoading(false)
         
        })
    }
  }

  // const HandleAzureSync = (value) => {
  //   value.preventDefault()
  //   if (user?.role === 'admin' && billingInfo?.plan === 'PROFESSIONAL') {
  //     setConnectAzureAdLoading(true)

  //     let data = {
  //       tenantId: value?.target.tenantId.value,
  //     }
  //     axiosInstance
  //       .post('/users/ssorequest', data)
  //       .then((res) => {
  //         let msg = 'Successfully Added!'
  //         console.log(res?.data)
  //         if (res?.data !== 'Status change') message.success(msg)
  //         setConnectAzureAdLoading(false)
  //         setConnectAzureAd(false)
  //         dispatch(getAuthUser(user?._id))
  //       })
  //       .catch((err) => {
  //         let msg = err?.data?.data || err?.response?.data || 'Error! ssssssssssssss'
  //         message.error(msg)
  //       })
  //       .finally(() => {
  //         setConnectAzureAdLoading(false)
  //       })
  //   }
  // }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header t-border cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form
          noValidate
          onSubmit={async (event) => {
            event.preventDefault()
            formik.values = {...formik.values, picture: imgUrl}
            if (user?.email?.trim() !== formik?.values.email?.trim()) {
              try {
                await axiosInstance.post('/users/sendOpt', {email: formik.values.email})
                setModal(true)
                setTempUser(formik.values)
              } catch (err) {
                message.error('Email already exists')
              }
            } else {
              await dispatch(updateAuthUser(formik.values))
              message.success({
                content: 'User Updated Successfully',
                key: 'updated',
              })
            }
          }}
          className='form'
        >
          <div className='card-body border-top p-9'>
            <div className='row mb-10'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='t-flex t-items-center t-justify-center t-gap-6 t-bg-lightGreen t-p-4 t-rounded-xl'>
                <div className='t-relative'>
                  {imgUrl?.preview || imgUrl ? (
                    <Spin spinning={imageloading}>
                      <img
                        src={imgUrl?.preview ? imgUrl?.preview : imgUrl}
                        className={`t-min-w-[160px] t-items-center t-flex t-justify-center t-max-w-[160px] t-h-[160px]  t-rounded-[100px] ${
                          imageloading ? 't-opacity-80' : 't-opacity-100'
                        }`}
                        alt='User avatar'
                      />
                    </Spin>
                  ) : (
                    <div className='t-text-white t-min-w-[120px] t-min-h-[120px] bg-primary t-flex t-flex-col t-justify-center items-center  t-pt-2 t-text-center  t-text-7xl t-rounded-full'>
                      {nameprofile}
                    </div>
                  )}
                  <div className='t-p-3 t-cursor-pointer t-w-[40px]  t-absolute t-bottom-1 t-right-0 t-rounded-[100px] t-flex t-items-center t-bg-primary'>
                    <label htmlFor='filePicker'>
                      <input
                        id='filePicker'
                        type='file'
                        className='t-hidden'
                        onChange={(e) => {
                          setimageLoading(true)

                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = async () => {
                              setImgUrl({
                                file: file,
                                preview: reader.result,
                              })
                            }
                            uploadFileGCP(e.target.files)

                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                      <img src={camera} className='t-w-full t-cursor-pointer' alt='Camera Icon' />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>First Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Last Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Email Address'
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.email}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle variant='primary' id='country-dropdown'>
                        {formik.values?.country ? formik.values?.country : 'Select a Country'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {countries.map((country, index) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => {
                              setCountryCode(country.isoCode)
                              formik.setFieldValue('country', country.name)
                              formik.setFieldValue('city', '')
                            }}
                          >
                            {country.name}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown>

                    {formik.touched.location && formik.errors.location && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.location}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle
                        disabled={cities.length < 1 ? true : false}
                        variant='primary'
                        id='country-dropdown'
                      >
                        {formik.values?.city ? formik.values?.city : 'Select a City'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {cities.map((city, index) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => {
                              formik.setFieldValue('city', city.name)
                            }}
                          >
                            {city.name}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown>

                    {formik.touched.location && formik.errors.location && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.location}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Industry</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle
                        variant='primary'
                        id='country-dropdown'
                        disabled={INDUSTRIES_LIST.length < 1 ? true : false}
                        style={{
                          backgroundColor: '#1D59F9',
                        }}
                      >
                        {formik.values?.industry ? formik.values?.industry : 'Select your industry'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {INDUSTRIES_LIST.map((industry, index) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => {
                              formik.setFieldValue('industry', industry)
                            }}
                          >
                            {industry}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown>
                    {formik.touched.location && formik.errors.location && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.location}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Role</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      disabled
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0 '
                      placeholder={{...formik.getFieldProps('role')}}
                      {...formik.getFieldProps('role')}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Login With SSO</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <Tooltip
                      title={
                        user?.role === 'admin' && billingInfo?.plan === 'PROFESSIONAL'
                          ? ''
                          : 'Only for Premium User'
                      }
                    >
                      <Switch
                        disabled={user?.role !== 'admin' && billingInfo?.plan !== 'PROFESSIONAL'}
                        checkedChildren='Enabled'
                        unCheckedChildren='Disabled'
                        style={{backgroundColor: !SSoEnable ? '#FF6461 ' : '#55B659'}}
                        loading={SSoEnableLoading}
                        checked={SSoEnable}
                        onChange={HandleSSOEnable}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div> 
           
    </div>
    </form>
    </div>
    </div>
  )
}

export {ProfileDetails}
