import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {AllSubscriptions} from 'app/modules/profile/components/superadmin/subscriptions/subscriptions'
import AllUsers from 'app/modules/profile/components/superadmin/users/users'
import {AllClients} from 'app/modules/profile/components/superadmin/clients/clients'
import SubscriptionDetails from 'app/modules/profile/components/superadmin/subscriptions/subscriptionDetails'
import {AdminAnalytics} from 'app/modules/profile/components/superadmin/analytics/Analytics'
import AdminRecycleBin from 'app/modules/profile/components/superadmin/RecycleBin/RecycleBin'
import ClientDetails from 'app/modules/profile/components/superadmin/clients/clientdetails'
import {ProfileDetails} from 'app/modules/accounts/components/settings/cards/ProfileDetails'
import DiscountCoupon from 'app/modules/profile/components/superadmin/discountCoupon/discountCoupon'
import BannerAdd from 'app/modules/profile/components/superadmin/banner/banner'

const PrivateRoutesSuperAdmin = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route index element={<Navigate to='/super-Q1box-admin-gate24/analytics' />} />
        <Route
          path='users'
          element={
            <SuspensedView>
              <AllUsers />
            </SuspensedView>
          }
        />
        <Route
          path='subscriptions'
          element={
            <SuspensedView>
              <AllSubscriptions />
            </SuspensedView>
          }
        />
        <Route
          path='subscriptions/details'
          element={
            <SuspensedView>
              <SubscriptionDetails />
            </SuspensedView>
          }
        />
        <Route
          path='clients'
          element={
            <SuspensedView>
              <AllClients />{' '}
            </SuspensedView>
          }
        />
        <Route
          path='clients/details/:id'
          element={
            <SuspensedView>
              <ClientDetails />
            </SuspensedView>
          }
        />
        <Route
          path='analytics'
          element={
            <SuspensedView>
              <AdminAnalytics />
            </SuspensedView>
          }
        />
        <Route
          path='recyclebin'
          element={
            <SuspensedView>
              <AdminRecycleBin />
            </SuspensedView>
          }
        />
        <Route
          path='profile'
          element={
            <SuspensedView>
              <ProfileDetails />
            </SuspensedView>
          }
        />
        <Route
          path='discount-coupon'
          element={
            <SuspensedView>
              <DiscountCoupon />
            </SuspensedView>
          }
        />
        <Route
          path='banner'
          element={
            <SuspensedView>
              <BannerAdd />
            </SuspensedView>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutesSuperAdmin}
