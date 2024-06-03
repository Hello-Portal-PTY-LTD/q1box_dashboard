import {toAbsoluteUrl} from '_metronic/helpers'
import {Spin} from 'antd'
import PaginationComponent from 'app/modules/pagination/pagination'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useNavigate} from 'react-router-dom'
import {RootState} from 'store'
import {getSubscriptionById} from 'store/payment/allSubscriptionsAction'
import ClientCommonDetails from '../../clientCommondetails'
import CopyText from '../../macros/CopyText'
import PlainTable from '../../Tables/PlainTable'
export default function SubscriptionDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [invoices, setInvoices] = useState()
  const searchParams = new URLSearchParams(location.search)
  const id = searchParams.get('id')
  const subscription_detail = useSelector(
    (state: RootState) => state.subscriptions.subscription_detail
  )
  const {loading} = useSelector((state: RootState) => state.subscriptions)
  const COLUMNS = ['Date', 'Amount', 'Status', 'Action']

  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionById({id}))
        .unwrap()
        .then((res: any) => {
          setInvoices(convertDataToRows(res?.invoices))
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const convertDataToRows = (data: any) => {
    return data.map((item: any) => {
      const date = item.startDate
      const amount = `$${item.amount}`
      const status = item.status === true ? 'Paid' : 'Pending'
      const invoiceURL = item.invoice
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
    <div className=' '>
      <Spin spinning={loading}>
        <div className=' t-w-full'>
          <div className='t-flex t-justify-between t-bg-white t-rounded-md t-p-4 t-mb-5'>
            <h2 className='t-text-2xl t-font-bold'>Subscription Details</h2>
            <img
              alt='img'
              className='t-cursor-pointer'
              src={toAbsoluteUrl('/media/svg/qr_dashboard/cross.svg')}
              height={12}
              width={12}
              onClick={() => {
                navigate(`/super-Q1box-admin-gate24/subscriptions`)
              }}
            />{' '}
          </div>

          <ClientCommonDetails
            user={{
              picture:
                subscription_detail?.picture || require('../../../../../../assets/media/ava.png'),
              Sub_id: (
                <CopyText
                  toolTipTitle='Copy Subscription Title'
                  textToCopy={subscription_detail?.id}
                />
              ),
              name: subscription_detail?.user,
              email: subscription_detail?.email,
              subscription: subscription_detail?.planName,
              startDate: subscription_detail?.startDate,
              endDate: subscription_detail?.endDate,
              status: subscription_detail?.status ? 'Paid' : 'Unpaid',
            }}
            subPage={true}
            adminView={true}
          />
        </div>
        <PlainTable columns={COLUMNS} rows={invoices} emptyDescription='No invoices Found' />
        <PaginationComponent totalItems={10} itemsPerPage={10} onPageChange={() => {}} />
      </Spin>
    </div>
  )
}
