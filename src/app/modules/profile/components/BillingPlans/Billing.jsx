import React, {useEffect, useState} from 'react'
import DetailCard from '../macros/DetailCard'
import PlainTable from '../Tables/PlainTable'
import NextBill from '../macros/NextBill'
import {useLocation, useParams} from 'react-router-dom'
import {InfoCircleOutlined} from '@ant-design/icons'
import {getTransactions} from 'store/payment/paymentAction'
import {useDispatch, useSelector} from 'react-redux'
import CurrentSubscriptionDetail from './CurrentSubscriptionDetail'
import {Spin} from 'antd'
import {Modal} from 'react-bootstrap'
import ClientCommonDetails from '../clientCommondetails'
import {calculateRemainingDays} from 'utils/functions'
const defaultpic = require('../../../../../assets/media/ava.png')

const SuccessIcon = () => (
  <svg width='100' height='100' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z'
      fill='#151520'
    />
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z'
      fill='#151520'
    />
  </svg>
)

function Billing({adminView}) {
  const columns = ['Date', 'Amount', 'Status', 'Invoice']
  const [modalInfo, setModalInfo] = useState({title: '', description: '', openModal: false})
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [transactions, setTransactions] = useState()
  const status = searchParams.get('status')

  const {id} = useParams()

  const dispatch = useDispatch()

  const {loading, billingInfo, nextInvoice, isTrialValid, trialExpirationDate, user} = useSelector(
    (state) => state.payment
  )

  const handleModalCloss = () => {
    setModalInfo({
      title: '',
      description: '',
      openModal: false,
    })
  }

  let billingAddress = billingInfo?.billingAddress

  let formattedBillingAddress = ''

  if (billingAddress) {
    formattedBillingAddress = [
      billingAddress?.line1,
      billingAddress?.line2,
      billingAddress?.city,
      billingAddress?.state,
      billingAddress?.country,
    ]
      .filter((part) => part)
      .join(', ')
  }

  useEffect(() => {}, [status])

  useEffect(() => {
    dispatch(getTransactions(id))
      .unwrap()
      .then((res) => {
        setTransactions(convertDataToRows(res.data.invoices))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const convertDataToRows = (data) => {
    return data.map((item) => {
      const date = item.date
      const amount = `$${(item.amount.amount_paid / 100).toFixed(2)}`
      const status = item.status === 'paid' ? 'Paid' : 'Pending'

      const invoiceURL = item.invoices
      return [
        date,
        amount,
        status,
        <a href={invoiceURL} target='_blank' rel='noopener noreferrer'>
          <p className='t-text-primary t-font-medium'>View</p>
        </a>,
      ]
    })
  }

  return (
    <>
      <Spin spinning={loading}>
        <div>
          {adminView && (
            <ClientCommonDetails
              user={{picture: defaultpic, ...user}}
              adminView={adminView}
              subPage={false}
            />
          )}

          {isTrialValid &&
            !adminView &&
            (billingInfo?.plan === 'Free' || billingInfo?.plan === 'FREE') && (
              <div className='t-bg-white t-flex t-items-center t-gap-2 t-px-3 t-py-3 t-rounded-md t-mb-3'>
                <InfoCircleOutlined />
                <p>
                  You are currently on a trial. Please consider upgrading to ensure you retain
                  access to your QR codes. You have{' '}
                  <span className='t-font-medium'>
                    {calculateRemainingDays(trialExpirationDate)}
                  </span>{' '}
                  days left in your trial.
                </p>
              </div>
            )}

          <div className='t-flex t-flex-col lg:t-flex-row t-gap-3 t-w-full'>
            <CurrentSubscriptionDetail
              adminView={adminView}
              modalInfo={modalInfo}
              setModalInfo={setModalInfo}
            />
            <NextBill date={nextInvoice?.starting_date} amount={nextInvoice?.amount / 100} />
          </div>
          <div className='t-flex t-flex-col lg:t-flex-row   t-gap-3  t-w-full'>
            <span className='t-w-full lg:t-w-[93%]'>
              <PlainTable
                emptyDescription='No Transaction History'
                columns={columns}
                rows={transactions}
                loading={loading}
              />
            </span>
            <div className='t-bg-white t-w-full t-rounded-md lg:t-w-[30%] t-flex t-flex-col t-gap-3'>
              <DetailCard title='Billing Address' detail={formattedBillingAddress} />
              <DetailCard title='Payment Details' detail={billingInfo?.card?.last4 || ''} />
            </div>
          </div>
        </div>
      </Spin>

      <Modal
        show={modalInfo.openModal}
        backdrop='static'
        keyboard={false}
        // onHide={() => setInfoModal(false)}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <div className='t-items-center t-flex t-flex-col t-gap-4 t-py-8'>
          <div className='t-items-center t-flex t-flex-col t-gap-8'>
            <SuccessIcon />
            <div className='t-flex t-flex-col t-gap-3 t-items-center'>
              <p className='t-text-2xl t-font-medium'>{modalInfo.title}</p>
              <p className='t-text-lg t-font-medium'>{modalInfo.description}</p>
            </div>
          </div>
          <p
            onClick={handleModalCloss}
            className='t-bg-primary t-py-2 t-px-6 t-font-medium t-cursor-pointer t-text-lg t-rounded-md t-text-white'
          >
            Ok
          </p>
        </div>
      </Modal>
    </>
  )
}

export default Billing
