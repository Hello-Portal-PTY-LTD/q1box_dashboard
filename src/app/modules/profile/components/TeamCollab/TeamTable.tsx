import {Tag, message} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {format, parseISO} from 'date-fns'
import './TeamTable.css'
import {handleAccess} from 'utils/functions'
import {useDispatch, useSelector} from 'react-redux'
import {getTeamMembers, updateMember} from 'store/teamStore/teamAction'
import PaginationComponent from 'app/modules/pagination/pagination'
import {RootState} from 'store'
import {Switch,Tooltip} from 'antd'
import {useOnClickOutside} from 'hooks/useOnClickOutside'
import {KTSVG} from '_metronic/helpers'

const {axiosInstance} = require('../../../../../axios/index')
interface TableProps {
  currentOffset: number
  setCurrentOffset: any
  actionclick: (user: any, action: string) => void
}

const TeamTable: React.FC<TableProps> = ({currentOffset, setCurrentOffset, actionclick}) => {
  const dispatch = useDispatch()
  const {team} = useSelector((state: RootState) => state.team)
  const user = useSelector((state: RootState) => state.auth.user)
  const {billingInfo} = useSelector((state: any) => state.payment)
console.log({billingInfo})
  const [SSoEnableLoading, SetSSoEnableLoading] = useState({bool: false, email: ''})
  const [edit, setEdit] = useState(false)

  const {pagination, list} = team
  const optionsRef = useRef<HTMLUListElement | null>(null)

  useOnClickOutside(optionsRef, () => setEdit(false))

  const handleToggleChange = (isBlocked: boolean, id: string) => {
    const data = {id: id, isBlocked: !isBlocked}
    dispatch(updateMember(data))
      .unwrap()
      .then(() => {})
      .catch((error: any) => {
        console.log('error updating user Status: ', error)
      })
  }

  useEffect(() => {
    dispatch(getTeamMembers({isDeleted: false, offset: currentOffset}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (offset: number) => {
    setCurrentOffset(offset)
    dispatch(getTeamMembers({isDeleted: false, offset: offset}))
  }

  const HandleSSOEnable = (value: boolean, email: string, fullName: string) => {
    if (user?.role === 'admin' && billingInfo?.plan === 'PROFESSIONAL') {
      SetSSoEnableLoading({bool: true, email: email})
      let data = {
        azureSSOEnables: !value,
        email: email,
        fullName: fullName,
      }
      axiosInstance
        .post('/users/azure-user-create', data)
        .then((res: any) => {
          let msg = res?.data?.data || res?.data || 'Successfully!'
          if (res?.data !== 'Status change') message.success(msg)
          console.log(res?.data)
        })
        .catch((err: any) => {
          let msg = err?.response?.data?.data || err?.response?.data || 'Error!'
          message.error(msg)
          console.log(err)
        })
        .finally(() => {
          SetSSoEnableLoading({bool: false, email: ''})
          dispatch(getTeamMembers({isDeleted: false, offset: currentOffset}))
        })
    }
  }

  return (
    <>
      <table
        className='t-rounded-xl  t-table-auto t-w-full  t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
        style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
      >
        <thead className='t-rounded-xl '>
          <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
            <td className='t-px-4 t-py-7 t-text-center t-rounded-tl-lg '>Full Name</td>
            <td className='t-px-4 t-py-7 t-text-center  '>Email</td>
            <td className='t-px-4 t-py-7 t-text-center  '>Permission</td>
            <td className='t-px-4 t-py-7 t-text-center  '>Status</td>
            {/* <td className='t-px-4 t-py-7 t-text-center  '>SSO</td> */}
            <td className='t-px-4 t-py-7 t-text-center t-rounded-tr-lg '>SSO</td>
            <td className='t-px-4 t-py-7 t-text-center t-rounded-tr-lg '>Joining Date</td>
            <td className='t-px-4 t-py-7 t-text-center t-rounded-tr-lg '>Action</td>
          </tr>
        </thead>
        <tbody className='t-rounded-xl t-bg-white '>
          {list?.length > 0 &&
            list?.map((row: any, index: number) => (
              <tr key={row.id} className='t-rounded-xl'>
                <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                  {row?.firstName + ' ' + row?.lastName}
                </td>

                <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                  <Tag color='blue' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                    {row.email}
                  </Tag>
                </td>
                <td className='t-border-b t-px-4 t-py-7 t-text-center  t-relative t-align-middle t-flex t-justify-center'>
                  <Tag color='green' className='t-text-[12px] md:t-text-[16px] t-py-0.5'>
                    {handleAccess(row.role)}
                  </Tag>
                </td>

                <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                  <Switch
                    checked={!row?.isBlocked}
                    onChange={() => {
                      handleToggleChange(row?.isBlocked, row?.id)
                    }}
                    checkedChildren='Active'
                    unCheckedChildren='Blocked'
                    style={{backgroundColor: row?.isBlocked ? '#FF6461 ' : '#55B659'}}
                  />
                </td>
                 <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                  <Tooltip
                    title={
                      user?.role === 'admin' && billingInfo?.plan === 'PROFESSIONAL'
                        ? ''
                        : 'Only for Premium User'
                    }
                  >
                    <Switch
                      disabled={user?.role !== 'admin' && billingInfo?.plan !== 'PROFESSIONAL'}
                      checked={row?.azureSSOEnables}
                      // loading={SSoEnableLoading?.email === row?.email && SSoEnableLoading?.bool}
                      onChange={() => {
                        HandleSSOEnable(
                          row?.azureSSOEnables,
                          row?.email,
                          `${row?.firstName} ${row?.lastName}`
                        )
                      }}
                      checkedChildren='Enabled'
                      unCheckedChildren='Disabled'
                      style={{backgroundColor: !row?.azureSSOEnables ? '#FF6461 ' : '#55B659'}}
                    />
                  </Tooltip>
                </td> 

                <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                  {row?.joiningDate
                    ? format(parseISO(row?.joiningDate), 'dd MMM yyyy')
                    : 'Pending...'}
                </td>
                <td
                  className='t-border-b t-px-4 t-py-7 t-text-center t-align-middle  '
                  onClick={() => {
                    setEdit(!edit)
                  }}
                >
                  <img
                    alt='img'
                    src={require('../../../../../assets/media/dotsmenu.png')}
                    className='t-ml-8 t-cursor-pointer'
                    height={7}
                    width={7}
                  />
                  <div className='t-absolute t-shadow-2xl t-bg-white t-z-[99999] t-rounded-xl t-top-[2rem] t-right-16 t-flex-column'>
                    {edit && (
                      <ul
                        ref={optionsRef}
                        className=' t-w-max t-py-1 t-top-[55px] t-px-1 t-left-0  t-whitespace-nowrap t-rounded-xl'
                      >
                        <li
                          onClick={() => actionclick(row, 'delete')}
                          className='t-cursor-pointer  t-text-t1 t-px-5 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap t-flex t-items-center t-gap-5'
                        >
                          <KTSVG
                            path={'/media/svg/qr_dashboard/delete.svg'}
                            className=' svg-icon-5'
                          />
                          Delete
                        </li>
                        <li
                          onClick={() => actionclick(row, 'edit')}
                          className='t-cursor-pointer  t-text-t1 t-px-5 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap t-flex t-items-center t-gap-5'
                        >
                          <KTSVG
                            path={'/media/svg/qr_dashboard/edit.svg'}
                            className=' svg-icon-5'
                          />
                          Edit
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <PaginationComponent
        totalItems={pagination?.totalRecords}
        currentPage={pagination?.currentPage}
        itemsPerPage={12}
        onPageChange={(offset: number) => handlePageChange(offset)}
      />

      {/* <Modal open={true} footer={[<Button Name='Cancel' />]}>
        <div className='t-w-[150px] t-flex t-justify-center'>
          <DropdownForm
            selectOption={(name, value) => {
              // const data = {id: row?.id, role: value}
              const data = {}
              dispatch(updateMember(data))
                .unwrap()
                .then(() => {})
                .catch((error: any) => {
                  console.log('error updating user Status: ', error)
                })
            }}
            name='permission'
            title={'d'}
            listItems={PERMISSION_LEVEL}
          />
        </div>
      </Modal> */}
    </>
  )
}

export default TeamTable
