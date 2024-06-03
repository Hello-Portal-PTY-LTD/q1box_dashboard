import clsx from 'clsx'

import {HeaderUserMenu} from '../../../partials'

import {useSelector} from 'react-redux'
const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user)

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          {user && user.picture ? (
            <img alt='Logo' src={user.picture} className='t-rounded' />
          ) : (
            user &&
            ((user?.firstName && user?.lastName) || user?.email) && (
              <div className='text-white t-bg-primary t-h-[50px] t-w-[50px] t-pt-4 text-center t-text-2xl t-rounded-full'>
                {user?.firstName && user?.lastName
                  ? `${user.firstName[0]?.toUpperCase()}${user.lastName[0]?.toUpperCase()}`
                  : user?.email[0]?.toUpperCase()}
              </div>
            )
          )}
        </div>
        <HeaderUserMenu />
      </div>
    </div>
  )
}

export {Navbar}
