import {useRef, useEffect} from 'react'
import {GRAPHICS} from './graphics'

const FolderModal = ({
  open,
  handleClose,
  children,
  iconType = 'normal',
  className,
  notCrossIcon,
  style,
  childrenClass,
}) => {
  const ref = useRef()

  // useOnClickOutside(ref, () => handleClose())
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
    //eslint-disable-next-line
  }, [])

  const crossIconClass = `t-absolute 
   t-font-bold t-rounded-full t-cursor-pointer
   t-w-[14px] t-h-[14px] lg:t-w-[20px] lg:t-h-[20px] ${
     iconType === 't-outside'
       ? 't-right-0 -t-top-10]'
       : 't-right-5 t-bg-white  t-top-5 t-fill-black'
   }`
  const handleModalClose = (e) => {
    handleClose()
    e.preventDefault()
    e.stopPropagation()
  }
  return (
    <>
      {open && (
        <div
          className='t-w-screen t-h-screen  t-z-50 t-right-0 t-top-0 t-fixed t-shadow t-bg-background t-flex t-justify-center t-items-center t-m-0'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            margin: '0px',
          }}
        >
          <div
            className={`t-relative t-bg-background ${
              iconType === 'normal' ? 't-py-4' : 't-pt-0'
            }  t-rounded-[5px] t-shadow-md t-bg-white t-max-h-[500px]  ${className}`}
            ref={ref}
            style={style}
          >
            <div className='t-text-center t-text-xl t-mb-4'>QR Code Name</div>
            <hr className='t-mb-4' />
            <div
              className={`t-flex t-flex-col t-items-center t-justify-center t-w-full t-h-full ${childrenClass}`}
            >
              {children}
            </div>
            {notCrossIcon ? null : (
              <img
                className={crossIconClass}
                src={GRAPHICS.CROSS_BLACK}
                alt='icon'
                width={12}
                height={12}
                onClick={handleModalClose}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
export {FolderModal}
