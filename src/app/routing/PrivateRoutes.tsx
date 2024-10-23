import {FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import {Analytics} from 'app/modules/profile/components/Analytics/Analytics'
import {CreateQr} from 'app/modules/profile/components/CreateQr'
import {QrCodes} from 'app/modules/profile/components/QrCode/QrCodes'
import {TeamCollab} from 'app/modules/profile/components/TeamCollab/TeamCollab'
import {BillingPlans} from 'app/modules/profile/components/BillingPlans/BillingPlans'
import GeneratorBox from 'app/modules/GeneratoreBox/GeneratorBox'
import RHFProvider from 'RHF/FormProvider'
import RecycleBin from 'app/modules/profile/components/RecycleBin/RecycleBin'
import {ProfileDetails} from 'app/modules/accounts/components/settings/cards/ProfileDetails'
import Billing from 'app/modules/profile/components/BillingPlans/Billing'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route index element={<Navigate to='/dashboard/qrcodes' />} />
        <Route
          path='analytics'
          element={
            <SuspensedView>
              <Analytics />
            </SuspensedView>
          }
        />
        <Route
          path='create-qr'
          element={
            <SuspensedView>
              <CreateQr />
            </SuspensedView>
          }
        />
        <Route
          path='qrcodes'
          element={
            <SuspensedView>
              <QrCodes />
            </SuspensedView>
          }
        />
        <Route
          path='teamcollab'
          element={
            <SuspensedView>
              <TeamCollab />
            </SuspensedView>
          }
        />
        <Route
          path='billing'
          element={
            <SuspensedView>
              <Billing adminView={false} />
            </SuspensedView>
          }
        />
        <Route
          path='create-qr/'
          element={
            <RHFProvider>
              <GeneratorBox mode='ALL' />
            </RHFProvider>
          }
        />
        <Route
          path='create-qr-bulk/'
          element={
            <RHFProvider>
              <GeneratorBox mode='BULK' />
            </RHFProvider>
          }
        />
        <Route
          path='plans'
          element={
            <SuspensedView>
              <BillingPlans />
            </SuspensedView>
          }
        />
        <Route
          path='recyclebin'
          element={
            <>
              <RecycleBin />
            </>
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

export {PrivateRoutes}
