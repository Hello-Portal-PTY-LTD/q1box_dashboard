import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import { useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setFileList, setLogo, setLogoAspect } from 'store/barCode/barCodeSlice'
import { uploadLogo } from 'store/barCode/barCodeAction'
import Loader from './Loader'
import { returnFileSrc } from 'utils/functions'
// import Loader from '_metronic/layout/components/macros/Loader'

const ImageCrop = () => {
  const [qrLogoAspect, setQrLogoAspect] = useState(1 / 1)
  const dispatch = useDispatch()
  const logo = useWatch({ name: 'logo' })
  const { logoUploading, fileList } = useSelector((state) => state.barCode)

  const onChange = ({ fileList: newFileList }) => {
    // setFileList(newFileList)
  }

  useEffect(() => {
    if (!logo?.preview && !logo?.url && !logo?.file) {
      dispatch(setFileList([]))
    } else if (logo?.file) {
      let resp = returnFileSrc(logo.file)
      if (resp) {
        dispatch(setFileList([]))
      } else {
        dispatch(setFileList([{ thumbUrl: logo.preview }]))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo])

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const handleRemove = () => {
    dispatch(setFileList([]))
    dispatch(
      setLogo('logo', {
        file: '',
        preview: '',
        url: '',
      })
    )
  }

  const handlePressOkay = (options) => {
    const { file } = options
    const reader = new FileReader()
    dispatch(setLogoAspect(qrLogoAspect))
    dispatch(uploadLogo([file]))
      .unwrap()
      .then((res) => {
        dispatch(setLogo({ file: file, preview: reader.result, url: res[0]?.url }))
      })
    if (file) {
      reader.onload = async () => {
        dispatch(
          setFileList([
            {
              ...file,
              thumbUrl: reader.result,
            },
          ])
        )
        dispatch(setLogo({ file: file, preview: reader.result, url: '' }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='t-relative'>
      <p className='t-font-medium t-text-sm t-mb-4'>Upload Logo from gallery</p>
      {logoUploading && (
        <Loader classNames={'t-w-[20px] t-z-[9999] t-top-[60px] t-absolute t-left-5 t-h-[20px]'} />
        // <Loader classNames='t-w-[20px] t-z-[9999] t-top-[40px] t-absolute t-left-5 t-h-[20px]' />
      )}
      <ImgCrop aspect={qrLogoAspect} rotationSlider>
        <Upload
          listType='picture-card'
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={handleRemove}
          customRequest={handlePressOkay}
          maxCount={1}
          type='image/png, image/jpg, image/jpeg'
          previewFile={false}
          disabled={logoUploading}
          showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
        >
          {fileList?.length === 0 && (
            <div className='t-w-full t-bg-gray-200 t-rounded-lg t-flex'>
              <div
                className={`${qrLogoAspect === 1 / 1 ? 't-bg-primary t-text-white' : ''} t-p-4 t-rounded-lg t-w-full`}
                onClick={() => {
                  setQrLogoAspect(1 / 1)
                }}
              >
                <p>1:1</p>
              </div>
              <div
                className={`${qrLogoAspect === 2 / 1 ? 't-bg-primary t-text-white' : ''} t-p-4 t-rounded-lg t-w-full`}
                onClick={() => {
                  setQrLogoAspect(2 / 1)
                }}
              >
                <p>2:1</p>
              </div>
            </div>
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}
export default ImageCrop
