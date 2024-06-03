/* eslint-disable jsx-a11y/anchor-is-valid */

import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import {useEffect, useState} from 'react'
import {Spin, message} from 'antd'

import {getTeamMembers, updateMember} from 'store/teamStore/teamAction'
import {IsSuperEditor, IsSuperViewer, roleFormat} from 'utils/functions'
import {Button} from '_metronic/partials/qrComponents'
import PaginationComponent from 'app/modules/pagination/pagination'

export function AdminRecycleBin() {
  const dispatch = useDispatch<AppDispatch>()
  const {deletedMembers, loading} = useSelector((state: RootState) => state.team)
  const logeduser = useSelector((state: RootState) => state.auth.user)
  const [currentOffset, setCurrentOffset] = useState(0)
  const {list, pagination} = deletedMembers

  useEffect(() => {
    dispatch(getTeamMembers({isDeleted: true, offset: 0}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRestore = (id: string) => {
    dispatch(updateMember({id: id, isDeleted: false}))
      .unwrap()
      .then(() => {
        message.success('User Restored Successfully')
        if (list.length === 1) {
          dispatch(getTeamMembers({isDeleted: true, offset: currentOffset - 10}))
        } else {
          dispatch(getTeamMembers({isDeleted: true, offset: currentOffset}))
        }
      })
  }

  const handlePageChange = (offset: number) => {
    setCurrentOffset(offset)
    dispatch(getTeamMembers({isDeleted: true, offset: offset}))
  }

  const tableRowCellClass = 't-px-4 t-py-7 t-text-center'

  return (
    <div className='t-flex t-flex-col t-gap-8 t-h-full'>
      <div>
        <h3 className='t-font-bold t-my-2 t-text-[24px]'>Recycle Bin (Deleted Users)</h3>
      </div>
      <div className='t-rounded-[20px] t-overflow-x-scroll'>
        <Spin spinning={loading}>
          <table
            className='t-rounded-xl t-table-auto t-w-full  t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'
            style={{borderCollapse: 'separate', borderSpacing: '0 0px'}}
          >
            <thead className='t-rounded-xl '>
              <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                <td className={tableRowCellClass}>Name</td>
                <td className={tableRowCellClass}>Email</td>
                <td className={tableRowCellClass}>Role</td>
                <td className={tableRowCellClass}>Action</td>
              </tr>
            </thead>

            <tbody className='t-rounded-xl t-bg-white '>
              {list.length > 0 &&
                list.map((user: any, index: number) => {
                  return (
                    <tr key={user.User}>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : 'Name not available'}
                      </td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>{user.email}</td>
                      <td className='t-border-b t-px-4 t-py-7 t-text-center '>
                        {roleFormat(user.role)}
                      </td>

                      <td className='t-border-b t-px-4 t-py-7 t-text-center t-flex t-justify-center t-gap-2 '>
                        <Button
                          className={
                            IsSuperViewer(logeduser?.role) || IsSuperEditor(logeduser?.role)
                              ? 't-pointer-events-none t-opacity-50 t-w-[120px]'
                              : 't-w-[120px]'
                          }
                          Name='Restore'
                          click={() => handleRestore(user.id)}
                        />
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
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

export default AdminRecycleBin
