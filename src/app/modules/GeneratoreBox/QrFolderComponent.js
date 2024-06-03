import React, {useEffect, useState} from 'react'
import FolderDropDown from './macros/foldedropdown'
import {useDispatch, useSelector} from 'react-redux'
import {FolderModal} from './FolderModal'
import {getUserQrFolders} from 'store/qrStore/qrAction'
import {useFormContext, useWatch} from 'react-hook-form'

const QrFolderComponet = ({open, close}) => {
  const {foldersInfo} = useSelector((state) => state.qr)
  const [formErrors, setFormErrors] = useState({})
  const barCode = useSelector((state) => state.barCode)
  const {setValue} = useFormContext()
  const name = useWatch({name: 'qrName'})
  const bulkName = useWatch({name: 'bulkName'})

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserQrFolders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e, name) => {
    setValue(name, e.target.value)
    if (e.target.value.trim().length > 0) {
      if (e.target.value.trim().length > 20) {
        setFormErrors({
          ...formErrors,
          [name]: {
            message: 'Name Must be less than 20 characters',
            type: name,
          },
        })
      } else {
        const updatedFormErrors = {...formErrors}
        delete updatedFormErrors?.[name]
        setFormErrors(updatedFormErrors)
      }
    } else {
      setFormErrors({
        ...formErrors,
        [name]: {
          message: 'Name is Required!',
          type: name,
        },
      })
    }
  }

  return (
    <div>
      <FolderModal
        open={open}
        handleClose={() => {
          close()
        }}
        childrenClass={''}
        children={
          <>
            <div className='t-relative t-w-[80%] t-flex-column t-gap-2 t-pb-5'>
              {barCode.qrType !== 'BulkUpload' && (
                <>
                  <label>Give a name to your QR code</label>
                  <input
                    placeholder='QR Name'
                    className='t-bg-[white] t-input'
                    value={name}
                    onChange={(e) => {
                      handleChange(e, 'qrName')
                    }}
                  />
                  {formErrors?.qrName?.type && (
                    <div className='t-bg-white t-text-primary'>{formErrors?.qrName?.message}</div>
                  )}
                </>
              )}
              {barCode.qrType === 'BulkUpload' && (
                <>
                  <label>Give a name to Bulk codes</label>
                  <input
                    placeholder='Bulk Name'
                    className='t-bg-[white] t-input'
                    value={bulkName}
                    onChange={(e) => {
                      handleChange(e, 'bulkName')
                    }}
                  />
                  {formErrors?.bulkName?.type && (
                    <div className='t-bg-white t-text-primary'>{formErrors?.bulkName?.message}</div>
                  )}
                </>
              )}
            </div>

            <FolderDropDown
              label={'Select Folder'}
              listItems={foldersInfo?.qrFolders}
              handleClose={close}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
            />
          </>
        }
        className={'t-w-[85%] md:t-w-[60%] lg:t-w-[40%] 1620:t-w-[30%]  1720:t-w-[30%]'}
      />
    </div>
  )
}

export default QrFolderComponet
