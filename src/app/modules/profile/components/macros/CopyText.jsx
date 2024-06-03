import React from 'react'
import {CopyOutlined} from '@ant-design/icons'
import {message, Tooltip} from 'antd'

const CopyText = ({textToCopy, toolTipTitle}) => {
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      message.success(`${toolTipTitle} copied!`)
    } catch (error) {
      console.error('Failed to copy text: ', error)
    }
  }

  return (
    <Tooltip title={toolTipTitle ? toolTipTitle : 'Copy'}>
      <CopyOutlined onClick={handleCopyClick} />
    </Tooltip>
  )
}

export default CopyText
