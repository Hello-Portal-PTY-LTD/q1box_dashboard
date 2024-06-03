import React, {useEffect, useState} from 'react'

import {QR_SORT, QR_TYPE} from '../../../../../mock'
import './../../../../../_metronic/partials/qrComponents/Style/style.css'
import {Button, DropdownCheckbox, Search} from '../../../../../_metronic/partials/qrComponents'
import {formatDate} from 'utils/functions'
import {useDispatch, useSelector} from 'react-redux'
import {getAllQrCodes, searchQrCodes, updateQrCode} from 'store/qrStore/qrAction'
import {message, Spin} from 'antd'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import PaginationComponent from 'app/modules/pagination/pagination'
import Qr from 'app/modules/GeneratoreBox/macros/Qr'

const CardSelectionRecycle = () => {
  const dispatch = useDispatch()
  // const [isChecked, setIsChecked] = useState(Array.from({length: cardData.length}, () => false))
  const role = localStorage.getItem('role')
  const roles = ['viewer', 'whiteLabel']
  const {qrsInfo} = useSelector((state) => state.qr)

  let offset = 0
  const [searchOptions, setSearchOptions] = useState({
    qrStatus: '',
    qrType: '',
    qrName: '',
    sortBy: '',
    searchType: 'deleted',
    offset: '',
  })
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 300)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    //-- get all qrs

    dispatch(getAllQrCodes({type: 'deleted', offset: 0}))
      .then(() => setLoader(false))
      .finally(() => setLoader(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsCheckedAll(event.target.checked)
  //   setIsChecked(Array.from({length: cardData.length}, () => event.target.checked))
  // }

  // const handleCheck = () => {
  //   // const newChecked = [...isChecked]
  //   // newChecked[index] = event.target.checked
  //   // setIsChecked(newChecked)
  //   // setIsCheckedAll(newChecked.every((c) => c))
  // }

  const handleRestore = (qrId) => {
    setLoader(true)
    dispatch(
      updateQrCode({
        qrId,
        data: {
          qrStatus: 'Active',
        },
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllQrCodes({type: 'deleted', offset: offset}))
          .then(() => setLoader(false))
          .finally(() => setLoader(false))
        message.success('Qr Restored Successfully')
        setLoader(false)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    if (searchTerm) {
      setSearchOptions((prev) => ({
        ...prev,
        qrType: searchTerm,
      }))
      dispatch(
        searchQrCodes({
          ...searchOptions,
          qrType: searchTerm,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const handleQrTypeChange = (value) => {
    setSearchTerm(value)
  }

  const handleSortChange = (value) => {
    setSearchOptions((prev) => ({
      ...prev,
      sortBy: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        sortBy: value,
      })
    )
  }

  const handleSearchChange = (value) => {
    setSearchOptions((prev) => ({
      ...prev,
      qrName: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrName: value,
      })
    )
  }
  if (loader) {
    return (
      <div className='t-w-full t-flex t-items-center t-justify-center'>
        <Spin />
      </div>
    )
  }

  const handleQrPageChange = (offset) => {
    if (
      searchOptions?.qrName ||
      searchOptions?.qrStatus ||
      searchOptions?.qrType ||
      searchOptions?.sortBy
    ) {
      dispatch(
        searchQrCodes({
          ...searchOptions,
          offset: offset,
        })
      )
    } else {
      dispatch(getAllQrCodes({type: 'Deleted', offset: offset}))
      setSearchOptions({
        qrStatus: '',
        qrType: '',
        qrName: '',
        sortBy: '',
        offset: '',
        searchType: 'deleted',
      })
    }
  }

  return (
    <div className='t-flex t-flex-col t-gap-5 t-min-w-[777px] t-h-full'>
      <div className='t-flex t-items-center t-justify-between'>
        {/* <div className='t-mr-8 xl:t-mr-12 t-flex t-items-center'>
          <Checkbox isCheckedAll={isCheckedAll} handleCheckAll={handleCheckAll} />
        </div> */}
        <div className='t-flex t-items-center t-justify-between t-gap-8 t-w-full t-pr-32'>
          <Search onChange={handleSearchChange} />
          <DropdownCheckbox onClick={handleQrTypeChange} title='QR Code Type' listItems={QR_TYPE} />
          <DropdownCheckbox onClick={handleSortChange} title='Sort By' listItems={QR_SORT} />
        </div>
      </div>
      <div className='t-flex t-flex-col gap-3 t-text-t1 t-h-full'>
        {qrsInfo?.qrs?.length > 0 ? (
          qrsInfo?.qrs?.map((card, index) => (
            <div key={card._id} className=' t-bg-white min-h-[200px]'>
              <div className=' t-flex t-flex-row t-items-center t-justify-evenly t-w-full t-text-[14px] xl:t-text-[16px] t-shadow-md t-rounded-xl'>
                {/* <img src={card?.qrImage} alt='scanQr' className='t-w-[101px]' /> */}
                <div className='t-w-[100px] t-max-w-[100px]'>
                  <Qr fromTable={true} current={card} disableReset={true} toggler={false} />
                </div>
                <div className='t-flex t-flex-col t-gap-2'>
                  <h3 className='t-text-[20px] xl:t-text-[24px] t-text-primary t-font-medium'>
                    {card.qrName}
                  </h3>
                  <p className=' t-font-medium'>Created: {formatDate(card.createdAt)}</p>
                </div>
                <p className=' t-font-small '>
                  QR Type: <span className='t-text-primary'>{card.qrType}</span>
                </p>
                <div className='t-h-[120px] t-w-[0.5px] t-bg-[#9D9DA6]' />
                <div className='t-flex t-flex-col t-gap-2'>
                  <p className=' t-font-medium'>
                    Total Scans:{' '}
                    <span className='t-text-[20px] xl:t-text-[24px]'>{card.scanCount}</span>
                  </p>
                  <p className=' t-font-medium'>https://www.google.com</p>
                </div>
                {role && !roles.includes(role) && (
                  <div className='t-h-[120px] t-w-[0.5px] t-bg-[#9D9DA6]' />
                )}
                {role && !roles.includes(role) && (
                  <div className='t-flex t-flex-col t-gap-4'>
                    <Button
                      Name='Restore'
                      Icon='/media/svg/qr_dashboard/restore.svg'
                      className='t-text-[13.28px] t-w-[130px]'
                      click={() => {
                        handleRestore(card._id)
                      }}
                    />
                  </div>
                )}
                <div></div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <PaginationComponent
        totalItems={qrsInfo?.totalRecords}
        itemsPerPage={10}
        onPageChange={(offset) => handleQrPageChange(offset)}
      />
    </div>
  )
}

export default CardSelectionRecycle
