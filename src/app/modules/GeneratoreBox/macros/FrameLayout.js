import {useState, useEffect} from 'react'
import {QRCode} from 'react-qrcode-logo'
import {returnFileSrc} from 'utils/functions'

const Ribbon = ({color}) => (
  <svg
    width='100%'
    height='101'
    viewBox='0 0 657 44'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M46 52.5L0.5 0H657L596.5 47.5L657 100.5H0.5L46 52.5Z' fill={color} />
  </svg>
)
function FrameLayout({
  children,
  fgColor,
  bgColor,
  qrFrame,
  pattern,
  qrTextColor,
  qrCodeUrl,
  qrFrameColor,
  logo,
  logoBase,
  qrFrameButtonText,
}) {
  const parentClass = `${qrFrame !== 'frameRibbon' ? 'h-[309px]' : ''}`
  const inputString = qrCodeUrl
  const [found, setFound] = useState('')

  useEffect(() => {
    const found = returnFileSrc(logo)?.src || logoBase || logo?.preview
    if (found) {
      setFound(found)
    } else {
      setFound('')
    }
  }, [logo?.preview, logo, logoBase])

  const options = {
    qrStyle: pattern,
    size: 190,
    bgColor: qrFrame === 'frameBoldText' ? qrFrameColor : bgColor,
    fgColor: fgColor,
    ecLevel: 'H',
    logoImage: found,
  }
  return (
    <div className='t-w-full t-flex t-flex-col t-items-center '>
      {qrFrame !== 'roundedFrame' && (
        <div
          className={`t-m-auto t-items-center ${parentClass} t-gap-2 t-flex-column t-justify-between t-p-4 t-rounded-md`}
          style={{background: qrFrameColor}}
        >
          {qrFrame !== 'frameRibbon' && (
            <div
              className={`t-w-[75%] t-min-h-[40px] t-text-2xl t-top-4 t-text-center  
            t-p-1 t-rounded-md t-border t-font-semibold t-border-white ${
              qrFrame === 'frameBoldText' ? `t-bg-white` : 't-bg-transparent'
            }`}
              style={{color: qrTextColor}}
            >
              {qrFrameButtonText}
            </div>
          )}
          {children}
        </div>
      )}
      {qrFrame === 'frameRibbon' && (
        <RibbonFrame
          fgColor={fgColor}
          qrFrameButtonText={qrFrameButtonText}
          qrFrameColor={qrFrameColor}
          qrTextColor={qrTextColor}
        />
      )}

      {/* ROUNDED FRAME */}
      {qrFrame === 'roundedFrame' && (
        <div className='t-relative t-flex t-items-center t-justify-center t-h-[302px] t-w-[302px] t-overflow-hidden t-rounded-full'>
          <div className='t-absolute t-z-[31] t-p-4'>
            <QRCode {...options} value={inputString} />
          </div>
          <div
            className={`absolute  t-z-30 t-m-auto t-items-center t-gap-2 t-flex-column t-justify-center t-p-2 t-rounded-full t-h-[302px] t-w-[302px]`}
            style={{
              border: '8px solid',
              borderColor: qrFrameColor,
              clipPath: 'circle(50% at center)',
            }}
          >
            {children}
          </div>
          <div
            className='t-absolute t-h-[302px] t-w-[302px] t-rounded-full t-z-40'
            style={{
              border: '8px solid',
              borderColor: qrFrameColor,
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

export default FrameLayout

const RibbonFrame = ({qrFrameColor, qrFrameButtonText, qrTextColor}) => {
  return (
    <div className='w-full t-relative'>
      {/* <img className='t-mt-3' src='/assets/svgs/ribbon.svg' /> */}
      <div className='-t-mt-16 t-flex t-justify-center t-min-w-[350px]  t-max-w-[350px]'>
        <Ribbon color={qrFrameColor} />
      </div>

      <div className=''>
        <div
          className='t-bottom t-flex t-items-center'
          style={{background: qrFrameColor, margin: 'auto', width: '84%'}}
        />
      </div>
      <span
        style={{background: qrFrameColor, color: qrTextColor}}
        className='t-w-[50%] t-bottom-[15px] t-font-medium t-text-lg t-left-[25%] t-border t-border-white t-text-center t-py-[6px] t-rounded t-absolute'
      >
        {qrFrameButtonText}
      </span>
    </div>
  )
}
