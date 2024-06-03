import {useRef, useEffect} from 'react'
import {GRAPHICS} from './graphics'

const Modal = ({
  open,
  handleClose,
  children,
  iconType = 'normal',
  className,
  notCrossIcon,
  style,
  icon,
  childrenClass,
}) => {
  const ref = useRef()
  // useOnClickOutside(ref, () => handleClose());

  const CROSS_BLACK = GRAPHICS.CROSS_BLACK
  const CROSS_WHITE = GRAPHICS.CROSS_WHITE

  useEffect(() => {
    // 27 is the key code for escape
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const crossIconClass = `t-absolute t-font-bold t-rounded-full t-cursor-pointer
   t-w-[14px] t-h-[14px] t-lg:w-[20px] t-lg:h-[20px] ${
     iconType === 'outside' ? 't-right-0 t-top-[-10px] ' : 't-right-5 t-top-5 t-fill-black'
   }`

  const handleModalClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleClose()
  }

  return (
    <>
      {open && (
        <div
          className='t-w-screen t-h-screen t-z-50 t-right-0 t-top-0 t-fixed t-shadow t-bg-background t-flex t-justify-center t-items-center t-m-0'
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            margin: '0px',
          }}
        >
          <div
            className={`t-relative t-bg-background ${
              iconType === 'normal' ? 't-pt-0' : 't-pt-0'
            }  t-rounded-[5px] t-shadow-md t-bg-white   ${className}`}
            ref={ref}
            style={style}
          >
            <div
              className={`t-flex t-flex-col t-items-center t-justify-center t-w-full t-h-full ${childrenClass}`}
            >
              {children}
            </div>
            {notCrossIcon ? null : (
              <img
                className={crossIconClass}
                src={icon ? CROSS_WHITE : CROSS_BLACK}
                alt='icon'
                width={20}
                height={20}
                onClick={handleModalClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export {Modal}
