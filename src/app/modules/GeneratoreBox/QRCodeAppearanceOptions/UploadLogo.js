import React from 'react'
import {LOGOS} from '../../GeneratoreBox/utils/mock'
import RangeInput from '../macros/RangeInput'
import {useDispatch, useSelector} from 'react-redux'
import {setFileList, setLogo, setLogoBase, setLogoSize} from 'store/barCode/barCodeSlice'
import ImageCrop from '../macros/ImageCrop'

function UploadLogo() {
  const {logoUploading, logo, logoBase} = useSelector((state) => state.barCode)
  const dispatch = useDispatch()

  const handleResetClick = () => {
    dispatch(setLogoSize(0.5))
  }

  const handleLogoSelect = (file) => {
    dispatch(setLogoBase(''))
    dispatch(
      setLogo({
        file: file,
        preview: file,
      })
    )
  }

  const handleRemoveIcon = () => {
    if (!logoUploading) {
      dispatch(setFileList([]))
      dispatch(setLogoBase(''))
      dispatch(
        setLogo({
          logo: '',
          preview: '',
          url: '',
        })
      )
    }
  }

  return (
    <div className='t-space-y-5'>
      <ImageCrop />
      <div className='md:t-w-[90%] lg:t-w-full t-space-y-4'>
        <div className='t-flex t-gap-4 t-items-center'>
          <p>Logos</p>
          {(logo?.preview || logo?.url || logo?.file || logoBase) && !logoUploading && (
            <p onClick={handleRemoveIcon} className='text-sm cursor-pointer text-primary'>
              Remove Logo
            </p>
          )}
        </div>
        <div className='t-flex t-flex-wrap  t-gap-2 xl:t-gap-4 1320:t-gap-6'>
          {[1].map((item) => {
            return LOGOS.map(({src}, index) => {
              return (
                <img
                  key={index}
                  src={src}
                  width={60}
                  height={60}
                  alt='icons'
                  className='t-w-[30px] t-cursor-pointer t-h-[30px] '
                  onClick={() => {
                    handleLogoSelect(src)
                  }}
                />
              )
            })
          })}
        </div>
      </div>
      {/* <div className='space-y-4 antialiased'>
        <span className='font-medium text-base'>OR</span>
        <div className='flex flex-col md:flex-row md:items-center md:gap-5'>
          <div
            className='text-center max-w-[280px] rounded-[7px] 
          gradient px-[10px] lg:px-[30px] py-[5px] lg:py-[8px] text-white'
          >
            <label
              htmlFor='logo-input'
              className='font-semibold text-xs md:text-sm cursor-pointer'
            >
              Add Your Own Logo
            </label>
            <input
              type='file'
              id='logo-input'
              className='hidden'
              onChange={onAddLogo}
            />
          </div>
          <p className='text-sm text-t1'>Min size: 512px</p>
        </div>
      </div> */}
      <div className='t-w-[90%] lg:t-w-[70%] t-mt-5'>
        <RangeInput onReset={handleResetClick} name='logoSize' label='Logo Scaling' />
      </div>
    </div>
  )
}

export default UploadLogo
