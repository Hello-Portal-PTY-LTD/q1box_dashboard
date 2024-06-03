import React from 'react'

// Define the UserInfo interface
interface UserInfo {
  userId?: string
  token?: string
}

export function CreateQr() {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

  const userId = userInfo.userId || ''
  const token = userInfo.token || ''

  const queryParams = `userId=${userId}&token=${token}`
  const iframeUrl = process.env.REACT_APP_QR_APP + `/create-qr?${queryParams}`

  return (
    <div>
      <iframe
        title='Creat QR'
        id='create-qr'
        src={iframeUrl}
        style={{width: '100%', height: '100vh', border: 'none'}}
      />
    </div>
  )
}
