import React, {useEffect, useState} from 'react'
import TabBar from './TabBar'

// import {TAB_BAR} from 't-./utils/mock'
import DownloadOptions from './DownloadOptions'
import CustomizeQrModal from './CustomizeQrModal'
import {ConditionalQrComponent} from './QrType'
import Qr from './macros/Qr'
import {useDispatch, useSelector} from 'react-redux'
import {setQrType} from 'store/barCode/barCodeSlice'

import {disableStyling} from './utils/functions'
import {TAB_BAR} from './utils/mock'
import {PLUS_MINUS_ICONS as icons} from './utils/mock'
import {getUserQrFolders} from 'store/qrStore/qrAction'
import {Collapse, message} from 'antd'
import {PreviewAdvanceLinks, PreviewCoupan, PreviewMenu, VideoPreview} from './Preview'
import PreviewSocial from './Preview/PreviewSocial'
const {Panel} = Collapse

function GeneratorBox() {
  const [currentQrType, setCurrentQrType] = useState('Url')
  const {barCode, auth} = useSelector((state) => state)
  const formsThatHavePreview = ['AdvanceLinks', 'Video', 'Social', 'Coupon', 'Menu']
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrentQrType(barCode.qrType)
  }, [barCode.qrType])

  useEffect(() => {
    dispatch(getUserQrFolders(auth?.user?.id))
    //eslint-disable-next-line
  }, [auth?.user?.id])

  const handleCurrentQrType = (tab_Key) => {
    const filteredTypes = TAB_BAR.filter((type) => type.key === tab_Key)
    setCurrentQrType(filteredTypes[0].key)
    sessionStorage.setItem('currentTab', filteredTypes[0].key)
    dispatch(setQrType(tab_Key))
  }

  const downloadOptions = formsThatHavePreview.includes(barCode.qrType)
    ? 't-flex-column  t-gap-[50px]'
    : 't-flex-column t-gap-[50px]'

  const styles = {
    container: `t-w-full layout-container t-justify-center  t-flex-column lg:t-row-flex t-gap-4`,
    leftBox:
      't-bg-white t-space-y-7 t-w-full lg:t-w-[60%] lg:t-w-[65%]  t-overflow-auto  t-shadow-md t-pb-[20px] t-px-2 t-p-4 t-lg:p-5 xl:t-p-7 1320:t-w-[65%]',
    textWrapper: 't-w-full t-text-center lg:t-w-[80%] t-col-span-8 t-space-y-2 md:t-text-left ',
    rightBox:
      't-w-full t-bg-white t-shadow-md  lg:t-max-w-[40%] xl:t-max-w-[35%] 1320:t-max-w-[35%] t-p-4 t-overflow-auto  ',
  }

  const [activePanelKey, setActivePanelKey] = useState(['1'])
  const [previewActivePanelKey, setPreviewActivePanelKey] = useState(['2'])

  const handleCollapseChange = (key) => {
    setActivePanelKey(key)
  }
  const handlePreviewCollapseChange = (key) => {
    setPreviewActivePanelKey(key)
  }

  const tabComponents = {
    AdvanceLinks: <PreviewAdvanceLinks />,
    Menu: <PreviewMenu />,
    Video: <VideoPreview />,
    Coupon: <PreviewCoupan />,
    Social: <PreviewSocial />,
  }

  const CurrentOption = React.useMemo(
    () => tabComponents[currentQrType] || null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentQrType]
  )

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          {!disableStyling() && (
            <article className={styles.textWrapper}>
              <h1 className='t-text-[32px] t-font-bold t-leading-[34px] mb-4'>
                Q1 Box Code Generator
              </h1>
              <p className='breif t-text-t1 t-font-medium '>
                Easily create, manage and track QR codes, improving your marketing efforts and
                organizing QR processes.
              </p>
            </article>
          )}
          <div className='t-w-full t-flex-column t-gap-6 1320:t-w-full'>
            <Collapse
              activeKey={activePanelKey}
              style={{padding: '0px'}}
              accordion
              expandIconPosition='right'
              bordered={false}
              onChange={handleCollapseChange}
              ghost
            >
              <Panel
                style={{padding: '0px'}}
                showArrow={false}
                header={
                  <div
                    style={{
                      backgroundColor: 'rgba(207, 213, 255, 1)',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{fontWeight: 600}}>Content</span>
                    {/* You can customize the icons here */}
                    {activePanelKey?.includes('1') ? (
                      <img
                        src={icons[0]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    ) : (
                      <img
                        src={icons[1]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    )}
                  </div>
                }
                key='1'
              >
                <>
                  <TabBar
                    handleCurrentQrType={(label) => {
                      handleCurrentQrType(label)
                    }}
                  />
                  <div className='my-8'>
                    <ConditionalQrComponent condition={currentQrType} />
                  </div>
                  {/* <QrFolderComponet /> */}
                </>
              </Panel>
              <Panel
                showArrow={false}
                header={
                  <div
                    style={{
                      backgroundColor: 'rgba(207, 213, 255, 1)',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{fontWeight: 600}}>Customisation</span>
                    {/* You can customize the icons here */}
                    {activePanelKey?.includes('2') ? (
                      <img
                        src={icons[0]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    ) : (
                      <img
                        src={icons[1]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    )}
                  </div>
                }
                key='2'
              >
                <CustomizeQrModal />
              </Panel>
            </Collapse>
          </div>

          {/* {---------------------------------------} */}
        </div>

        {/* {---------------------------------------} */}
        <div className={styles.rightBox}>
          <Collapse
            activeKey={previewActivePanelKey}
            style={{padding: '0px'}}
            accordion
            expandIconPosition='right'
            bordered={false}
            onChange={handlePreviewCollapseChange}
            ghost
          >
            {CurrentOption && (
              <Panel
                style={{padding: '0px'}}
                showArrow={false}
                header={
                  <div
                    style={{
                      backgroundColor: 'rgba(207, 213, 255, 1)',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      borderRadius: '10px',
                    }}
                  >
                    <span style={{fontWeight: 600}}>Content</span>
                    {/* You can customize the icons here */}
                    {previewActivePanelKey?.includes('1') ? (
                      <img
                        src={icons[0]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    ) : (
                      <img
                        src={icons[1]}
                        height={20}
                        width={20}
                        alt='qr'
                        className='cursor-pointer'
                      />
                    )}
                  </div>
                }
                key='1'
              >
                <div className='mb-8'>{CurrentOption}</div>
              </Panel>
            )}
            <Panel
              showArrow={false}
              header={
                <div
                  style={{
                    backgroundColor: 'rgba(207, 213, 255, 1)',
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    borderRadius: '10px',
                  }}
                >
                  <span style={{fontWeight: 600}}>Preview</span>
                  {/* You can customize the icons here */}
                  {previewActivePanelKey?.includes('2') ? (
                    <img
                      src={icons[0]}
                      height={20}
                      width={20}
                      alt='qr'
                      className='cursor-pointer'
                    />
                  ) : (
                    <img
                      src={icons[1]}
                      height={20}
                      width={20}
                      alt='qr'
                      className='cursor-pointer'
                    />
                  )}
                </div>
              }
              key='2'
            >
              <div className={downloadOptions}>
                <div className='t-flex t-justify-center'>
                  <div className='t-scale-[75%] xl:t-scale-[100%]'>
                    <Qr toggler={false} />
                  </div>
                </div>
                {barCode?.shortId && (
                  <div className='text-center'>
                    <p className=' t-font-small '>
                      URL: <span className='t-text-green-700'>{`${barCode?.shortId}`}</span>{' '}
                      <span
                        className='border px-3 py-1 cursor-pointer'
                        onClick={() => {
                          navigator.clipboard
                            .writeText(`${process.env.REACT_APP_KEY}/${barCode.shortId}`)
                            .then(() => {
                              message.success(`URL Copied`)
                            })
                            .catch((err) => {
                              message.error(`Error not coppied`)
                            })
                        }}
                      >
                        Copy
                      </span>
                    </p>
                  </div>
                )}
                {/* <QrStyle /> */}
                <span>
                  <DownloadOptions />
                </span>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  )
}

export default GeneratorBox
