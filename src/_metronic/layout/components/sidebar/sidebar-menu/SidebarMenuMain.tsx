/* eslint-disable react/jsx-no-target-blank */
import {SidebarMenuItem} from './SidebarMenuItem'
import {useAuth} from 'app/modules/auth'
import {IsSuperRole} from 'utils/functions'
const SidebarMenuMain = () => {
  const {auth} = useAuth()

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1 t-text-[16px]'>
            PAGES
          </span>
        </div>
      </div>
      {IsSuperRole(auth?.role) ? (
        <>
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/analytics'
            title='Analytics'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/subscriptions'
            title='Subscriptions'
            icon='/media/icons/duotune/sidebar/billing.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/clients'
            title='Clients'
            icon='/media/icons/duotune/sidebar/team.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/users'
            title='Users'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/recyclebin'
            title='Recycle Bin'
            icon='/media/icons/duotune/sidebar/recycle.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/discount-coupon'
            title='Discount'
            icon='/media/icons/duotune/sidebar/discount.svg'
          />
          <SidebarMenuItem
            to='/super-Q1box-admin-gate24/banner'
            title='Banner'
            icon='/media/icons/duotune/sidebar/banner.svg'
          />
        </>
      ) : (
        <>
          <SidebarMenuItem
            to='/dashboard/analytics'
            title='Analytics'
            icon='/media/icons/duotune/sidebar/analytics.svg'
          />
          <SidebarMenuItem
            to='/dashboard/create-qr'
            title='Create QR Code'
            icon='/media/icons/duotune/sidebar/create_qr.svg'
          />
          <SidebarMenuItem
            to='/dashboard/qrcodes'
            title='QR Codes'
            icon='/media/icons/duotune/sidebar/qr.svg'
          />
          {auth?.role === 'admin' && (
            <SidebarMenuItem
              to='/dashboard/teamcollab'
              title='Team Collaboration'
              icon='/media/icons/duotune/sidebar/team.svg'
            />
          )}
          {auth?.role === 'admin' && (
            <SidebarMenuItem
              to='/dashboard/billing'
              title='Billing and Plans'
              icon='/media/icons/duotune/sidebar/billing.svg'
            />
          )}

          <SidebarMenuItem
            to='/dashboard/recyclebin'
            title='Recycle Bin'
            icon='/media/icons/duotune/sidebar/recycle.svg'
          />
        </>
      )}
    </>
  )
}

export {SidebarMenuMain}
