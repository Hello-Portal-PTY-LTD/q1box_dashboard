import {QRCode} from 'react-qrcode-logo'
import {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {returnFileSrc} from 'utils/functions'
import {setQrErrorLevel} from 'store/barCode/barCodeSlice'

function QrCodeStylingComponent({props}) {
  const {
    bgColor,
    fgColor,
    qrEyeBallColor,
    qrEyeFrameColor,
    qrFrameColor,
    qrFrame,
    pattern,
    eyeRadius,
    logoBase,
    logo,
    aspectRatio,
    qrCodeUrl,
    qrErrorLevel,
    logoSize,
    qrTemplate,
  } = props

  const dispatch = useDispatch()
  const [found, setFound] = useState('')
  const [logoDimension, setLogoDimension] = useState({
    width: 0,
    height: 0,
  })

  const inputString = qrCodeUrl

  const memoizedEffect = useMemo(() => {
    return () => {
      if (logoSize) {
        const sizeLogo = (Number(logoSize) * 180) / 2
        if (sizeLogo && (logo?.logoBase || logo)) {
          let newWidth, newHeight
          if (aspectRatio === 1 / 1 || aspectRatio === '1') {
            newWidth = sizeLogo
            newHeight = sizeLogo
          } else if (aspectRatio === 2 / 1 || aspectRatio === '2') {
            newWidth = sizeLogo
            newHeight = sizeLogo / 1.7
          }

          setLogoDimension({width: newWidth, height: newHeight})

          let newQrErrorLevel
          if (sizeLogo <= 40) newQrErrorLevel = 'L'
          else if (sizeLogo <= 50) newQrErrorLevel = 'M'
          else if (sizeLogo <= 60) newQrErrorLevel = 'Q'
          else newQrErrorLevel = 'H'

          dispatch(setQrErrorLevel(newQrErrorLevel))
        } else {
          // console.log('Invalid logoSize:', logoSize)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoSize, logo, aspectRatio])
  useEffect(memoizedEffect, [memoizedEffect])

  useEffect(() => {
    const found = returnFileSrc(logo)?.src || logoBase || logo?.preview
    if (found) {
      setFound(found)
    } else {
      setFound('')
    }
  }, [logo?.preview, logo, logoBase, qrTemplate])

  const options = {
    qrStyle: pattern,
    size: qrFrame === 'frameRibbon' ? 200 : 270,
    bgColor: qrFrame === 'frameBoldText' ? qrFrameColor : bgColor,
    fgColor: fgColor,
    ecLevel: qrErrorLevel,
    logoWidth: logoDimension.width,
    logoHeight: logoDimension.height,
    logoImage: found,
    logoPadding: 2.5,
    eyeRadius: [
      {outer: eyeRadius?.outerRadius, inner: eyeRadius?.innerRadius},
      {outer: eyeRadius?.outerRadius, inner: eyeRadius?.innerRadius},
      {outer: eyeRadius?.outerRadius, inner: eyeRadius?.innerRadius},
    ],
    eyeColor: [
      {outer: qrEyeFrameColor, inner: qrEyeBallColor},
      {outer: qrEyeFrameColor, inner: qrEyeBallColor},
      {outer: qrEyeFrameColor, inner: qrEyeBallColor},
    ],
  }

  return (
    <>
      <div className='me'>
        <QRCode
          {...{
            ...options,
          }}
          value={inputString}
        />
      </div>
    </>
  )
}

export default QrCodeStylingComponent
