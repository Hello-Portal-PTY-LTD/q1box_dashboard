import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {AuthModel, UserModel} from './_models'
import * as authHelper from './AuthHelpers'
import {WithChildren} from '../../../../_metronic/helpers'
import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '_metronic/layout/components/macros/Loader'

import {getAuthUser, verifyToken} from 'store/authStore/authAction'
import {getSubscriptionInfo} from 'store/payment/paymentAction'
import {IsSuperRole} from 'utils/functions'
type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)

    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

/**  
1. get the token from query or storage and then verify its blacklisted or not.
if black listed then move the user to again to the web page.
**/

const AuthInit = ({children}: any) => {
  const {saveAuth, logout} = useAuth()
  const dispatch = useDispatch()
  const [showSplash, setShowSplash] = useState(true)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const storedUserInfo = localStorage.getItem('userInfo')
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {}
  const {user} = useSelector((state: any) => state.auth)

  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''
  const userId = searchParams.get('userId') || ''
  const role = searchParams.get('role') || ''

  const disableSplashScreen = () => {
    setShowSplash(false)
    if (
      typeof window !== 'undefined' &&
      window &&
      window.location &&
      typeof window.location.href === 'string'
    ) {
      localStorage.clear()
      const qrAppUrl = process.env.REACT_APP_QR_APP ?? ''
      // window.location.href = qrAppUrl
      window.open(qrAppUrl, '_self')
    }
  }

  useEffect(() => {
    const user = authHelper.getAuth()

    // check the token from the user query params then validate the token if it's
    // validate or not if so then move him to the dashboard also in second check.

    // 1st check.
    if (token && email && userId && role) {
      localStorage.clear()
      saveAuth({token, email, userId, role})
      setShowSplash(false)
      dispatch(verifyToken(token))
        .unwrap()
        .then((res: any) => {
          if (res.message === true) {
            saveAuth({token, email, userId, role})
            dispatch(getAuthUser(userId))
              .unwrap()
              .then(() => {})
              .catch(() => {
                disableSplashScreen()
              })
          }
        })
        .catch((err: any) => {
          disableSplashScreen()
          logout()
        })
    }

    // second check.
    else if (user?.email && user?.token && userInfo?.userId) {
      dispatch(verifyToken(user?.token))
        .unwrap()
        .then((res: any) => {
          if (res.message === true) {
            setShowSplash(false)
            dispatch(getAuthUser(userInfo?.userId))
              .unwrap()
              .then(() => {})
              .catch(() => {
                disableSplashScreen()
              })
          } else {
            disableSplashScreen()
            logout()
          }
        })
        .catch((err: any) => {
          disableSplashScreen()
          logout()
        })
    }

    // if there is not token in query or localStorage then moved him to web page.
    if (!token && !email && !user?.email && !user?.token) {
      logout()
      disableSplashScreen()
      saveAuth({token, email, userId, role})
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }, [token, email, userId, userInfo?.id, userInfo?.email, user?.id])

  useEffect(() => {
    if (!IsSuperRole(user?.role) && user?.role) {
      dispatch(getSubscriptionInfo())
        .unwrap()
        .then((res: any) => {
          if (!res.trialValid && !res.isValid) {
            window.location.href = process.env.REACT_APP_QR_APP + '/plan-expired'
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname, user?.role])

  return showSplash ? <Loader /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
