import React, {useState, useEffect} from 'react'
import {PLUS_MINUS_ICONS as icons} from '../utils/mock'
import {ToggleIcons} from './toggleIcon'
function ToggleBar({label, onToggleDecorator, type, setIsOpen, isOpen, isModalVisible}) {
  const [iconIndex, setIconIndex] = useState(type === 'Modal' ? 1 : 0)
  useEffect(() => {
    // when modal is closed the icon is setting to plus again (reset)
    if (!isModalVisible && type === 'Modal') {
      setIconIndex(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  return (
    <div className='t-bg-secondary t-w-full t-row-flex t-rounded-xl t-px-5 t-py-4 t-justify-between t-mb-4'>
      <p className='t-font-[500]'>{label}</p>

      <ToggleIcons
        {...{
          isOpen,
          width: 20,
          height: 20,
          setIconIndex,
          setIsOpen,
          onToggleDecorator,
          icons,
          type: {type},
          iconIndex,
        }}
      />
    </div>
  )
}

export default ToggleBar
