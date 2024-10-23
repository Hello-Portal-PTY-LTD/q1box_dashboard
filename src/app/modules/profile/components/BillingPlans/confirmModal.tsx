import React, {useState} from 'react'
import {Modal, Spin, message} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

const {axiosInstance} = require('../../../../../axios/index')

interface Props {
  show: boolean
  handleClose: () => void
  handleSubmit: () => void
  data: any
  setCouponDiscount: any
  couponDiscount: any
  loading: boolean

  // Add more props as needed
}
const antIcon = (
  <LoadingOutlined
    rev={undefined}
    style={{
      fontSize: 20,
    }}
    spin
  />
)
const ConfirmBillingModal: React.FC<Props> = ({
  show,
  handleClose,
  handleSubmit,
  data,
  setCouponDiscount,
  couponDiscount,
  loading,
}) => {
  const [inputCouponCode, setInputCouponCode] = useState('')
  const [couponDiscountLoading, setCouponDiscountLoading] = useState(false)
  const closeModal = (): void => {
    handleClose()
    setCouponDiscount(null)
    setInputCouponCode('')
    let inputElement: HTMLInputElement | null = document.getElementById(
      'couponfield'
    ) as HTMLInputElement
    // Check if the element exists
    if (inputElement !== null) {
      // Set the value of the input field to an empty string
      inputElement.value = ''
    }
  }

  const handleApllyCoupon = () => {
    if (inputCouponCode) {
      setCouponDiscountLoading(true)
      axiosInstance
        .post('/coupon/check-coupon-validity', {
          couponCode: inputCouponCode,
          selectedPlan: data.Type,
        })
        .then((res: any) => {
          setCouponDiscount(res?.coupon)
          let msg = res?.message || 'Coupon Accepted'
          message.success(msg)
        })
        .catch((err: any) => {
          console.log(err?.data?.message)
          const error =
            err?.data?.message || err?.error?.response?.data.message || 'Something Happened'
          message.error(error)
        })
        .finally(() => {
          setCouponDiscountLoading(false)
        })
    }
  }

  let pkgPrice = data?.isAnnual ? data?.yearly_price : data?.price
  // data?.isAnnual ? (pkgPrice * 0.1).toFixed(2) : 0

  let discountedPrice = couponDiscount
    ? pkgPrice -
      (couponDiscount?.percent_off
        ? (couponDiscount?.percent_off / 100) * pkgPrice
        : couponDiscount?.amount_off / 100)
    : pkgPrice

  console.log(discountedPrice, 'discountedPrice')

  return (
    <Modal width={500} onCancel={closeModal} footer={false} closeIcon={true} open={show}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>{'Bill Confirmation'}</h5>
        </div>

        <div className='t-my-6'>
          <div className='t-mb-3'>
            <p className='t-text-[18px] t-font-semibold'>
              Buy Plan &nbsp;&nbsp;
              <span
                style={{color: 'green', border: '1px solid #d9d9d9', borderRadius: '8px'}}
                className='t-px-2'
              >
                {data?.isAnnual ? 'Annualy' : 'Monthly'}
              </span>
            </p>
          </div>
          <div className='t-mb-4'>
            <div className='t-flex t-justify-between'>
              <p className='t-font-semibold'>Apply Coupon</p>
              <input
                id='couponfield'
                onChange={(e) => setInputCouponCode(e?.target?.value)}
                className='t-px-3'
                style={{border: '1px solid #d9d9d9', borderRadius: '4px'}}
              />
              <button
                style={{border: '1px solid #d9d9d9', borderRadius: '4px'}}
                className='t-cursor-pointer px-2'
                onClick={handleApllyCoupon}
              >
                {couponDiscountLoading ? 'loading...' : 'Apply'}
              </button>
            </div>

            {couponDiscount && (
              <ul
                style={{
                  marginTop: '10px',
                  textAlign: 'start',
                  padding: '1rem',
                  color: 'gray',
                }}
              >
                <li>
                  If you have already applied a coupon and upgrade to the same plan, the coupon will
                  still be applied.
                </li>
                <li>
                  If you apply another coupon, the previous coupon will be replaced with the new
                  coupon.
                </li>
                <li>If you change the plan, the coupon will be removed</li>
              </ul>
            )}
          </div>

          <hr />
          <div className='t-mt-3'>
            <div className='t-flex t-justify-between'>
              <p className='t-font-semibold'>Plan Type:</p>
              <p>{data?.Type}</p>
            </div>
            <div className='t-flex t-justify-between'>
              <p className='t-font-semibold'>Price:</p>
              <p>{pkgPrice}$</p>
            </div>
            {couponDiscount && (
              <>
                <div className='t-flex t-justify-between'>
                  <p className='t-font-semibold'>Coupon Discount:</p>
                  <p>
                    -
                    {couponDiscount?.percent_off
                      ? couponDiscount?.percent_off
                      : couponDiscount?.amount_off / 100}
                    {couponDiscount?.percent_off ? '%' : '$'}
                  </p>

                  <p>
                    -
                    {couponDiscount?.percent_off
                      ? ((couponDiscount?.percent_off / 100) * pkgPrice).toFixed(2)
                      : couponDiscount?.amount_off / 100}
                    $
                  </p>
                </div>
              </>
            )}

            {data?.isAnnual && (
              <>
                <div className='t-flex t-justify-between'>
                  <p className='t-font-semibold'>Annual Discount:</p>
                  <p>10%</p>
                  <p>-{(pkgPrice * 0.1).toFixed(2)} $</p>
                </div>
              </>
            )}
            <div className='t-flex t-justify-between'>
              <p className='t-font-semibold'>Total:</p>
              <p>{(discountedPrice - (data?.isAnnual ? pkgPrice * 0.1 : 0)).toFixed(2)}$</p>
            </div>
          </div>
        </div>
        <div className='t-flex t-justify-end'>
          <button
            style={{
              border: '2px solid #1e1e2d',
              padding: '5px 15px',
              borderRadius: '12px',
              background: '#1e1e2d',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
            }}
            onClick={handleSubmit}
          >
            {loading && <Spin style={{color: '#ffff'}} indicator={antIcon} />}
            Buy
          </button>
        </div>
      </div>
    </Modal>
  )
}

export {ConfirmBillingModal}
