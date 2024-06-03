import React, {useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
import {Spin, Modal, Select, Form, Input, Button, message} from 'antd'
import {Option} from 'antd/es/mentions'
import {createCoupon, getCoupons} from 'store/dicountCoupon/discountCouponAction'
const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
}

const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
}
interface Props {
  show: boolean
  handleClose: () => void
  handleGetCoupons: () => void

  // Add more props as needed
}

const AddCouponModal: React.FC<Props> = ({show, handleClose, handleGetCoupons}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [addCouponModalLoading, setAddCouponModalLoading] = useState(false)
  const [checkDuration, setCheckDuration] = useState('')
  const [discountType, setDiscountType] = useState('')
  const [couponFor, setCouponFor] = useState('')
  const [form] = Form.useForm()
  const formRef = useRef(null)

  const handleAddCoupon = (values: any) => {
    setAddCouponModalLoading(true)
    if (discountType === 'amount') values.percent_off = null
    else values.amount_off = null
    dispatch(createCoupon(values))
      .unwrap()
      .then(() => {
        setAddCouponModalLoading(false)
        message.success('Coupon Added!')
        handleGetCoupons()
        handleClose()
      })
      .catch((err: any) => {
        message.error(err)
        setAddCouponModalLoading(false)
      })
  }

  const closeModal = () => {
    handleClose()
  }

  const percentageOffValidate = (_: any, value: any) => {
    const floatValue = parseFloat(value)
    if (isNaN(floatValue) || floatValue < 0 || floatValue > 100) {
      return Promise.reject(new Error('Please enter a number between 0 and 100'))
    }

    return Promise.resolve()
  }

  const amountOffValidate = (_: any, value: any) => {
    const intValue = parseInt(value)
    if (isNaN(intValue) || !Number.isInteger(intValue)) {
      return Promise.reject(new Error('Please enter a valid integer'))
    }

    return Promise.resolve()
  }

  return (
    <Modal width={600} onCancel={closeModal} footer={false} closeIcon={true} open={show}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>{'Add Coupon'}</h5>
        </div>
        <div className='modal-body '>
          <Form
            {...layout}
            form={form}
            ref={formRef}
            labelAlign='left'
            onFinish={handleAddCoupon}
            className=''
          >
            <div className='t-grid t-grid-cols t-grid-cols-2 t-mt-8'>
              <div className='t-w-full'>
                <label htmlFor='couponName'>Coupon Name</label>
                <Form.Item
                  className='t-w-[300px]'
                  name='couponName'
                  hasFeedback
                  rules={[{required: true, message: 'This field is required'}]}
                >
                  <Input className='t-w-[265px]' placeholder='Coupon Name' size='large' />
                </Form.Item>
              </div>
              <div className='t-w-full'>
                <label htmlFor='couponForPlan'>Coupon For Plan</label>
                <Form.Item name='couponForPlan' rules={[{required: true}]}>
                  <Select className='t-w-[265px] t-h-[38px]' placeholder='Select Type' allowClear>
                    <Option value='STARTER'>Starter</Option>
                    <Option value='LITE'>Lite</Option>
                    <Option value='BUSINESS'>Business</Option>
                    <Option value='PROFESSIONAL'>Professional</Option>
                    <Option value='ENTERPRISE'>Enterprise</Option>
                    <Option value='ALL'>All</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className='t-w-full'>
                <label htmlFor='discountType'>Discount Type</label>
                <Form.Item name='discountType' rules={[{required: true}]}>
                  <Select
                    className='t-w-[265px] t-h-[38px]'
                    placeholder='Select Type'
                    onChange={(value) => setDiscountType(value)}
                    allowClear
                  >
                    <Option value='amount'>Amount</Option>
                    <Option value='percent'>Percent</Option>
                  </Select>
                </Form.Item>
              </div>
              {discountType === 'amount' && (
                <div className='t-w-full '>
                  <label htmlFor='amount_off'>Amount Off</label>
                  <Form.Item
                    className='t-w-[250px]'
                    name='amount_off'
                    hasFeedback
                    rules={[
                      {required: true, message: 'Please enter a number'},
                      {validator: amountOffValidate},
                    ]}
                  >
                    <Input className='t-w-[265px]' size='large' />
                  </Form.Item>
                </div>
              )}

              {discountType === 'percent' && (
                <div className='t-w-full'>
                  <label htmlFor='percent_off'>Percentage Off</label>
                  <Form.Item
                    className='t-w-[250px]'
                    name='percent_off'
                    hasFeedback
                    rules={[
                      {required: true, message: 'Please enter a number'},
                      {validator: percentageOffValidate},
                    ]}
                  >
                    <Input className='t-w-[265px]' size='large' />
                  </Form.Item>
                </div>
              )}

              <div className='t-w-full'>
                <label htmlFor='duration'>Duration</label>
                <Form.Item name='duration' rules={[{required: true}]}>
                  <Select
                    className='t-w-[265px] t-h-[38px]'
                    placeholder='Select Duration'
                    onChange={(value) => setCheckDuration(value)}
                    allowClear
                  >
                    <Option value='once'>Once</Option>
                    <Option value='repeating'>Repeating</Option>
                    <Option value='forever'>Forever</Option>
                  </Select>
                </Form.Item>
              </div>

              {checkDuration === 'repeating' && (
                <div className='t-w-full'>
                  <label htmlFor='months_in_duration'>Months Duration</label>
                  <Form.Item
                    className='t-w-[265px] t-h-[38px]'
                    name='months_in_duration'
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a number',
                      },
                      {
                        pattern: /^(0|[1-9]\d?|12)$/,
                        message: 'Please enter a whole number between 0 and 100',
                      },
                    ]}
                  >
                    <Input className='t-w-[265px] t-h-[38px]' size='large' />
                  </Form.Item>
                </div>
              )}

              <div className='t-w-full'>
                <label htmlFor='redeem_by'>Expiry Date</label>
                <Form.Item
                  name='redeem_by'
                  hasFeedback
                  rules={[{required: true, message: 'This field is required'}]}
                >
                  <Input
                    className='t-w-[265px] t-h-[38px]'
                    type='date'
                    min={new Date().toISOString().split('T')[0]}
                    size='large'
                  />
                </Form.Item>
              </div>

              <div className='t-w-full'>
                <label htmlFor='couponFor'>Coupon For</label>
                <Form.Item name='couponFor' rules={[{required: true}]}>
                  <Select
                    className='t-w-[265px] t-h-[38px]'
                    placeholder='Select Type'
                    onChange={(value) => setCouponFor(value)}
                    allowClear
                  >
                    <Option value='onlyOneUser'>Only One User</Option>
                    <Option value='everyone'>Everyone</Option>
                  </Select>
                </Form.Item>
              </div>

              {couponFor === 'onlyOneUser' && (
                <div className='t-w-full'>
                  <Form.Item
                    // label="Email"

                    name='couponForEmail'
                    hasFeedback
                    rules={[
                      {required: true, message: 'This field is required'},
                      {
                        type: 'email',
                        message: 'Please enter a valid email address',
                      },
                    ]}
                  >
                    <label htmlFor='couponForEmail'>Email</label>
                    <Input className='t-w-[265px] t-h-[38px]' size='large' />
                  </Form.Item>
                </div>
              )}
              <div className='t-w-full'>
                <label htmlFor='max_redemptions'>Max Redeem</label>
                <Form.Item
                  name='max_redemptions'
                  hasFeedback
                  rules={[
                    {required: true, message: 'This field is required'},
                    {
                      pattern: /^(0|[1-9]\d?|12)$/,
                      message: 'Please enter a whole number between 0 and 100',
                    },
                  ]}
                >
                  <Input className='t-w-[265px] t-h-[38px]' size='large' />
                </Form.Item>
              </div>
            </div>
            <Form.Item {...tailLayout}>
              <Spin className='t-w-full' spinning={addCouponModalLoading}>
                <Button
                  disabled={addCouponModalLoading}
                  htmlType='submit'
                  className='t-bg-primary t-h-[40px] t-text-white t-rounded-[12px] font-inter t-text-[16px] t-font-semibold'
                >
                  {'Create Coupon'}
                </Button>
              </Spin>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  )
}

export {AddCouponModal}
