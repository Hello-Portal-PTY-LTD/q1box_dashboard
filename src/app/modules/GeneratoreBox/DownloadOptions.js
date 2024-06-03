import {useEffect, useState} from 'react'
import {downloadQRCode, getEditQrId} from './utils/functions'
import Button from './macros/Button'
import {useFormContext, useWatch} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'

import {setFolderModal} from 'store/barCode/barCodeSlice'
import {GRAPHICS} from './graphics'

function DownloadOptions({disableDownloadText}) {
  const {loading, qrType} = useSelector((state) => state.barCode)
  const [selectedOption, setSelectedOption] = useState('PNG')
  const {logoUploading} = useSelector((state) => state.barCode)
  const [btnName, setBtnName] = useState('')
  const {setValue} = useFormContext()
  const params = new URLSearchParams(window.location.search)
  const user = useSelector((state) => state.auth.user)
  const paramsToken = params.get('token')
  const [isOpen, setIsOpen] = useState(false)
  const edit_qrId = getEditQrId()
  const current = useWatch({name: 'qrDownloadOption'})
  const options = ['PNG', 'SVG']
  const dispatch = useDispatch()
  const {formState} = useFormContext()
  const hasErrors = Object.keys(formState?.errors).length > 0

  const token = paramsToken || JSON.parse(localStorage.getItem('userInfo'))?.token
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (token) {
      if (edit_qrId) {
        setBtnName('Save Changes')
      } else if (qrType === 'BulkUpload') {
        setBtnName('Create QR Batch')
      } else {
        setBtnName('Create QR Code')
      }
    } else {
      setBtnName('Sign up to continue')
    }
  }, [qrType, token, edit_qrId])

  const option = useWatch({name: 'qrDownloadOption'})
  useEffect(() => {
    if (edit_qrId && current) {
      setSelectedOption(current)
    }
  }, [edit_qrId, current])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setValue('qrDownloadOption', option)
    setIsOpen(false)
  }

  const handleButtonClick = () => {
    dispatch(setFolderModal(true))
  }

  return (
    <div className='t-flex-column t-gap-0 t-items-center t-text-center t-font-[500] t-mt-2'>
      <div className='t-flex t-gap-2 t-items-center t-mb-2'>
        {!disableDownloadText && <p className='t-font-bold t-text-t2 '>DOWNLOAD IN</p>}
        <div className='t-relative t-inline-block'>
          <div
            className='t-rounded t-px-4 t-py-2 t-cursor-pointer t-flex t-gap-3'
            onClick={toggleDropdown}
          >
            <p className='t-text-[blue]'> {selectedOption}</p>
            <img src={GRAPHICS.ARROW_DOWN} width={12} height={12} alt='arrowdown' />
          </div>
          {isOpen && (
            <div className='t-absolute t-z-50 t-bg-white'>
              {options.map((option, index) => (
                <div
                  key={index}
                  className='t-px-4 t-py-2 t-cursor-pointer hover:t-bg-gray-100'
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {edit_qrId ? (
        <Button
          text={'Download'}
          actionType={'button'}
          className='t-w-full  t-font-medium '
          loading={loading}
          onClick={() => {
            downloadQRCode('HIGH', option, 'logo', 'qr_parent')
          }}
        />
      ) : (
        ''
      )}
      <div className='t-w-full t-my-4'>
        <Button
          text={btnName}
          className={`t-w-[70%] lg:t-w-full t-font-medium ${
            (hasErrors || logoUploading || user?.role === 'viewer') && 't-opacity-[0.8]'
          }`}
          type='fill'
          actionType='button'
          loading={loading}
          disable={logoUploading || hasErrors || user?.role === 'viewer'}
          onClick={handleButtonClick}
        />
      </div>
      {hasErrors && (
        <p className='t-text-primary'>Please check and fill the mandatory fields to proceed.</p>
      )}
    </div>
  )
}

export default DownloadOptions
