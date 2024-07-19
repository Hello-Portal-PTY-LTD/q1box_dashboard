import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from 'store'
import {createPayment, updatePayment} from 'store/payment/paymentAction'
import {ConfirmBillingModal} from './confirmModal'

interface Props {
  Type?: string
  price?: string
  dynamic?: string
  scans?: string
  users?: number
  analytics?: string
  bulk?: boolean
  maxResolution?: string
  QRShapes?: boolean
  whiteLabeling?: boolean
  popular?: boolean
  buttonType?: string
  header?: boolean
  isAnnual: boolean
  yearly_price?: string | number
}

const PricingCard: React.FC<Props> = ({
  Type,
  price,
  dynamic,
  scans,
  users,
  analytics,
  bulk,
  yearly_price,
  maxResolution,
  QRShapes,
  popular,
  whiteLabeling,
  isAnnual,
  header = false,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [buttonText, setButtonText] = useState('Subscribe')
  const [confirmationModal, setConfirmationModal] = useState(false)
  const {billingInfo, loading} = useSelector((state: any) => state.payment)
  const [couponDiscount, setCouponDiscount] = useState<any>(null)

  useEffect(() => {
    if (billingInfo?.paymentStatus && billingInfo?.stripeSubscriptionStatus === 'active') {
      setButtonText('Upgrade')
    }

    console.log('called')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingInfo?.paymentStatus])

  const handleSubscribeClick = () => {
    if (!loading) {
      if (billingInfo?.stripeSubscriptionStatus === 'active') {
        dispatch(
          updatePayment({
            isAnnual,
            selectedPlan: Type,
            couponCode: couponDiscount?.id,
          })
        )
      } else {
        dispatch(
          createPayment({
            isAnnual,
            selectedPlan: Type,
            fromHomePage: false,
            couponCode: couponDiscount?.id,
          })
        )
      }
    }
  }

  return (
    <div
      className={`${
        popular ? 't-bg-[#1E1E2D] t-text-white ' : ' t-text-[#303038] '
      } flex-column  t-row t-items-center t-font-medium`}
    >
      <div className='t-relative t-px-2 lg:t-px-5 t-py-2.5 t-flex t-flex-col t-gap-2 t-items-center t-border-b t-border-gray-200 t-w-full t-h-[209px]'>
        {popular ? (
          <p className='t-m-auto t-absolute t-top-4 t-text-[#303038] t-font-semibold t-bg-white t-rounded-full t-px-3 t-py-1 t-text-[12px] lg:t-text-[14px] xl:t-text-[16px]'>
            Most Popular
          </p>
        ) : (
          ''
        )}

        <div className='t-pt-16 t-text-center md:t-pb-5'>
          <div className='t-flex-col t-items-center '>
            <h1
              className={`t-text-lg xl:t-text-2xl t-font-bold t-italic t-mb-5 font-inter ${
                popular ? 't-text-white' : ''
              } `}
            >
              {Type ? Type : 'Type '}
            </h1>
            {!header ? (
              <>
                {Type === 'Enterprise' ? (
                  <a target='_blank' href={`${process.env.REACT_APP_QR_APP}/contact-us`}>
                    <p className='t-text-md t-text-xl mt-8 cursor-pointer'>Contact us</p>
                  </a>
                ) : (
                  <div className='t-flex t-items-center t-gap-1 t-italic '>
                    <div className='t-flex t-items-start'>
                      <p className='t-text-md lg:t-text-lg'>$</p>
                      <p className='t-font-black t-text-[34px]'>
                        {isAnnual ? yearly_price : price ? price : '$$'}
                      </p>
                    </div>
                    <p className='t-text-md t-lg:text-lg'> {isAnnual ? '/yr' : '/mo'}</p>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[120px]  375:t-h-[180px] t-text-sm xl:t-text-base'>
        {Type !== 'Enterprise' ? (
          <>
            {dynamic ? (
              <p className='t-text-lg lg:t-text-2xl'>
                {dynamic} Dynamic <br />
                QR Code
              </p>
            ) : (
              <div>
                <p className='t-text-lg lg:t-text-2xl'>Dynamic QR Codes</p>
                <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal t-mt-3'>
                  {' '}
                  Alter the destination URL at your convenience while keeping the QR Code unchanged;
                  Dynamic QR Codes offer traceable capabilities
                </p>
              </div>
            )}
          </>
        ) : (
          <p className='t-text-md lg:t-text-lg'>Tiered Pricing</p>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]   t-text-sm xl:t-text-base'>
        {Type !== 'Enterprise' ? (
          <>
            {scans ? (
              <p className='t-text-xl'>
                {scans}
                <br />
                Scans
              </p>
            ) : (
              <div>
                <p className='t-text-2xl'>Scans</p>
                <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
                  Total Number of QR Code Scans that are Allowed
                </p>
              </div>
            )}
          </>
        ) : (
          <p className='t-text-lg lg:t-text-2xl'>
            Custom no.
            <br />
            of Scans
          </p>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]  375:t-h-[150px] t-text-md xl:t-text-lg'>
        {Type !== 'Enterprise' ? (
          <>
            {users ? (
              <p className='t-text-lg lg:t-text-2xl'>
                {users === 1 ? 'Single User' : `${users} Users`}
              </p>
            ) : (
              <div>
                <p className='t-text-lg lg:t-text-2xl'>Users</p>
                <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
                  Incorporate multiple users and tailor their access levels accordingly.
                </p>
              </div>
            )}
            <p></p>
          </>
        ) : (
          <p className='t-text-lg lg:t-text-2xl'>
            Custom no.
            <br />
            of Users
          </p>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]  375:t-h-[150px] t-text-md xl:t-text-lg'>
        {analytics ? (
          <p className='t-text-lg lg:t-text-2xl'>{analytics}</p>
        ) : (
          <div>
            <p className='t-text-lg lg:t-text-2xl'>Analytics</p>
            <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
              Leverage QR Code analytics for informed decision-making and improved outcomes.{' '}
            </p>
          </div>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]  375:t-h-[150px] t-text-md xl:t-text-lg'>
        {bulk === true ? (
          'Yes'
        ) : bulk === false ? (
          ''
        ) : (
          <div>
            <p className='t-text-lg lg:t-text-2xl'>Bulk Uploads</p>
            <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
              Empower your workflow with the capability to effortlessly upload and manage bulk data{' '}
            </p>
          </div>
        )}
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]  375:t-h-[150px] t-text-md xl:t-text-lg'>
        <p>
          {maxResolution ? (
            maxResolution
          ) : (
            <div>
              <p className='t-text-lg lg:t-text-2xl'>Max Download Resolution</p>
              <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
                Optimize your downloads with maximum resolution settings.{' '}
              </p>
            </div>
          )}
        </p>
      </div>
      <div className='t-border-b t-w-full t-flex t-justify-center t-text-center t-items-center t-py-3 t-border-gray-200   t-h-[100px]  375:t-h-[150px] t-text-md xl:t-text-lg'>
        <p>
          {QRShapes === true ? (
            'Yes'
          ) : QRShapes === false ? (
            ''
          ) : (
            <div>
              <p className='t-text-lg lg:t-text-2xl'>QR Shapes</p>
              <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal	'>
                Elevate your QR codes with distinctive shapes for a truly unique touch that captures
                attention.
              </p>
            </div>
          )}
        </p>
      </div>
      <div className=' t-w-full t-flex t-justify-center t-text-center t-items-center t-py-5    t-h-[150px]  375:t-h-[190px] t-text-sm xl:t-text-base'>
        {whiteLabeling === true ? (
          'Yes'
        ) : whiteLabeling === false ? (
          ''
        ) : (
          <div>
            <p className='t-text-lg lg:t-text-2xl t-pt-10'>White Labeling Domain</p>
            <p className='t-text-[#52565B] sm-text-xs md:t-text-md xl:t-text-lg t-font-normal'>
              Unlock new business horizons with our white labeling services. Seamlessly integrate
              our cutting-edge products expand your offerings swiftly and efficiently.
            </p>
          </div>
        )}
      </div>

      {!header &&
        !(
          billingInfo?.paymentStatus &&
          ((isAnnual && billingInfo?.isAnnualPurchase) ||
            (!isAnnual && !billingInfo?.isAnnualPurchase)) &&
          billingInfo?.plan === Type?.toUpperCase()
        ) && (
          <>
            {Type === 'Enterprise' ? (
              <div className='t-w-full t-flex t-justify-center t-text-center t-items-center t-h-[72px] md:t-h-[110px] t-py-3 t-px-3'>
                <a target='_blank' href={`${process.env.REACT_APP_QR_APP}/contact-us`}>
                  <button
                    type='button'
                    className={`${
                      popular
                        ? 't-text-black t-bg-white t-rounded-full t-border t-border-white'
                        : 't-text-black t-bg-white t-rounded-full t-border t-border-black '
                    } t-px-2 xl:t-px-8 t-py-2 xl:t-py-3 t-font-semibold t-text-[14px] lg:t-text-[16px] font-IBM`}
                  >
                    Contact Us
                  </button>
                </a>
              </div>
            ) : (
              <div className='t-w-full t-flex t-justify-center t-text-center t-items-center t-h-[72px] md:t-h-[110px] t-py-3 t-px-3'>
                <button
                  type='button'
                  onClick={() => setConfirmationModal(true)}
                  className={`${
                    popular
                      ? 't-text-black t-bg-white t-rounded-full t-border t-border-white'
                      : 't-text-black t-bg-white t-rounded-full t-border t-border-black '
                  } t-px-2 xl:t-px-8 t-py-2 xl:t-py-3 t-font-semibold t-text-[14px] lg:t-text-[16px] font-IBM`}
                >
                  {buttonText}
                </button>
              </div>
            )}
          </>
        )}

      <div>
        <ConfirmBillingModal
          show={confirmationModal}
          handleClose={() => {
            setConfirmationModal(false)
            setCouponDiscount(null)
          }}
          handleSubmit={handleSubscribeClick}
          setCouponDiscount={setCouponDiscount}
          couponDiscount={couponDiscount}
          data={{
            Type,
            price,
            dynamic,
            scans,
            users,
            analytics,
            bulk,
            yearly_price,
            maxResolution,
            QRShapes,
            popular,
            whiteLabeling,
            isAnnual,
          }}
        />
      </div>
    </div>
  )
}

export default PricingCard
