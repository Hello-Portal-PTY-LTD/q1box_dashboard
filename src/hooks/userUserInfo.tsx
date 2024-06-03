import {useEffect, useState} from 'react'

interface UserInfo {
  userId: string
  token: string
  email: string
}

const useUserInfo = (): UserInfo | null => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(storedUserInfo)
      setUserInfo(parsedUserInfo)
    }
  }, [])

  return userInfo
}

export default useUserInfo
