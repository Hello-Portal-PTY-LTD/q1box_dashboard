import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {cancelSubscription} from 'store/payment/paymentAction'

function CurrentSubscriptionDetail({modalInfo, setModalInfo, adminView}) {
  const {billingInfo, transactions, isTrialValid, trialExpirationDate} = useSelector(
    (state) => state.payment
  )

  const dispatch = useDispatch()

  const handleCancelSubscription = () => {
    dispatch(cancelSubscription(billingInfo?.sub_id))
      .unwrap()
      .then((res) => {
        setModalInfo({
          title: 'We Got Your Cancellation Request',
          description: `Your Current Subscription Valid Until ${res?.cancellationDate}`,
          openModal: res.appliedToCancel,
        })
      })
  }
  return (
    <div className='col-12 col-md-12 col-xl-9'>
      <div className='card bg-default-light t-relative border-0 t-py-3 mb-4'>
        <div className='border-0 bg-none t-pl-4'>
          <h5 className=' text-primary-color  t-text-2xl t-font-bold mt-3'>
            {adminView ? '' : 'Your'} Subscription
          </h5>
        </div>
        <div className='p-3'>
          <div className='bg-default border-0'>
            <div className='t-bg-blue-200 t-rounded-md t-p-4'>
              <div className='row'>
                <div className='col mb-3'>
                  <h3 className='fw-bold'>
                    {billingInfo?.plan === 'Free' ? 'Starter' : billingInfo?.plan}{' '}
                  </h3>
                  <p className='t-text-lg'>
                    {adminView ? 'User is on' : "You're on"} the{' '}
                    {billingInfo?.plan === 'Free'
                      ? 'Starter Trial Period.'
                      : billingInfo?.plan + ' plan'}{' '}
                  </p>
                </div>
                <div className='col-12 col-md-auto mb-3 text-md-end'>
                  <h3 className='fw-bold'>{billingInfo?.amount || 0} $</h3>
                  {isTrialValid && billingInfo?.plan === 'Free' ? (
                    <p className='t-text-lg'>Free trial until {trialExpirationDate}</p>
                  ) : (
                    <p className='t-text-lg'>Last updated {transactions[0]?.date}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!adminView && (
          <div className='card-footer border-0 bg-none'>
            <p className='text-center t-text-lg mb-3'>
              Looking to upgrade your plan?{' '}
              <Link to='/dashboard/plans' className='t-text-primary t-font-semibold'>
                View all plans
              </Link>
            </p>
          </div>
        )}
        {!adminView && billingInfo?.plan !== 'Free' && !billingInfo?.appliedToCancel && (
          <span className='t-absolute t-right-3 t-bottom-2'>
            <p
              onClick={handleCancelSubscription}
              className='float-right t-bg-white t-cursor-pointer t-py-3 t-px-2 t-rounded-md   t-text-center t-text-primary hover:!t-bg-gray-100 t-w-[100px]'
            >
              Cancel
            </p>
          </span>
        )}
      </div>
    </div>
  )
}

export default CurrentSubscriptionDetail
