import React, {useEffect, useRef, useState} from 'react'
import {QR_SORT, QR_STATUS, QR_TYPE, SHOW_ALL_FOLDERS} from '../../../../../mock'
import './../../../../../_metronic/partials/qrComponents/Style/style.css'
import {DropdownCheckbox, Search} from '../../../../../_metronic/partials/qrComponents'
import CardQR from './CardQR'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import {
  getAllQrCodes,
  getUserQrFolders,
  searchQrCodes,
  deleteSelectedQrCode,
} from 'store/qrStore/qrAction'
import {Empty, Spin, message} from 'antd'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import PaginationComponent from 'app/modules/pagination/pagination'
import {setQrOffset} from 'store/qrStore/qrSlice'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import * as authHelper from '../../../auth/core/AuthHelpers'

interface CardData {
  id?: number
  title?: string
  description?: string
  role?: string
}

interface Props {
  cardData: CardData[]
  setLableModal: any
}

interface searchOptions {
  qrStatus: string
  qrType: string
  qrName: string
  sortBy: string
  offset: string
}

const CardSelection: React.FC<Props> = ({cardData, setLableModal}) => {
  const {qrsInfo, loading, selectedFolder} = useSelector((state: RootState) => state.qr)
  const {templateLoading} = useSelector((state: RootState) => state.barCode)
  const dispatch = useDispatch<AppDispatch>()
  const [isChecked, setIsChecked] = useState<any[]>([])
  const [searchOptions, setSearchOptions] = useState<searchOptions>()
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 300)
  const {foldersInfo, qrLabels, offset} = useSelector((state: RootState) => state.qr)
  const [formedFolders, setFormedFolders] = useState<{label: string; value: string}[]>([])
  const [formedLabels, setFormedLabels] = useState<{label: string; value: string}[]>([])
  const [deleteAll, setDeleteAll] = useState(false)
  const [filterClear, setFilterClear] = useState(false)

  useEffect(() => {
    //-- get all qrs
    dispatch(getAllQrCodes({type: 'all', offset: 0}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      let formedData = foldersInfo?.qrFolders.map(({name, id}: any) => {
        return {
          label: name,
          value: id,
        }
      })
      formedData.unshift({label: SHOW_ALL_FOLDERS, value: SHOW_ALL_FOLDERS})
      setFormedFolders(formedData)
    }
    if (qrLabels.length > 0) {
      let formed = qrLabels.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedLabels(formed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foldersInfo?.qrFolders, qrLabels])

  // const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsCheckedAll(event.target.checked)
  //   setIsChecked(Array.from({length: cardData.length}, () => event.target.checked))
  // }

  const handleCheck = (id: any) => {
    let checkedArr: any[] = [...isChecked]
    if (checkedArr.includes(id)) {
      checkedArr = checkedArr.filter((item) => item !== id)
    } else {
      checkedArr.push(id)
    }
    setIsChecked(checkedArr)
  }

  useEffect(() => {}, [qrLabels])

  const handleStatusChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrStatus: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrStatus: value,
      })
    )
  }

  useEffect(() => {
    if (searchTerm) {
      setSearchOptions((prev: any) => ({
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

  useEffect(() => {
    if (selectedFolder) {
      dispatch(
        searchQrCodes({
          ...searchOptions,
          qrFolder: selectedFolder,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolder])

  const handleQrTypeChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleSortChange = (value: string) => {
    setSearchOptions((prev: any) => ({
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

  const handleSearchChange = (value: string) => {
    setSearchOptions((prev: any) => ({
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

  const handleFolderChange = (value: string) => {
    let Foldervalue = value === SHOW_ALL_FOLDERS ? '' : value
    setSearchOptions((prev: any) => ({
      ...prev,
      qrFolder: Foldervalue,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrFolder: Foldervalue,
      })
    )
  }

  const handleLabelChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      qrLabel: value,
    }))
    dispatch(
      searchQrCodes({
        ...searchOptions,
        qrLabel: value,
      })
    )
  }
  const handleQrPageChange = (offset: number) => {
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
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
      setSearchOptions({qrStatus: '', qrType: '', qrName: '', sortBy: '', offset: ''})
    }
    dispatch(setQrOffset(offset))
  }
  const checkAll = () => {
    if (qrsInfo.qrs?.length) {
      let qrArr: any[] = [...qrsInfo.qrs]
      if (isChecked.length === qrArr?.length) {
        setIsChecked([])
      } else {
        setIsChecked([])
        let newArr = []
        for (let i = 0; i < qrArr?.length; i++) {
          newArr.push(qrArr[i]?._id)
        }
        setIsChecked(newArr)
      }
    }
  }

  const handleDeletePost = () => {
    if (isChecked.length) {
      const afterDelete = () => {
        setDeleteAll(false)
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
        const userId = authHelper.getAuth()?.userId
        dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
      }
      updateQrStatus('QR Deleted Successfully', afterDelete)
    }
  }
  const updateQrStatus = (updateMessage: string, handleAfterDelete: any) => {
    dispatch(
      deleteSelectedQrCode({
        data: {
          qrStatus: {qrStatus: 'Deleted'},
          qrIdArr: isChecked,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(updateMessage)
        handleAfterDelete && handleAfterDelete()
      })
  }

  return (
    <Spin spinning={loading || templateLoading}>
      <div className='t-flex t-flex-col t-gap-9 '>
        {' '}
        <div className='t-grid t-grid-cols-1 500:t-grid-cols-2 lg:t-grid-cols-3 xl:t-grid-cols-4 t-gap-8  t-w-full'>
          <div className=''>
            <Search onChange={handleSearchChange} filterClear={filterClear} />
          </div>
          <div className=''>
            <DropdownCheckbox
              onClick={handleFolderChange}
              title='QR Folder'
              listItems={formedFolders}
              filterClear={filterClear}
            />
          </div>
          <div className=''>
            <DropdownCheckbox
              onClick={handleStatusChange}
              title='QR Status'
              listItems={QR_STATUS}
              filterClear={filterClear}
            />
          </div>
          <div className=''>
            <DropdownCheckbox
              onClick={handleQrTypeChange}
              title='QR Code Type'
              listItems={QR_TYPE}
              filterClear={filterClear}
            />
          </div>
          <div className=''>
            <DropdownCheckbox
              onClick={handleLabelChange}
              title='Label'
              listItems={formedLabels}
              filterClear={filterClear}
            />
          </div>
          <div className=''>
            <DropdownCheckbox
              onClick={handleSortChange}
              title='Sort By'
              listItems={QR_SORT}
              filterClear={filterClear}
            />
          </div>
          <div />
        </div>
        <div className='t-flex t-mx-4 t-gap-8 t-items-end t-justify-end t-flex-col sm:t-flex-row sm:t-items-center sm:t-gap-4'>
          <div
            onClick={() => {
              setFilterClear(!filterClear)
              setSearchOptions({
                qrStatus: '',
                qrType: '',
                qrName: '',
                sortBy: '',
                offset: '',
              })
              dispatch(getAllQrCodes({type: 'all', offset: offset}))
            }}
            className='t-flex t-gap-2 t-items-center t-cursor-pointer'
          >
            <p>Clear Filters</p>
          </div>
          <div className='t-flex t-gap-2 t-items-center'>
            <input
              type='checkbox'
              checked={qrsInfo.qrs?.length === isChecked.length && isChecked.length > 0}
              onChange={checkAll}
            />
            <p>Select All</p>
          </div>
          <div
            onClick={() => setDeleteAll(true)}
            className='t-flex t-gap-2 t-items-center t-cursor-pointer'
          >
            <div>
              <img className='t-w-8' src='/media/svg/qr_dashboard/delete.svg' alt='deleteicon' />
            </div>
            <p>Delete Selected</p>
          </div>
        </div>
        <div className='t-flex t-flex-col gap-3 t-text-t1 '>
          {qrsInfo?.qrs?.length >= 1 ? (
            qrsInfo.qrs.map((card, index) => (
              <CardQR key={index} content={card} isChecked={isChecked} handleCheck={handleCheck} />
            ))
          ) : (
            <Empty description={<p>No QRs yet</p>} />
          )}
          <PaginationComponent
            totalItems={qrsInfo?.totalRecords}
            itemsPerPage={10}
            onPageChange={(offset: number) => handleQrPageChange(offset)}
          />
        </div>
        {deleteAll && (
          <ConfirmPopUp
            message='Are you sure you want to delete this QR?'
            handleClick={handleDeletePost}
            setState={() => setDeleteAll(false)}
            btnText='Delete'
          />
        )}
      </div>
    </Spin>
  )
}

export default CardSelection

interface ConfirmPopUpProps {
  setState: (state: boolean) => void
  handleClick: () => void
  message: string
  btnText: string
}

export const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
  setState,
  handleClick,
  message,
  btnText,
}) => {
  const popUpRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(popUpRef, () => setState(false))

  return (
    <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-text-t2 t-px-3'>
      <div
        ref={popUpRef}
        className='t-bg-white t-p-7 t-w-[412px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
      >
        {/* Assuming KTSVG is a component */}
        {/* <KTSVG path='/media/svg/qr_dashboard/exclamationred.svg' className=' svg-icon-1' /> */}
        <p className='t-text-[14px] t-font-medium t-text-center'>{message}</p>
        <div className='t-flex t-items-center t-gap-6 t-w-full t-text-[16px] t-text-t1 '>
          <button
            onClick={() => setState(false)}
            type='button'
            className='t-border t-border-[#D0D5DD] t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleClick}
            className='t-border t-border-[#D92D20] t-bg-[#D92D20] t-text-white t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}
