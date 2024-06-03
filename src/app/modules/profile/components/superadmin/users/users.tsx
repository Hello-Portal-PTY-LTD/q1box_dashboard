import {useEffect} from 'react'
import React, {useState} from 'react'
import UserCard from './usercard'
import {AddUserModal} from './usermodals/addusermodal'
import {getTeamMembers} from 'store/teamStore/teamAction'
import {AppDispatch, RootState} from 'store'
import {useDispatch, useSelector} from 'react-redux'
import {Spin} from 'antd'
import {Button} from '_metronic/partials/qrComponents'
import {IsSuperEditor, IsSuperViewer} from 'utils/functions'
import PaginationComponent from 'app/modules/pagination/pagination'

export default function AllUsers() {
  const [showadduser, setShowAddUser] = useState(false)
  const {team, loading} = useSelector((state: RootState) => state.team)
  const {list, pagination} = team
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector((state: RootState) => state.auth)
  const [currentOffset, setCurrentOffset] = useState(0)

  useEffect(() => {
    dispatch(getTeamMembers({isDeleted: false, offset: currentOffset}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (offset: number) => {
    setCurrentOffset(currentOffset)
    dispatch(getTeamMembers({isDeleted: false, offset}))
  }

  return (
    <div>
      <div className='t-flex t-justify-end t-mb-10'>
        <Button
          Name='Add User'
          primary={true}
          className={
            IsSuperViewer(user?.role) || IsSuperEditor(user?.role)
              ? ` t-pointer-events-none t-opacity-50   t-cursor-not-allowed t-w-[150px]`
              : 't-w-[150px]'
          }
          click={() => setShowAddUser(true)}
        />
      </div>
      <Spin spinning={loading}>
        <div className='t-grid t-grid-cols-4 t-gap-3 375:t-grid-cols-1 500:t-grid-cols-2 991:t-grid-cols-3 1110:t-grid-cols-4'>
          {list?.map((user: any, index: any) => {
            if (
              user?.firstName !== undefined &&
              user?.lastName !== undefined &&
              user?.email !== undefined &&
              user?.role !== undefined &&
              user?.id !== undefined &&
              user?.picture !== undefined
            ) {
              return <UserCard offset={currentOffset} key={index} user={user} />
            } else {
              return null // Render nothing if any of the required values is undefined
            }
          })}

          <AddUserModal
            show={showadduser}
            offset={currentOffset}
            handleClose={() => {
              setShowAddUser(false)
            }}
          />
        </div>
      </Spin>

      <PaginationComponent
        totalItems={pagination?.totalRecords}
        currentPage={pagination?.currentPage}
        itemsPerPage={12}
        onPageChange={(offset: number) => handlePageChange(offset)}
      />
    </div>
  )
}
