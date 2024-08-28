import React, {useState} from 'react'
import {
  setQrTemplate,
  setPattern,
  setEyeBall,
  setQrFrame,
  setQrFrameColor,
  setQrTextColor,
  setBgColor,
  setFgColor,
  setEyeBallColor,
  setEyeFrameColor,
  setEyeFrame,
  setLogoBase,
  setTemplateType,
  setInnerEyeRadius,
  setOuterEyeRadius,
  setSelectedTemplate,
  setLogo,
  setLogoAspect,
  setLogoSize,
} from 'store/barCode/barCodeSlice'
import {useDispatch, useSelector} from 'react-redux'
import {LOGOS} from '../utils/mock'
import {isValidUrl, returnFileSrc} from 'utils/functions'
import {deleteTemplate, getBase64} from 'store/barCode/barCodeAction'
import {GRAPHICS} from '../graphics'

function Templates() {
  const dispatch = useDispatch()
  const {templates, templateName} = useSelector((state) => state?.barCode)

  const [hoveredTemp, setHoveredTemp] = useState('')

  const handleCrossIcon = () => {
    dispatch(setPattern('plain'))
    dispatch(setFgColor('#000000'))
    dispatch(setBgColor('#ffffff'))
    dispatch(setInnerEyeRadius([0, 0, 0, 0]))
    dispatch(setOuterEyeRadius([0, 0, 0, 0]))
    dispatch(setEyeFrame('eye-frame-plain-square'))
    dispatch(setEyeBall('eye-ball-plain-square'))
    dispatch(setEyeFrameColor('#000000'))
    dispatch(setEyeBallColor('#000000'))
    dispatch(setQrTemplate('none'))
    dispatch(
      setLogo({
        file: '',
        preview: '',
      })
    )
    dispatch(setLogoBase(''))
    dispatch(setTemplateType('plain'))
    dispatch(setSelectedTemplate(1))
  }

  const handleDeleteTemp = (templatedId) => {
    dispatch(deleteTemplate(templatedId))
      .unwrap()
      .then((res) => {
        console.log('resposne: deleting', res)
      })
  }

  const handleTemplateClick = async (temp) => {
    dispatch(setSelectedTemplate(temp._id))

    switch (temp.type) {
      case 'plain':
        dispatch(setPattern('plain'))
        dispatch(setFgColor('#000000'))
        dispatch(setBgColor('#ffffff'))
        dispatch(setInnerEyeRadius([0, 0, 0, 0]))
        dispatch(setOuterEyeRadius([0, 0, 0, 0]))
        dispatch(setEyeFrame('eye-frame-plain-square'))
        dispatch(setEyeBall('eye-ball-plain-square'))
        dispatch(setEyeFrameColor('#000000'))
        dispatch(setEyeBallColor('#000000'))
        dispatch(setQrTemplate(temp.type))
        dispatch(
          setLogo({
            file: '',
            preview: '',
          })
        )
        dispatch(setLogoBase(''))
        dispatch(setTemplateType(temp?.type))
        break
      case 'dots':
        dispatch(setPattern('dots'))
        dispatch(setEyeFrame('eye-frame-rounded'))
        dispatch(setEyeBall('eye-ball-plain-square'))
        dispatch(setFgColor('#000000'))
        dispatch(setBgColor('#ffffff'))
        dispatch(setInnerEyeRadius([0, 0, 0, 0]))
        dispatch(setOuterEyeRadius([14, 14, 14, 14]))
        dispatch(setEyeFrameColor('#000000'))
        dispatch(setEyeBallColor('#000000'))
        dispatch(setQrTemplate(temp.type))
        dispatch(
          setLogo({
            file: '',
            preview: '',
          })
        )
        dispatch(setLogoBase(''))
        dispatch(setTemplateType(temp?.type))
        break

      case 'ScanButton':
        dispatch(setBgColor('#ffffff'))
        dispatch(setFgColor('#000000'))
        dispatch(setEyeFrameColor('#000000'))
        dispatch(setEyeFrame('eye-frame-rounded'))
        dispatch(setEyeBall('eye-ball-plain-square'))
        dispatch(setEyeBallColor('#000000'))
        dispatch(setPattern('dots'))
        dispatch(
          setLogo({
            file: LOGOS[0].src,
            preview: LOGOS[0].src,
          })
        )
        dispatch(setQrTemplate(temp.type))
        dispatch(setInnerEyeRadius([0, 0, 0, 0]))
        dispatch(setOuterEyeRadius([14, 14, 14, 14]))
        dispatch(setLogoBase(''))
        dispatch(setTemplateType(temp?.type))
        break
      case 'ScanTagButton':
        dispatch(setBgColor('#000000'))
        dispatch(setFgColor('#ffffff'))
        dispatch(setEyeFrameColor('#ffffff'))
        dispatch(setEyeBallColor('#ffffff'))
        dispatch(setInnerEyeRadius([0, 0, 0, 0]))
        dispatch(setOuterEyeRadius([14, 14, 14, 14]))
        dispatch(setPattern('dots'))
        dispatch(setEyeFrame('eye-frame-rounded'))
        dispatch(setEyeBall('eye-ball-plain-square'))
        dispatch(setQrTemplate(temp.type))
        dispatch(setTemplateType(temp?.type))
        dispatch(
          setLogo({
            file: LOGOS[1].src,
            preview: LOGOS[1].src,
          })
        )

        dispatch(setLogoBase(''))
        break
      case 'Custom':
        dispatch(setPattern(temp.pattern))
        dispatch(setEyeBall(temp.eyeBall))
        dispatch(setQrFrame(temp.qrFrame))
        dispatch(setQrFrameColor(temp.qrFrameColor))
        dispatch(setQrTextColor(temp.qrTextColor))
        dispatch(setBgColor(temp.bgColor))
        dispatch(setFgColor(temp.fgColor))
        dispatch(setEyeBallColor(temp.qrEyeBallColor))
        dispatch(setEyeFrameColor(temp.qrEyeFrameColor))
        dispatch(setEyeFrame(temp.eyeFrame))
        dispatch(setInnerEyeRadius(temp?.eyeRadius?.innerRadius))
        dispatch(setOuterEyeRadius(temp?.eyeRadius?.outerRadius))
        dispatch(setTemplateType(temp?.type))
        dispatch(setLogoAspect(temp?.aspectRatio))
        dispatch(setLogoSize(temp?.logoSize))
        const scans = ['ScanTagButton', 'ScanButton']
        if (scans.includes(temp.qrTemplate)) {
          dispatch(setQrTemplate(temp.qrTemplate))
        } else {
          dispatch(setQrTemplate(temp.type))
        }

        if (isValidUrl(temp?.logo) && temp?.logo) {
          dispatch(getBase64(temp?.logo))
        }
        let found = returnFileSrc(temp?.logo)
        if (found?.src) {
          dispatch(
            setLogo({
              file: found?.name,
              preview: found?.src,
            })
          )
          dispatch(setLogoBase(''))
        } else if (!found?.src) {
          dispatch(
            setLogo({
              file: '',
              preview: '',
            })
          )
          dispatch(setLogoBase(''))
        }

        break
      default:
        dispatch(setBgColor('#ffffff'))
        dispatch(setFgColor('#000000'))
        break
    }
  }

  return (
    <div className='t-grid t-grid-cols-5  t-gap-4'>
      {templates?.map((temp, index) => {
        return (
          <div
            onMouseEnter={() => {
              setHoveredTemp(temp?._id)
            }}
            onMouseLeave={() => {
              setHoveredTemp('')
            }}
            key={index}
          >
            <div
              className={`${
                temp?._id === templateName
                  ? 't-border-2 t-border-primary t-p-2 t-rounded-md'
                  : 'hover:t-border-2 hover:t-border-primary t-p-2 hover:t-rounded-md '
              }" t-relative "`}
            >
              <img
                src={temp?.qrImage}
                onClick={() => {
                  handleTemplateClick(temp)
                }}
                width={100}
                key={index}
                className={` t-cursor-pointer  t-object-cover t-w-[100px]`}
                height={100}
                alt='qr-style'
              />

              {temp._id === templateName ? (
                temp?.type !== 'plain' ? (
                  <div
                    className='t-absolute  t-rounded-full t-h-[20] t-w-[20] t-top-[-10px] t-right-[-15px]'
                    onClick={handleCrossIcon}
                  >
                    <img
                      src={GRAPHICS.CROSS}
                      width={20}
                      className='t-cursor-pointer'
                      height={20}
                      key={index}
                      alt='premium'
                    />
                  </div>
                ) : (
                  ''
                )
              ) : (
                <>
                  {temp._id === hoveredTemp && temp.type === 'Custom' ? (
                    <div
                      className='t-absolute  t-rounded-full t-h-[20] t-w-[20] t-top-[-10px] t-right-[-15px] '
                      onClick={() => {
                        handleDeleteTemp(temp?._id)
                      }}
                    >
                      <img
                        src={GRAPHICS.BIN}
                        width={20}
                        className='t-cursor-pointer'
                        height={20}
                        key={index}
                        alt='premium'
                      />
                    </div>
                  ) : (
                    ''
                  )}
                </>
              )}

              {/* <div className="absolute  rounded-full h-[20] w-[20] top-[-10px] right-[-15px]  ">

            </div> */}

              {/* {temp._id === templateName ? (
              <>
                <Image
                  src={"/assets/svgs/icons/cross.svg"}
                  width={20}
                  className="cursor-pointer"
                  height={20}
                  key={index}
                  alt="premium"
                />
              </>
            ) : temp._id != templateName ? (
              <span>
                <Image
                  src={"/assets/svgs/icons/bin.svg"}
                  width={20}
                  className="cursor-pointer"
                  height={20}
                  key={index}
                  alt="premium"
                />
              </span>
            ) : (
              ""
            )} */}
            </div>
          </div>
        )
      })}

      {/* {templates?.map((temp, index) => {
        return (
          <img
            src={temp.qrImage}
            onClick={() => {
              handleTemplateClick(temp)
            }}
            width={100}
            key={index}
            className='t-cursor-pointer  t-object-cover t-w-[100px]'
            height={100}
            alt='qr-style'
          />
        )
      })} */}
    </div>
  )
}

export default Templates
