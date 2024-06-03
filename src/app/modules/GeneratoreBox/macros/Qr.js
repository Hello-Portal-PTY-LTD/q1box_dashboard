import React, {useEffect, useState, useMemo} from 'react'
import ToggleBar from './ToggleBar'
import QrCodeStylingComponent from './QrCodeStylingComponent'
import FrameLayout from './FrameLayout'
import TemplateLayout from './TemplateLayout'
import {useDispatch, useSelector} from 'react-redux'

import {
  setPattern,
  setEyeFrame,
  setEyeFrameColor,
  setQrTemplate,
  setTemplateType,
  setBgColor,
  setEyeBall,
  setEyeBallColor,
  setFgColor,
  setLogo,
  setLogoBase,
  setInnerEyeRadius,
  setOuterEyeRadius,
  setFileList,
} from 'store/barCode/barCodeSlice'
import {GRAPHICS} from '../graphics'

function Qr({toggler = false, disableReset = false, current, fromTable = false}) {
  const [isOpen, setIsOpen] = useState(true)
  const {barCode} = useSelector((state) => state)

  const [zoomLevel, setZoomLevel] = useState(1)

  const dispatch = useDispatch()

  const formsThatHavePreview = ['AdvanceLinks', 'Video', 'Social', 'Coupon', 'Menu']
  const [customizationState, setCustomizationState] = useState({
    eyeBall: 'eye-ball-plain-square',
    eyeFrame: 'eye-frame-plain-square',
    pattern: 'plain',
    bgColor: '#ffffff',
    fgColor: '#000000',
    qrFrame: 'none',
    qrTemplate: 'none',
    qrEyeBallColor: '#000000',
    qrEyeFrameColor: '#000000',
    qrTextColor: '#000000',
    qrFrameColor: '#FF0000',
    qrCodeUrl: `${process.env.REACT_APP_QR_APP}/DefaultQrPage`,
    logoBase: '',
    logo: '',
    aspectRatio: 1 / 1,
    templateType: '',
    eyeRadius: {
      innerRadius: [0, 0, 0, 0],
      outerRadius: [0, 0, 0, 0],
    },
  })

  const memoizedCustomizationState = useMemo(() => {
    return {
      qrType: fromTable ? current?.qrType : barCode.qrType,
      eyeBall: fromTable ? current?.eyeBall : barCode.eyeBall,
      eyeFrame: fromTable ? current?.eyeFrame : barCode.eyeFrame,
      bgColor: fromTable ? current?.bgColor : barCode.bgColor,
      fgColor: fromTable ? current?.fgColor : barCode.fgColor,
      qrFrame: fromTable ? current?.qrFrame : barCode.qrFrame,
      qrTemplate: fromTable ? current?.qrTemplate : barCode.qrTemplate,
      qrEyeBallColor: fromTable ? current?.qrEyeBallColor : barCode.qrEyeBallColor,
      qrEyeFrameColor: fromTable ? current?.qrEyeFrameColor : barCode.qrEyeFrameColor,
      qrTextColor: fromTable ? current?.qrTextColor : barCode.qrTextColor,
      qrFrameColor: fromTable ? current?.qrFrameColor : barCode.qrFrameColor,

      qrCodeUrl: fromTable
        ? `${process.env.REACT_APP_KEY + '/' + current?.shortId}`
        : barCode.qrCodeUrl,
      qrFile: fromTable ? current?.qrFile : barCode.qrFile,
      templateType: fromTable ? current?.templateType : barCode.templateType,
      pattern: fromTable ? current?.pattern : barCode.pattern,
      qrFrameButtonText: fromTable ? current?.qrFrameButtonText : barCode.qrFrameButtonText,
      eyeRadius: fromTable ? current?.eyeRadius : barCode?.eyeRadius,
      logoBase: fromTable ? current?.logoBase : barCode?.logoBase,
      logo: fromTable ? current?.logo : barCode?.logo,
      aspectRatio: fromTable ? current?.aspectRatio : barCode?.aspectRatio,
      qrErrorLevel: fromTable ? current?.qrErrorLevel : barCode?.qrErrorLevel,
      id: fromTable ? current?.shortId : 'qr_parent',
      logoSize: fromTable ? current?.logoSize : barCode?.logoSize,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fromTable,
    barCode,
    barCode?.logo,
    barCode?.logoBase,
    current?.qrEyeBallColor,
    current?.qrEyeFrameColor,
    current,
  ])

  useEffect(() => {
    setCustomizationState(memoizedCustomizationState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedCustomizationState])

  const handleReset = () => {
    dispatch(setPattern('plain'))
    dispatch(setLogo(''))
    dispatch(setInnerEyeRadius([0, 0, 0, 0]))
    dispatch(setOuterEyeRadius([0, 0, 0, 0]))
    dispatch(setFgColor('#000000'))
    dispatch(setBgColor('#ffffff'))
    dispatch(setEyeFrame('eye-frame-plain-square'))
    dispatch(setEyeBall('eye-ball-plain-square'))
    dispatch(setEyeFrameColor('#000000'))
    dispatch(setEyeBallColor('#000000'))
    dispatch(setQrTemplate('none'))
    dispatch(setLogoBase(''))
    dispatch(setTemplateType('plain'))
    dispatch(setFileList([]))
  }

  useEffect(() => {
    if (window.location.pathname.includes('/create-qr')) {
      setZoomLevel(1)
    } else {
      setZoomLevel(0.5)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname])
  return (
    <div style={{zoom: zoomLevel, width: '200px'}} className='t-h-full t-w-full'>
      <div
        className={`t-flex-column   t-items-center  ${
          formsThatHavePreview.includes(barCode.qrType) ? '' : ' t-justify-between'
        }     ${isOpen ? ' t-pb-3' : 't-pb-3'} `}
      >
        {toggler && <ToggleBar label='QR Code' setIsOpen={setIsOpen} isOpen={isOpen} />}

        <div className='t-flex t-flex-col t-items-center t-gap-0'>
          <div className='t-flex t-relative t-justify-center  t-p-4 t-rounded-md  t-items-center t-w-fit '>
            {isOpen && (
              <>
                <div id={customizationState?.id}>
                  <div className=''>
                    {customizationState.qrFrame !== 'none' ? (
                      <FrameLayout {...customizationState}>
                        <QrEyesStyling
                          {...{
                            ...customizationState,
                            qrCodeUrl: customizationState.qrCodeUrl + customizationState.qrCodeUrl,
                          }}
                          fromTable={fromTable}
                        />
                      </FrameLayout>
                    ) : customizationState.qrTemplate !== 'none' ? (
                      <TemplateLayout
                        qrTemplate={customizationState.qrTemplate}
                        fgColor={customizationState.fgColor}
                      >
                        <QrEyesStyling {...customizationState} fromTable={fromTable} />
                      </TemplateLayout>
                    ) : (
                      <QrEyesStyling {...customizationState} fromTable={fromTable} />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          {!disableReset && (
            <span onClick={handleReset} className='t-row-flex  t-cursor-pointer'>
              <p className='t-text-sm 1320:t-text-base t-text-primary'>Reset</p>
              <img src={GRAPHICS.RESET} width={15} height={15} alt='check' className='t-ml-2' />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Qr

const QrEyesStyling = ({
  // eyeFrame,
  // eyeBall,
  bgColor,
  fgColor,
  qrTemplate,
  qrEyeBallColor,
  qrEyeFrameColor,
  qrFrameColor,
  qrErrorLevel,
  qrFrame,
  pattern,
  fromTable,
  eyeRadius,
  aspectRatio,
  logo,
  logoBase,
  qrCodeUrl,
  logoSize,
}) => {
  return (
    <div
      className={`${
        qrTemplate === 'ScanTagButton'
          ? 't-pb-4'
          : qrTemplate === 'ScanButton'
          ? 't-border-2 t-p-1 t-rounded-md'
          : ''
      }`}
      style={{background: bgColor, borderColor: fgColor}}
    >
      <QrCodeStylingComponent
        props={{
          bgColor,
          fgColor,
          qrEyeBallColor,
          qrEyeFrameColor,
          qrErrorLevel,
          qrFrameColor,
          qrFrame,
          pattern,
          fromTable,
          eyeRadius,
          aspectRatio,
          logo,
          logoBase,
          qrCodeUrl,
          logoSize,
          qrTemplate,
        }}
      />
    </div>
  )
}
