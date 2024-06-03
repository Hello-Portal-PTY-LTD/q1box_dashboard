/* eslint-disable jsx-a11y/anchor-is-valid */

import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
import {useEffect, useState} from 'react'
import {Spin} from 'antd'
import PaginationComponent from 'app/modules/pagination/pagination'
import {AddCouponModal} from './addCouponModal'
import {getCoupons} from 'store/dicountCoupon/discountCouponAction'
import {Button} from '_metronic/partials/qrComponents'
import moment from 'moment'

export function DiscountCoupon() {
  const dispatch = useDispatch<AppDispatch>()
  const [currentOffset, setCurrentOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hardRefetch, setHardRefetch] = useState(false)
  const [addCouponModal, setAddCouponModal] = useState(false)
  const [couponData, setCouponData] = useState({count: 0, allCoupon: []})

  useEffect(() => {
    handleGetCoupons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOffset, hardRefetch])

  const handleGetCoupons = () => {
    setLoading(true)
    dispatch(getCoupons({isDeleted: true, offset: currentOffset}))
      .unwrap()
      .then((res: any) => {
        setCouponData(res)
        setLoading(false)
      })
  }

  const handlePageChange = (offset: number) => {
    setCurrentOffset(offset)
  }

  const tableRowCellClass = 't-px-4 t-py-7 t-text-center'

  let unixTimeConvert = (unixTime: any) => {
    const dateTime = moment.unix(unixTime)
    const formattedDateTime = dateTime.format('DD MMMM YYYY hh:mm:ss')
    return formattedDateTime
  }

  return (
    <div className='t-flex t-flex-col t-gap-8 t-h-full'>
      <div>
        <h3 className='t-font-bold t-my-2 t-text-[24px]'>Discount Coupon</h3>
      </div>
      <div>
        <Button Name='Create Coupon' click={() => setAddCouponModal(true)} />
      </div>
      <div className='t-rounded-[20px] t-overflow-x-scroll'>
        <Spin spinning={loading}>
          <table
            className='t-rounded-xl t-table-auto t-w-full  t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
            style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
          >
            <thead className='t-rounded-xl '>
              <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                <td className={tableRowCellClass}>ID</td>
                <td className={tableRowCellClass}>Name</td>
                <td className={tableRowCellClass}>Created At</td>
                <td className={tableRowCellClass}>Expire</td>
                <td className={tableRowCellClass}>Max Redemptions</td>
                <td className={tableRowCellClass}>Duration</td>
                <td className={tableRowCellClass}>Duration in Months</td>
                <td className={tableRowCellClass}>Discount Percent</td>
                <td className={tableRowCellClass}>Discount Amount</td>
                <td className={tableRowCellClass}>Coupon For</td>
                <td className={tableRowCellClass}>Coupon For Plan</td>
                <td className={tableRowCellClass}>Coupon For Email</td>
                <td className={tableRowCellClass}>Redemptions</td>
              </tr>
            </thead>

            <tbody className='t-rounded-xl t-bg-white '>
              {couponData?.allCoupon?.length > 0 &&
                couponData?.allCoupon?.map((items: any, index: number) => {
                  return (
                    <tr key={items._id}>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.id ? `${items.id}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.name ? `${items.name}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.createdAt ? `${unixTimeConvert(items.created)}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.redeem_by ? `${unixTimeConvert(items.redeem_by)}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.max_redemptions ? `${items.max_redemptions}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.duration ? `${items.duration}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.duration_in_months ? `${items.duration_in_months}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.percent_off ? `${items.percent_off}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.amount_off ? `${items.amount_off}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.couponFor ? `${items.couponFor}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.couponForPlan ? `${items.couponForPlan}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.couponForEmail ? `${items.couponForEmail}` : 'N/A'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {items.redemptions === 0 || items?.redemptions
                          ? `${items?.redemptions}`
                          : 'N/A'}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </Spin>
        <PaginationComponent
          totalItems={couponData?.count}
          currentPage={currentOffset ? currentOffset / 10 + 1 : currentOffset}
          itemsPerPage={10}
          onPageChange={(offset: number) => handlePageChange(offset)}
        />
      </div>
      <AddCouponModal
        show={addCouponModal}
        handleClose={() => {
          setAddCouponModal(false)
          setHardRefetch(hardRefetch)
        }}
        handleGetCoupons={handleGetCoupons}
      />
    </div>
  )
}

export default DiscountCoupon
