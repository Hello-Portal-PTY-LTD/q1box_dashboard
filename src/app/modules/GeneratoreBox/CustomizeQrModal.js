import {useEffect, useState, useRef} from 'react'
import {Tab} from './macros/Tab'
import {ColorChange, Frames, Shapes, Templates, UploadLogo} from './QRCodeAppearanceOptions'
import {CUSTOMIZE_QR_TABS} from './utils/mock'
import {useDispatch, useSelector} from 'react-redux'
import {getTemplates} from 'store/barCode/barCodeAction'
import {setModalTab} from 'store/barCode/barCodeSlice'
import {KTSVG} from '_metronic/helpers'

function CustomizeQrModal() {
  const {modalTab} = useSelector((state) => state.barCode)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const [scrollButtonsVisible, setScrollButtonsVisible] = useState({left: false, right: false})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    dispatch(getTemplates())
    // eslint-disable-next-line
  }, [token])

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current
      if (container) {
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth
        setScrollButtonsVisible({
          left: scrollLeft > 0,
          right: scrollWidth > scrollLeft + clientWidth,
        })
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      handleScroll() // Update button visibility on resize
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      handleScroll() // Initialize visibility state on component mount
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const scrollToEnd = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTo({left: container.scrollWidth, behavior: 'smooth'})
    }
  }

  const scrollToStart = () => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTo({left: 0, behavior: 'smooth'})
    }
  }

  return (
    <div className='t-relative'>
      {isMobile && (
        <>
          {scrollButtonsVisible.left && (
            <div
              className='t-absolute t-top-[7px] t-left-0 t-bg-[#d0d5ff] t-p-2 t-rounded-[7px] t-shadow-lg t-flex t-items-center t-justify-center cursor-pointer'
              onClick={scrollToStart}
              style={{zIndex: 1000}}
            >
              <KTSVG className='t-w-4 t-h-4' path='/media/icons/duotune/arrows/arr063.svg' />
            </div>
          )}
        </>
      )}

      <div
        ref={scrollContainerRef}
        className='t-min-w-[100%] 440:t-w-full t-overflow-scroll t-h-full t-mt-2'
      >
        <div className='t-flex  t-justify-between t-w-[440px] 440:t-w-full t-overflow-scroll t-text-center t-py-2 t-lg:py-0 t-gap-x-3 t-gap-y-1 t-lg:gap-4 t-border-y t-border-gray-200'>
          {CUSTOMIZE_QR_TABS.map(({name, premium}) => {
            return (
              <Tab
                key={name}
                name={name}
                selectedTab={modalTab}
                premium={premium}
                handleTabSelect={() => dispatch(setModalTab(name))}
              />
            )
          })}
        </div>
      </div>
      {isMobile && (
        <>
          {scrollButtonsVisible.right && (
            <div
              className='t-absolute t-top-[7px] t-right-[2px] t-bg-[#d0d5ff] t-p-2 t-rounded-[7px] t-shadow-lg t-flex t-items-center t-justify-center cursor-pointer'
              onClick={scrollToEnd}
              style={{zIndex: 1000}}
            >
              <KTSVG className='t-w-4 t-h-4' path='/media/icons/duotune/arrows/arr064.svg' />
            </div>
          )}
        </>
      )}
      <div className='t-flex-column'>
        <div className='t-pt-4 t-pb-4 t-xl:col-span-8'>
          {modalTab === 'TEMPLATES' && <Templates />}
          {modalTab === 'COLOR CHANGE' && <ColorChange />}
          {modalTab === 'FRAMES' && <Frames />}
          {modalTab === 'SHAPE' && <Shapes />}
          {modalTab === 'UPLOAD LOGO' && <UploadLogo />}
        </div>
      </div>
    </div>
  )
}

export default CustomizeQrModal
