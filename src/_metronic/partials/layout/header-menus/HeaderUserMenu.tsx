/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {useDispatch, useSelector} from 'react-redux'
import {logOut} from '../../../../store/authStore/authAction'
import {AppDispatch} from '../../../../store'
import {IsSuperRole} from 'utils/functions'

function capitalizeFirstLetter(str: string) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1)
}

const HeaderUserMenu: FC = () => {
  const {logout} = useAuth()
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: any) => state.auth.user)

  const [nameprofile, setNameProfile] = useState('')
  const [fullname, setFullName] = useState('')

  useEffect(() => {
    if (user) {
      if (user?.firstName && user?.lastName) {
        setNameProfile(user?.firstName[0]?.toUpperCase() + user?.lastName[0]?.toUpperCase())
        const fullName =
          capitalizeFirstLetter(user?.firstName) + ' ' + capitalizeFirstLetter(user?.lastName)
        setFullName(fullName)
      } else if (user?.firstName) {
        setNameProfile(user?.firstName[0]?.toUpperCase())
        setFullName(user?.firstName)
      } else if (user?.lastName) {
        setNameProfile(user?.lastName[0]?.toUpperCase())
        setFullName(user?.lastName)
      }
    }
  }, [user])
  const handleLogout = () => {
    dispatch(logOut())
    setTimeout(() => {
      logout()
    }, 1000)
  }

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {user?.picture ? (
              <img alt='Logo' src={user?.picture} />
            ) : (
              <div className='text-white bg-primary t-h-[50px] t-w-[50px] t-pt-4 text-center  t-text-2xl  t-rounded-full '>
                {nameprofile}
              </div>
            )}
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>{fullname}</div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7 text-break'>
              {user.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link
          to={IsSuperRole(user?.role) ? '/super-Q1box-admin-gate24/profile' : '/dashboard/profile'}
          className='menu-link px-5'
        >
          My Profile
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={handleLogout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
