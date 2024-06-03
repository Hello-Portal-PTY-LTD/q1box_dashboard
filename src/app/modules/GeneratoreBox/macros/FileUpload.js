import React, {useEffect, useState} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import Loader from './Loader'
import {uploadFileGCP, uploadLogo} from 'store/barCode/barCodeAction'
import {setProfileImage, setCoverImage, setLogoBase} from 'store/barCode/barCodeSlice'
import {GRAPHICS} from '../graphics'
import {getEditQrId} from '../utils/functions'

function FileUpload({preLabel, label, onChange, accept, name, keyIndex, qrType}) {
  const index = keyIndex
  const barCode = useSelector((state) => state.barCode)

  const [image, setImage] = useState()
  // const [curr, setCurr] = useState(null)
  const {setValue} = useFormContext()
  const dispatch = useDispatch()
  // const values = useWatch({ name: name });
  const [loading, setLoading] = useState(false)
  let getImage = barCode[name.split('.')[1]]?.url
  let products = barCode?.products || []
  let edit_qrId = getEditQrId()

  useEffect(() => {
    if (edit_qrId && qrType === 'Menu') {
      let previewImage
      if (products && products[index]?.image) {
        previewImage = products[index].image
      } else {
        previewImage = GRAPHICS.CROSS
      }
      setImage({preview: previewImage})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, edit_qrId])

  useEffect(() => {
    if ((edit_qrId && name.includes('coverImage')) || name.includes('profileImage')) {
      let previewImage
      if (getImage) {
        previewImage = getImage
      } else {
        previewImage = GRAPHICS.GALLERY
      }
      setImage({preview: previewImage})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getImage, edit_qrId])

  // useEffect(() => {
  //   setCurr(index)
  // }, [index])

  useEffect(() => {
    if (barCode.formSubmitted) {
      setImage()
    }
  }, [barCode.formSubmitted])

  const handleFile = (name, result, url, file) => {
    setValue(name, {
      file: file,
      preview: result,
      url: url,
    })
    if (name === 'preview.coverImage') {
      dispatch(
        setCoverImage({
          preview: result,
          url: url,
        })
      )
    }
    if (name === 'preview.profileImage') {
      dispatch(
        setProfileImage({
          preview: result,
          url: url,
        })
      )
    }
    if (name === 'logo') {
      dispatch(setLogoBase())
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async () => {
        setImage({
          file: file,
          preview: reader.result,
        })

        handleFile(name, reader.result, '', file)
        if (file) {
          setLoading(true)

          if (name === 'logo') {
            dispatch(uploadLogo([file]))
              .unwrap()
              .then((res) => {
                handleFile(name, reader.result, res[0]?.url, file)
                setLoading(false)
              })
          } else {
            dispatch(uploadFileGCP([file]))
              .unwrap()
              .then((res) => {
                handleFile(name, reader.result, res[0]?.url, file)
                setLoading(false)
              })
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (!onChange) return
    onChange(image)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  return (
    <div className='t-flex-column t-gap-3 t-md:gap-3 t-text-base t-md:text-lg'>
      <p className='t-font-medium t-text-sm'>{preLabel ? preLabel : label}</p>
      <div className='t-relative t-w-[50px]'>
        <input
          type='file'
          className='t-hidden'
          id={label}
          onChange={(e) => handleFileUpload(e)}
          accept={accept}
        />
        {loading && (
          <span className='t-absolute t-top-[9px] t-left-3'>
            <Loader classNames='t-w-[20px] t-h-[20px]' />
          </span>
        )}
        <label htmlFor={label}>
          {image && !loading ? (
            <img
              src={image.preview}
              alt='Selected img'
              width={40}
              height={40}
              className='t-w-[40px] t-h-[40px] t-rounded-md t-cursor-pointer'
            />
          ) : (
            <>
              <img
                src={GRAPHICS.GALLERY}
                alt='Select img'
                width={20}
                height={20}
                className='t-w-[40px] t-cursor-pointer'
              />
              <img
                src={GRAPHICS.PLUS}
                alt='Add img'
                width={15}
                height={15}
                className='t-absolute -t-right-0 t-cursor-pointer -t-top-[10px] t-z-10'
              />
            </>
          )}
        </label>
      </div>
    </div>
  )
}

export default FileUpload
