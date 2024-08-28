import React, {useEffect, useRef, useState} from 'react'
import {Button, Form, Input, Select, Spin, Switch, message} from 'antd'
import ReactQuill, {Quill} from 'react-quill'
// import {request} from '../../../config/API'
import moment from 'moment'
// import '~react-quill/dist/quill.snow.css'

// import {RiEdit2Fill} from 'react-icons/ri'
import {EditOutlined} from '@ant-design/icons'
const {axiosInstance} = require('../../../../../../axios/index')
// Define the font format
const Font = Quill.import('formats/font')

// Whitelist the fonts you want to allow

Font.whitelist = ['roboto', 'merriweather', 'lora']

// Register the Font format
Quill.register('formats/font', Font, true)

const Banner = ({setBannerEdit, BannerData}) => {
  const endTimeUnix = BannerData[0]?.couponRedeemBy
  const currentUnixTime = moment().unix()
  let checkTime = endTimeUnix < currentUnixTime ? false : true

  const calculateRemainingTime = () => {
    const now = moment().unix()
    const remainingSeconds = endTimeUnix - now
    return moment.duration(remainingSeconds, 'seconds')
  }

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime())
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        style={{
          background: `${BannerData[0]?.bgColor}`,
          padding: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          minHeight: '90px',
        }}
      >
        <div style={{position: 'absolute', right: 20, bottom: 15}}>
          <div
            style={{
              background: BannerData[0]?.status ? 'green' : 'orange',
              padding: '3px 10px',
              borderRadius: '4px',
            }}
          >
            <p style={{fontWeight: 600, fontSize: '18px', color: 'white'}}>
              {BannerData[0]?.status ? 'Active' : 'Deactive'}
            </p>
          </div>
        </div>

        <div
          onClick={() => setBannerEdit(true)}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 20,
            top: 5,
          }}
        >
          {/* <RiEdit2Fill /> */}
          <EditOutlined style={{color: 'white', fontSize: '28px'}} />
        </div>
        <div>
          <div className='dangerouslysetinnerhtml' style={{textAlign: 'center'}}>
            <div
              dangerouslySetInnerHTML={{
                __html: BannerData[0]?.bannerTitle,
              }}
            />
          </div>

          {BannerData[0]?.announcement === 'coupon' && (
            <p
              style={{
                textAlign: 'center',
                color: checkTime ? 'white' : 'red',
                fontSize: '14px',
                fontWeight: 500,
                marginLeft: '20px',
              }}
            >
              {checkTime ? (
                <>
                  {remainingTime.days()} days, {remainingTime.hours()} hours,
                  {remainingTime.minutes()} minutes, {remainingTime.seconds()} seconds
                </>
              ) : (
                'Coupon expired'
              )}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

const CustomToolbar = () => {
  return (
    <div id='toolbar'>
      <select className='ql-font'>
        <option value='roboto'>Roboto</option>
        <option value='merriweathers'>Merriweather</option>
        <option value='lora'>Lora</option>
      </select>
      <select className='ql-color'>
        <option value='rgb(255, 0, 0)'>Red</option>
        <option value='white'>white</option>
        <option value='rgb(255, 165, 0)'>Orange</option>
        <option value='rgb(255, 255, 0)'>Yellow</option>
        <option value='rgb(0, 128, 0)'>Green</option>
        <option value='rgb(0, 0, 255)'>Blue</option>
        <option value='rgb(128, 0, 128)'>Purple</option>
        <option value='rgb(128, 128, 128)'>Gray</option>
        <option value='rgb(0, 0, 0)'>Black</option>
        <option value='rgb(255, 255, 255)'>White</option>
        <option value='rgb(255, 192, 203)'>Pink</option>
        <option value='rgb(255, 0, 255)'>Magenta</option>
        <option value='rgb(0, 255, 255)'>Cyan</option>
      </select>

      <select className='ql-size'>
        <option value='small'>Small</option>
        <option value='large'>Large</option>
        <option value='huge'>Huge</option>
      </select>

      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-link' />
    </div>
  )
}

const BannerAdd = () => {
  const [bannerStatus, setBannerStatus] = useState(false)
  const [BannerData, setBannerData] = useState([])
  const [bannerLoading, setBannerLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bannerEdit, setBannerEdit] = useState(false)
  const [couponData, setCouponData] = useState([])
  const [selectAnnouncement, setSelectAnnouncement] = useState('')
  const [form] = Form.useForm()
  const quillRef = useRef(null)

  const getbanner = async (firstLoading) => {
    try {
      if (firstLoading) {
        setLoading(true)
      }

      setBannerLoading(true)
      let res = await axiosInstance.get('/banner/getbanner')
      console.log(res)
      setBannerData(res?.data)
      setBannerLoading(false)
      setBannerEdit(false)
      setLoading(false)
    } catch (error) {
      setBannerLoading(false)
    }
  }

  useEffect(() => {
    if (BannerData?.length) {
      if (quillRef?.current) {
        const editor = quillRef?.current?.getEditor()
        editor.setContents(editor.clipboard.convert(BannerData[0]?.bannerTitle))
      }

      const editor = quillRef?.current?.getEditor()
      if (editor) {
        editor.container.firstChild.style.backgroundColor = BannerData[0]?.bgColor
      }
      setBannerStatus(BannerData[0]?.status)
      setSelectAnnouncement(BannerData[0]?.announcement)
      form.setFieldsValue({
        discountCode: BannerData[0]?.discountCode,
        announcement: BannerData[0]?.announcement,
        bgColor: BannerData[0]?.bgColor,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BannerData, bannerEdit])

  useEffect(() => {
    getbanner(true)
  }, [])

  useEffect(() => {
    axiosInstance
      .get(`/coupon/get-all-coupons-at-once`, {})
      .then((data) => {
        setCouponData(data?.allCoupon)
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.message || 'Something Happened'
        message.error(errorMsg)
      })
  }, [])

  const onHandleSubmit = async (value) => {
    let editss
    if (quillRef.current) {
      const editor = quillRef.current.getEditor()
      const htmlContent = editor.root.innerHTML
      editss = htmlContent
    }
    if (!editss) return message.error('Banner titlte must not be empty')
    setBannerLoading(true)

    let data2 = {}
    if (value.announcement === 'coupon') {
      let selectedCouponObj = couponData.find((item) => item?.id === value.discountCode)
      data2 = {
        discountCode: value.discountCode,
        couponRedeemBy: selectedCouponObj ? selectedCouponObj?.redeem_by : '',
      }
    }

    let data = {
      status: bannerStatus,
      bannerTitle: editss,
      announcement: value?.announcement,
      bgColor: quillRef?.current?.getEditor()
        ? quillRef.current.getEditor().container.firstChild.style.backgroundColor
        : '',
      ...data2,
    }
    try {
      await axiosInstance.post('/banner/addbanner', data)
      message.success('Update Successfully')
      setBannerLoading(false)
      getbanner()
    } catch (error) {
      setBannerLoading(false)
      console.error(error)
      //   message.success("Update Successfully");
    }
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
  ]

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  }

  const handleChangeBackgroundColor = (event) => {
    const editor = quillRef.current.getEditor()
    if (editor) {
      editor.container.firstChild.style.backgroundColor = event.target.value
    }
  }

  return (
    // <Layout heading='Banner'>
    <>
      {BannerData?.length && !bannerEdit ? (
        <div>
          <Banner setBannerEdit={setBannerEdit} BannerData={BannerData} />
        </div>
      ) : (
        <>
          {loading ? (
            <div
              style={{
                width: '90%',
                height: '80%',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Spin size='large' />
            </div>
          ) : null}
          <div
            style={{
              padding: '20px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <h1 style={{fontSize: '32px', marginBottom: '20px'}}>Add Banner</h1>
            <Form
              initialValues={{
                discountCode: BannerData?.length ? BannerData[0]?.discountCode : '', // Assuming data is an object containing discountCode
              }}
              form={form}
              onFinish={async (e) => {
                await onHandleSubmit(e)
              }}
            >
              <div>
                <div style={{marginBottom: '20px'}}>
                  <label style={{marginBottom: '10px'}}>Select Announcement</label>
                  <Form.Item
                    required
                    name='announcement'
                    tooltip='Spaces will convert to dash'
                    rules={[
                      {
                        required: true,
                        message: 'This field is required',
                      },
                    ]}
                  >
                    <Select
                      onChange={(e) => {
                        setSelectAnnouncement(e)
                      }}
                      size='large'
                      placeholder='Select Announcement'
                      style={{borderRadius: 8, width: '100%'}}
                    >
                      {/* Add your options here */}
                      <Select.Option value=''>Select Announcement</Select.Option>

                      <Select.Option value={'general'}>General</Select.Option>
                      <Select.Option value={'coupon'}>Coupon</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                {selectAnnouncement === 'coupon' && (
                  <div style={{marginBottom: '20px'}}>
                    <label style={{marginBottom: '10px'}}>Coupon ID Or Name</label>
                    <Form.Item
                      required
                      name='discountCode'
                      tooltip='Spaces will convert to dash'
                      rules={[
                        {
                          required: true,
                          message: 'This field is required',
                        },
                      ]}
                    >
                      <Select
                        size='large'
                        placeholder='Coupon ID or Name'
                        style={{borderRadius: 8, width: '100%'}}
                      >
                        {/* Add your options here */}
                        <Select.Option value=''>Select Coupon</Select.Option>
                        {couponData?.map((item) => (
                          <Select.Option value={item?.id}>{item?.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                )}

                <div>
                  <label style={{marginBottom: '10px'}}>Background Colour</label>
                  <Form.Item name='bgColor'>
                    <Input
                      onChange={handleChangeBackgroundColor}
                      type='color'
                      className='t-rounded-full t-w-16 t-h-14'
                      size='large'
                    />
                  </Form.Item>
                </div>

                <div style={{marginBottom: '20px'}}>
                  <label style={{marginBottom: '10px'}}>Banner Title</label>
                  <CustomToolbar />
                  <ReactQuill
                    ref={quillRef}
                    required
                    placeholder='Banner Title'
                    modules={modules}
                    formats={formats}
                    className='discountBanner'
                  />
                </div>
                <div
                  style={{
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <label style={{marginBottom: '10px'}}>Banner Status</label>
                  <Switch checked={bannerStatus} onChange={() => setBannerStatus(!bannerStatus)} />
                </div>
              </div>
              <div style={{display: 'flex', justifyContent: 'end', gap: 10}}>
                {BannerData?.length ? (
                  <Button
                    shape='round'
                    style={{
                      // background: primaryDark,
                      // borderColor: primaryDark,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={() => setBannerEdit(false)}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  loading={bannerLoading && !loading ? true : false}
                  shape='round'
                  htmlType='submit'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {BannerData?.length ? 'Save' : 'Add'}
                </Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
    // </Layout>
  )
}

export default BannerAdd
