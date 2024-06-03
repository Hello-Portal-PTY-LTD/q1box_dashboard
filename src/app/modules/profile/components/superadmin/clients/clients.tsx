import {useEffect, useState} from 'react'
import {DropdownCheckbox, Search2} from '../../../../../../_metronic/partials/qrComponents'
import {PLANS} from '../../../../../../mock'

import {useDispatch, useSelector} from 'react-redux'

import {RootState} from 'store'
import {useDebounceSearch} from 'hooks/useDebounceSearch'
import {Switch} from 'antd'
import {useNavigate} from 'react-router-dom'
import {getAllUsers, updateUser} from 'store/userStore/userActions'
import PaginationComponent from 'app/modules/pagination/pagination'

import PlainTable from '../../Tables/PlainTable'
import CopyText from '../../macros/CopyText'
import ActionIcon from '../../macros/ActionIcon'

interface searchOptions {
  planName: string
  status: string
  search: string
}

export function AllClients() {
  const [searchTerm, setSearchTerm] = useDebounceSearch('', 50)

  const dispatch = useDispatch()
  const {users} = useSelector((state: RootState) => state.user)
  const {list, pagination} = users

  const [searchOptions, setSearchOptions] = useState<searchOptions>()
  const [clients, setClients] = useState<
    {
      id: number
      firstName: string
      lastName: string
      subscriptionId: string
      email: string
      subscriptionBlockedByAdmin: boolean
    }[]
  >([])

  useEffect(() => {
    if (list.length > 0) {
      setClients(convertDataToRows(list))
    } else {
      setClients([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list?.length, list])

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllUsers({}))
      .unwrap()
      .then((res: any) => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    setSearchOptions((prev: any) => ({
      ...prev,
      search: searchTerm,
    }))
    dispatch(
      getAllUsers({
        ...searchOptions,
        search: searchTerm,
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  const COLUMNS = ['User Name', 'Email', 'Subscription', 'Status', 'Action']

  const convertDataToRows = (list: any) => {
    return list?.map((item: any) => {
      const userName = item?.firstName + ' ' + item?.lastName
      const email = item?.email

      return [
        userName,
        email,
        item?.subscription?.subscriptionId && (
          <CopyText
            toolTipTitle='Copy Subscription Id'
            textToCopy={item?.subscription?.subscriptionId}
          />
        ),
        <Switch
          checked={!item?.isBlocked}
          onChange={() => {
            handleUserStatusChange(item?._id, item?.isBlocked)
          }}
          checkedChildren='Active'
          unCheckedChildren='Blocked'
          style={{
            backgroundColor: item?.isBlocked ? '#FF6461' : '#55B659',
          }}
        />,
        <ActionIcon
          onClick={() => navigate(`/super-Q1box-admin-gate24/clients/details/${item?._id}`)}
        />,
      ]
    })
  }

  const status = [
    {label: 'Active', value: 'false'},
    {label: 'Block', value: 'true'},
  ]

  const handlePageChange = (offset: number) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      offset: offset,
    }))
    dispatch(
      getAllUsers({
        ...searchOptions,
        offset: offset,
      })
    )
  }

  const handlePlanChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      plan: value,
    }))
    dispatch(
      getAllUsers({
        ...searchOptions,
        plan: value,
      })
    )
  }

  const handleStatusChange = (value: string) => {
    setSearchOptions((prev: any) => ({
      ...prev,
      status: value,
    }))
    dispatch(
      getAllUsers({
        ...searchOptions,
        blocked: value,
      })
    )
  }

  const handleUserStatusChange = (id: string, value: boolean) => {
    dispatch(updateUser({id: id, isBlocked: !value}))
  }
  return (
    <div className='t-relative t-flex t-h-full t-justify-center t-w-full t-overflow-hidden'>
      <div className=' t-w-full t-bg-white t-shadow-lg t-border t-py-4 t-px-4 500:t-px-8 sm:t-px-12 t-rounded-lg t-text-t2 '>
        <div className='t-flex t-flex-col md:t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3 md:t-px-5'>
          <h3 className='t-font-bold t-my-2 t-text-[18.7px]'>Clients</h3>

          <div className='t-flex t-flex-col t-items-center 500:t-flex-row t-gap-3 md:t-gap-6 t-my-2  t-w-full 500:t-w-auto'>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <Search2
                placeholder='Search Client'
                height='t-h-[45px]'
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <DropdownCheckbox onClick={handlePlanChange} listItems={PLANS} title='Subscription' />
            </div>
            <div className='t-w-full 500:t-w-[205px] font-inter'>
              <DropdownCheckbox onClick={handleStatusChange} listItems={status} title='Status' />
            </div>
          </div>
        </div>

        <PlainTable
          disableTitle={true}
          columns={COLUMNS}
          rows={clients}
          emptyDescription='No Clients Found'
        />

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
