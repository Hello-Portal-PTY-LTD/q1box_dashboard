import {useState, useEffect} from 'react'

import {TAB_BAR} from './utils/mock'
import Card from './macros/Card'
import {useSelector} from 'react-redux'
import {getEditQrId} from './utils/functions'

function TabBar({handleCurrentQrType}) {
  const {barCode} = useSelector((state) => state)
  const edit_qrId = getEditQrId()
  const [selectedTab, setSelectedTab] = useState(barCode.qrType)
  const [selected, setSelected] = useState()
  let initialTab = 10
  const [expandTab, setExpandTab] = useState(initialTab)

  const toggleExpand = () => {
    setExpandTab(expandTab === initialTab ? TAB_BAR.length : initialTab)
  }

  const handleTabs = (tabKey) => {
    const index = TAB_BAR.findIndex((obj) => obj.key === tabKey)
    if (index !== -1) {
      setSelectedTab(tabKey)
    } else {
      console.log(`Object with name ${selectedTab} not found in the array`)
    }
  }

  useEffect(() => {
    if (!edit_qrId) {
      setSelectedTab(barCode.qrType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barCode.qrType])

  useEffect(() => {
    if (edit_qrId) {
      const index = TAB_BAR.findIndex((obj) => obj.key === barCode.qrType)
      setSelected(index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barCode.qrType])

  if (edit_qrId) {
    return (
      <div className='t-bg-secondary t-relative t-shadow-inner t-rounded-[14px] t-p-1 t-w-1/2'>
        <p
          className={`t-text-[#303038]
            t-bg-white t-cursor-pointer
             t-h-[30px]  t-px-1.5 t-1320:px-[10px]  t-pt-1 t-text-center t-rounded-xl  t-hover:t-shadow-md t-whitespace-nowrap`}
        >
          {TAB_BAR[selected]?.label}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* <Modal open={openModal} className='t-p-7' handleClose={handleClose}> */}
      <div className='t-border-b-2 t-pb-6 t-border-gray-200'>
        <div className='t-flex-column t-gap-5 t-text-lg t-font-[500]'>
          <p className='t-text-t2'>Select type of QR</p>
          <div className='t-grid t-grid-cols-2 md:t-grid-cols-3 991:t-grid-cols-2 xl:t-grid-cols-4 t-gap-4'>
            {TAB_BAR.slice(0, expandTab).map((current, index) => {
              return (
                <Card
                  label={current.label}
                  icon={current.icon}
                  tabKey={current.key}
                  // handleClose={() => {
                  //   handleClose()
                  // }}
                  handleCurrentQrType={(tab_Key) => {
                    handleCurrentQrType(tab_Key)
                  }}
                  handleTabs={handleTabs}
                  key={index}
                />
              )
            })}

            <div
              className='t-w-full t-text-1 t-px-2 t-py-3 t-cursor-pointer hover:t-border-primary hover:t-text-primary t-bg-light t-border t-border-grey t-rounded-[5px]'
              onClick={() => {
                toggleExpand()
              }}
            >
              <div className='t-text-[10px] md:t-text-[12px] t-text-center'>
                {expandTab === initialTab ? 'See More' : 'See Less'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TabBar
