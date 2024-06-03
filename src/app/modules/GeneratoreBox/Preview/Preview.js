import React, {useState} from 'react'
import {PreviewAdvanceLinks, PreviewMenu, VideoPreview, PreviewCoupan} from './index'
import ToggleBar from '../macros/ToggleBar'
import PreviewSocial from './PreviewSocial'

const tabComponents = {
  AdvanceLinks: <PreviewAdvanceLinks />,
  Menu: <PreviewMenu />,
  Video: <VideoPreview />,
  Coupon: <PreviewCoupan />,
  Social: <PreviewSocial />,
}

function Preview({currentQrType}) {
  const [isOpen, setIsOpen] = useState(true)
  const CurrentOption = React.useMemo(() => tabComponents[currentQrType] || null, [currentQrType])

  return (
    <>
      {CurrentOption ? (
        <div className='flex-column t-gap-5 t-mb-5'>
          <ToggleBar label='Preview' setIsOpen={setIsOpen} isOpen={isOpen} />
          {isOpen && CurrentOption}
        </div>
      ) : null}
    </>
  )
}

export default Preview
