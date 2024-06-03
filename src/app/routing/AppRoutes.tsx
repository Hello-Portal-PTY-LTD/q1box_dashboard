import {FC, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {useAuth} from '../modules/auth'
import {App} from '../App'
import {IsSuperRole} from 'utils/functions'
import {PrivateRoutesSuperAdmin} from './PrivateRoutesSuperAdmin'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const NavigateTo = ({dispatch}: any) => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window &&
      window.location &&
      typeof window.location.href === 'string'
    ) {
      // window.close()
      // localStorage.clear()
      const qrAppUrl = process.env.REACT_APP_QR_APP ?? ''
      window.location.href = qrAppUrl
    }
  }, [])
  return null
}

const AppRoutes: FC = () => {
  const {auth} = useAuth()

  useEffect(() => {
    if (window.location.pathname === '/') {
      if (auth?.role) {
        if (!IsSuperRole(auth?.role)) {
          window.location.href = 'dashboard/analytics'
        } else {
          window.location.href = 'super-Q1box-admin-gate24/analytics'
        }
      }
    }
  }, [auth?.role])

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          {/* {auth && !IsSuperRole(auth.role) ? (
            <Route path='dashboard/*' element={<PrivateRoutes />} />
          ) : auth && IsSuperRole(auth.role) ? (
            <Route path='super-Q1box-admin-gate24/*' element={<PrivateRoutesSuperAdmin />} />
          ) : (
            <Route path='*' element={<NavigateTo />} />
          )} */}
          {auth && !IsSuperRole(auth.role) ? (
            <Route path='dashboard/*' element={<PrivateRoutes />} />
          ) : auth && IsSuperRole(auth.role) ? (
            <Route path='super-Q1box-admin-gate24/*' element={<PrivateRoutesSuperAdmin />} />
          ) : (
            <Route path='*' element={<NavigateTo />} />
          )}
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='*' element={<Navigate to='error/404' />} /> {/* This is the 404 route */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
