import { useEffect } from 'react'
import { Tab } from './macros/Tab'
import { ColorChange, Frames, Shapes, Templates, UploadLogo } from './QRCodeAppearanceOptions'
import { CUSTOMIZE_QR_TABS } from './utils/mock'
import { useDispatch, useSelector } from 'react-redux'
import { getTemplates } from 'store/barCode/barCodeAction'
import { setModalTab } from 'store/barCode/barCodeSlice'

function CustomizeQrModal() {
  const { modalTab } = useSelector((state) => state.barCode)
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(getTemplates())
    //eslint-disable-next-line
  }, [token])

  return (
    <>
      <div className='t-min-w-[100%] 440:t-w-full t-overflow-scroll t-h-full t-mt-2'>
        <div className='t-flex  t-justify-between t-w-[440px] 440:t-w-full t-overflow-scroll t-text-center t-py-2 t-lg:py-0 t-gap-x-3 t-gap-y-1 t-lg:gap-4 t-border-y t-border-gray-200'>
          {CUSTOMIZE_QR_TABS.map(({ name, premium }) => {
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
      <div className='t-flex-column'>
        <div className='t-pt-4 t-pb-4 t-xl:col-span-8'>
          {modalTab === 'TEMPLATES' && <Templates />}
          {modalTab === 'COLOR CHANGE' && <ColorChange />}
          {modalTab === 'FRAMES' && <Frames />}
          {modalTab === 'SHAPE' && <Shapes />}
          {modalTab === 'UPLOAD LOGO' && <UploadLogo />}
        </div>
      </div>
    </>
  )
}

export default CustomizeQrModal
