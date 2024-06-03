/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {QR_PRICING} from '../../../../../mock'
import PricingCard from './PricingCard'
// import imgae from '../../../../../assets/media/save10.png'
import {images} from '../../../../../assets'
import Toggle from '../../../../../_metronic/partials/qrComponents/Toggle'
import {getTransactions} from 'store/payment/paymentAction'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
export function BillingPlans() {
  const [isAnnual, setIsAnnual] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTransactions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const goToBilling = () => {
    navigate('/dashboard/billing')
  }
  return (
    <div className='t-flex t-flex-col t-gap-3 t-items-start'>
      <p
        onClick={goToBilling}
        className='t-text-[#1E1E2D] t-text-xl t-cursor-pointer t-font-semibold'
      >
        <span className='t-mr-2'>&#8592;</span>
        Back to billing
      </p>
      <section className=' layout-container px-[20px] lg:px-[80px] xl:px-[121px] t-text-[#303038]'>
        <div className='t-bg-white t-shadow-md t-px-[15px] sm:t-px-[34px] t-py-10 t-flex t-flex-col t-items-center t-rounded-xl '>
          <div className='t-flex t-flex-col t-gap-3 t-text-center t-justify-center'>
            <p className='t-text-[32px] t-font-bold'>Payment Plans</p>
            <p className='t-text-[16px]'>Choose a plan that's right for you</p>
            <div className='t-flex t-justify-around t-items-center t-gap-3 t-relative'>
              <p className='breif t-text-[16px]'>Pay Monthly</p>
              <Toggle
                setvalue={(e: any) => {
                  setIsAnnual(e)
                }}
              />
              <div className='t-relative t-flex t-justify-center'>
                <p className='breif t-text-[16px]'>Pay Annual</p>

                <img
                  src={images.underline}
                  alt='underline'
                  width={200}
                  height={200}
                  className='t-w-20 t-absolute -t-bottom-4 t-hidden lg:t-block'
                />
              </div>
              <img
                src={images.save10}
                alt='save25Percent'
                width={180}
                height={180}
                className='t-hidden lg:t-block t-absolute -t-right-56 -t-bottom-5'
              />
            </div>
          </div>

          <div className=' t-w-full t-overflow-auto'>
            <div className='t-w-full t-h-[1px] t-bg-gray-200 t-mt-12' />
            <div className='t-grid t-grid-cols-6 t-min-w-[700px]'>
              {QR_PRICING.map((item, key) => {
                return <PricingCard isAnnual={isAnnual} {...item} key={key} />
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
