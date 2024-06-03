import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {Provider} from 'react-redux'
import {persistor, store} from '../store'
import {PersistGate} from 'redux-persist/integration/react'
import {LoadScript} from '@react-google-maps/api'

import '../global.css'

const App = () => {
  const key = process.env.REACT_APP_MAP_KEY || ''
  if (!key) {
    console.log('could not find key google map key')
  }
  return (
    <Provider store={store}>
      {/* <RHFProvider> */}

      <LoadScript loadingElement={<></>} libraries={['places']} googleMapsApiKey={key}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Suspense fallback={<LayoutSplashScreen />}> */}
          <I18nProvider>
            <LayoutProvider>
              <AuthInit>
                <Outlet />
                <MasterInit />
              </AuthInit>
            </LayoutProvider>
          </I18nProvider>
        </PersistGate>
        {/* </Suspense> */}
      </LoadScript>
      {/* </RHFProvider> */}
    </Provider>
  )
}

export {App}
