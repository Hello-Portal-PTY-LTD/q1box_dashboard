import {useEffect, useState} from 'react'
import {DropdownCheckbox} from '../../../../../../_metronic/partials/qrComponents'
import {IS_SUPER_OR_SUPER_ACTING_ADMIN, PLANS} from '../../../../../../mock'
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {Spin, Switch, message} from 'antd'
import {useNavigate} from 'react-router-dom'
import PaginationComponent from 'app/modules/pagination/pagination'
import {getAllSubscriptions} from 'store/payment/allSubscriptionsAction'
import PlainTable from '../../Tables/PlainTable'
import ActionIcon from '../../macros/ActionIcon'
import CopyText from '../../macros/CopyText'
import {pauseResumeSubscription} from 'store/payment/paymentAction'

interface searchOptions {
  planName: string
  status: string
  search: string
}
export function AllSubscriptions() {
  const dispatch = useDispatch()
  const [searchOptions, setSearchOptions] = useState<searchOptions>()
  const [subscriptions, setSubscriptions] = useState()

  const navigate = useNavigate()
  const {pagination} = useSelector((state: RootState) => state.subscriptions.allSubscriptions)
  const {user} = useSelector((state: RootState) => state.auth)

  const {loading} = useSelector((state: RootState) => state.subscriptions)
  useEffect(() => {
    dispatch(getAllSubscriptions({}))
      .unwrap()
      .then((res: any) => {
        setSubscriptions(convertDataToRows(res?.subscriptions))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (offset: number) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      offset: offset,
    }))
    dispatch(
      getAllSubscriptions({
        ...searchOptions,
        offset: offset,
      })
    )
      .unwrap()
      .then((res: any) => {
        setSubscriptions(convertDataToRows(res?.subscriptions))
      })
  }

  const handlePlanChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      planName: value,
    }))
    dispatch(
      getAllSubscriptions({
        ...searchOptions,
        planName: value,
      })
    )
      .unwrap()
      .then((res: any) => {
        setSubscriptions(convertDataToRows(res?.subscriptions))
      })
  }

  const status = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Pause', value: 'PAUSED'},
  ]

  const handleFilterStatus = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      status: value,
    }))
    dispatch(
      getAllSubscriptions({
        ...searchOptions,
        status: value,
      })
    )
      .unwrap()
      .then((res: any) => {
        setSubscriptions(convertDataToRows(res?.subscriptions))
      })
  }

  const convertDataToRows = (data: any) => {
    return data?.map((item: any) => {
      const userName = item?.userName
      const amount = '$' + item?.amount
      const startDate = item?.startDate
      const endDate = item?.endDate

      return [
        userName,
        <CopyText toolTipTitle='Copy Subscription Id' textToCopy={item?.subscription} />,
        amount,
        startDate,
        endDate,
        <Switch
          checked={item?.pauseCollection === ''}
          onChange={() => {
            const type = item.pauseCollection === 'void' ? 'RESUME' : 'PAUSE'
            dispatch(
              pauseResumeSubscription({
                type: type,
                id: item.subscription,
                userId: item.userId,
              })
            )
              .unwrap()
              .then(() => {
                if (type === 'RESUME') {
                  message.success('Successfully subscription resumed')
                } else if (type === 'PAUSE') {
                  message.success('Successfully subscription paused')
                }
                dispatch(
                  getAllSubscriptions({
                    ...searchOptions,
                  })
                )
                  .unwrap()
                  .then((res: any) => {
                    setSubscriptions(convertDataToRows(res?.subscriptions))
                  })
              })
              .catch((error: any) => {
                message.error('Error occurred while updating subscription')
              })
          }}
          disabled={!IS_SUPER_OR_SUPER_ACTING_ADMIN(user?.role)}
          checkedChildren='Active'
          unCheckedChildren='Paused'
          style={{backgroundColor: item?.pauseCollection === '' ? '#55B659' : '#FF6461'}}
        />,
        <ActionIcon
          onClick={() => {
            navigate(`/super-Q1box-admin-gate24/subscriptions/details?id=${item?.subscription}`)
          }}
        />,
      ]
    })
  }

  const COLUMNS = [
    'User Name',
    'Subscriptions',
    'Amount',
    'Start Date',
    'End Date',
    'Status',
    'Action',
  ]

  return (
    <div className='t-relative t-flex t-h-full t-justify-center t-w-full t-overflow-scroll'>
      <div className=' t-w-full t-bg-white t-shadow-lg t-border t-py-4 t-px-4 500:t-px-8 sm:t-px-12 t-rounded-lg t-text-t2'>
        <Spin spinning={loading}>
          <div className='t-flex t-flex-col md:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3 md:t-px-5'>
            <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Subscriptions </h3>
            <div className='t-flex t-flex-col 500:t-flex-row t-gap-3 md:t-gap-6 t-my-2  t-w-full 500:t-w-auto'>
              <div className='t-w-full 500:t-w-[205px] font-inter'>
                <DropdownCheckbox
                  listItems={PLANS}
                  title='Subscription'
                  onClick={handlePlanChange}
                />
              </div>
              <div className='t-w-full 500:t-w-[205px] font-inter'>
                <DropdownCheckbox onClick={handleFilterStatus} listItems={status} title='Status' />
              </div>
            </div>
          </div>
          <PlainTable
            columns={COLUMNS}
            rows={subscriptions}
            disableTitle={true}
            emptyDescription={'No subscription Found'}
          />
        </Spin>

        <PaginationComponent
          totalItems={pagination?.totalRecords}
          currentPage={pagination?.currentPage}
          itemsPerPage={10}
          onPageChange={(offset: number) => handlePageChange(offset)}
        />
      </div>
    </div>
  )
}
