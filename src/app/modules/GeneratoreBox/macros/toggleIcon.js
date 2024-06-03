import {toggleOpen} from '../utils/functions'

export const ToggleIcons = ({
  isOpen,
  setIconIndex,
  setIsOpen,
  icons,
  onToggleDecorator,
  iconIndex,
  height,
  width,
  type,
}) => {
  return (
    <img
      src={icons[iconIndex]}
      height={height}
      width={width}
      alt='qr'
      className='t-cursor-pointer'
      onClick={() => {
        toggleOpen({
          isOpen,
          setIconIndex,
          type,
          onToggleDecorator,
          setIsOpen,
          icons,
          iconIndex,
        })
      }}
    />
  )
}
