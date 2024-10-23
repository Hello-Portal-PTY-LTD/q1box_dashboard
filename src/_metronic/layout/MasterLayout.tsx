import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {
  DrawerMessenger,
  ActivityDrawer,
  InviteUsers,
  UpgradePlan,
  ThemeModeProvider,
} from '../partials'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import Banner from './components/banner/banner'
import {useDispatch, useSelector} from 'react-redux'
import {InfoCircleOutlined} from '@ant-design/icons'
import {calculateRemainingDays} from 'utils/functions'
import {getTransactions} from 'store/payment/paymentAction'

const MasterLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {billingInfo, isTrialValid, trialExpirationDate} = useSelector(({payment}) => payment)
  useEffect(() => {
    reInitMenu()
  }, [location.key])

  useEffect(() => {
    dispatch(getTransactions())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageDataProvider>
      <div className='lg:t-ml-[260px]'>
        <Banner />

        {isTrialValid && billingInfo?.plan === 'Free' && (
          <div className='t-bg-white t-flex t-items-center t-gap-2 t-px-8 t-py-3 t-rounded-md t-mb-3'>
            <InfoCircleOutlined rev={''} />
            <p>
              You are currently on a trial. Please consider upgrading to ensure you retain access to
              your QR codes. You have{' '}
              <span className='t-font-medium'>{calculateRemainingDays(trialExpirationDate)}</span>
              days left in your trial.
            </p>
          </div>
        )}
      </div>

      <ThemeModeProvider>
        <div className='d-flex flex-column flex-root app-root ' id='kt_app_root'>
          <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
            <HeaderWrapper />
            <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
              <Sidebar />
              <div
                className='app-main t-h-[calc(100vh-70px)] flex-column flex-row-fluid'
                id='kt_app_main'
              >
                <div className='d-flex flex-column flex-column-fluid'>
                  {/* <ToolbarWrapper /> */}
                  <Content>
                    <Outlet />
                  </Content>
                </div>
                <FooterWrapper />
              </div>
            </div>
          </div>
        </div>

        {/* begin:: Drawers */}
        <ActivityDrawer />
        {/* <RightToolbar /> */}
        <DrawerMessenger />
        {/* end:: Drawers */}

        {/* begin:: Modals */}
        <InviteUsers />
        <UpgradePlan />
        {/* end:: Modals */}
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  )
}

export {MasterLayout}
