import {useEffect, useRef, useState} from 'react'
import {useFormContext, useWatch} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {createFolder} from 'store/qrStore/qrAction'

import {useOnClickOutside} from 'hooks/useOnClickOutside'

import Loader from 'app/modules/GeneratoreBox/macros/Loader'
import {GRAPHICS} from 'app/modules/GeneratoreBox/graphics'
// import Button from '../../../../../_metronic/partials/qrComponents/Button'

const listClass = `cursor-pointer text-left pl-4 text-t1 py-1 rounded-[3px] hover:text-primary hover:font-semibold`

const LabelDropdown = ({label, listItems, handleClose, formErrors, setFormErrors}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [folderName, setFolderName] = useState()
  const qrFolder = useWatch({name: 'folder'})
  const qrName = useWatch({name: 'qrName'})
  const {setValue} = useFormContext()

  const {loading} = useSelector((state) => state.qr)
  const {user} = useSelector((state) => state.user)

  const {
    setError,
    formState: {errors},
  } = useFormContext()
  const [message, setMessage] = useState({
    info: '',
    type: '',
  })
  const [foldersList, setFoldersList] = useState([
    {
      name: '+ New Folder',
      id: 'new-folder',
    },
  ])

  const [showInput, setShowInput] = useState(false)

  const [selected, setSelected] = useState({
    name: 'Select a Folder',
    id: null,
  })

  useEffect(() => {
    setFoldersList([])
    setFoldersList([
      {
        name: '+ New Folder',
        id: 'new-folder',
      },
    ])
    setFoldersList((prev) => [...prev, ...listItems])
  }, [listItems])

  useEffect(() => {
    if (qrFolder) {
      const item = listItems.find((item) => item.id === qrFolder)
      if (item) {
        setSelected({
          name: item.name,
          id: item.id,
        })
      }
    }
  }, [listItems, qrFolder])

  const dispatch = useDispatch()

  const dropDownRef = useRef()
  useOnClickOutside(dropDownRef, () => setIsOpen(false))
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleCreateNewFolder = () => {
    if (!folderName) {
      setFormErrors({
        ...formErrors,
        folderName: {
          message: 'Folder Name is Required!',
          type: 'folderName',
        },
      })
      return
    }

    dispatch(createFolder(folderName))
      .unwrap()
      .then((res) => {
        setSelected({
          name: res.name,
          id: res.id,
        })
        const updatedFormErrors = {...formErrors}
        delete updatedFormErrors?.folder
        delete updatedFormErrors?.folderName
        setFormErrors(updatedFormErrors)
        setShowInput(false)
        setMessage({})
        setValue('folder', res.id)
      })
      .catch((err) => {
        setMessage({
          type: 'error',
          info: err,
        })
      })
  }

  const handleSelect = (value) => {
    if (showInput) {
      setShowInput(false)
    }
    if (value.id === 'new-folder') {
      setShowInput(true)
      setIsOpen(false)
      return
    }

    setSelected(value)
    setValue('folder', value.id)
    setIsOpen(false)
    setMessage({})
    const updatedFormErrors = {...formErrors}
    delete updatedFormErrors?.folder
    setFormErrors(updatedFormErrors)
  }

  const handleSaveQrCode = () => {
    let errors = {}
    if (!qrName) {
      errors = {
        ...errors,
        qrName: {
          message: 'QR Name is Required!',
          type: 'qrName',
        },
      }
    }
    if (selected.id === '' || selected.id === null) {
      errors = {
        ...errors,
        folder: {
          message: 'Folder is Required!',
          type: 'folder',
        },
      }
    }
    if (Object.keys(errors)?.length > 0 || formErrors?.length > 0) {
      setFormErrors({
        ...formErrors,
        ...errors,
      })
      return
    }
  }

  const crossIconClass = `
   font-bold rounded-full cursor-pointer
   t-w-[14px] t-h-[14px] t-mt-3 `
  return (
    <div className='t-relative t-w-[80%] flex-column t-gap-2' ref={dropDownRef}>
      {label && (
        <p className='t-block t-text-sm lg:t-text-base t-font-medium t-text-gray-90'>{label}</p>
      )}
      <button
        name='drop-down'
        className='t-bg-light t-text-t1 t-gap-6 t-px-4 t-w-full t-py-3 t-rounded-xl t-flex t-items-center t-whitespace-nowrap t-justify-between t-border t-border-grey'
        onClick={toggleDropdown}
        type='button'
      >
        {selected.name}
      </button>
      {formErrors?.folder?.type === 'folder' && (
        <p className='t-text-primary'>{formErrors?.folder?.message}</p>
      )}

      {isOpen && foldersList?.length > 0 && (
        <ul className='t-absolute t-z-50 t-mt-[0px] t-max-h-[150px] t-overflow-auto t-flex-column t-w-full t-py-1 t-top-[65px] t-left-0 t-bg-light t-border t-border-grey t-rounded-xl'>
          {foldersList.map(({name, id}, index) => (
            <li
              key={index * Math.random()}
              onClick={() => {
                handleSelect({name: name, id: id})
              }}
              className={`t-cursor-pointer t-text-left t-pl-4 t-text-t1 t-py-1 t-rounded-[3px] hover:text-primary hover:t-font-semibold ${
                id === 'new-folder' ? 't-text-[indigo]' : ''
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {showInput ? (
        <div className='t-relative t-w-full t-flex t-gap-2 t-mt-3'>
          <input
            className='t-input'
            placeholder='Create New Folder'
            name='folderName'
            onChange={(e) => {
              setFolderName(e.target.value)
              if (e.target.value?.length > 0) {
                const updatedFormErrors = {...formErrors}
                delete updatedFormErrors?.folderName
                setFormErrors(updatedFormErrors)
              }
            }}
          />
          {}

          <div
            onClick={handleCreateNewFolder}
            className='t-gradient t-cursor-pointer t-flex t-w-[20%] t-py-2.5 t-text-center t-justify-center t-items-center t-text-lg t-font-medium t-rounded-md'
          >
            {loading ? (
              <Loader classNames='t-w-[23px] t-!m-0' />
            ) : (
              <span className='text-white'>Add</span>
            )}
            {/*  */}
          </div>

          <img
            className={crossIconClass}
            src={GRAPHICS.CROSS_BLACK}
            alt='icon'
            width={20}
            height={20}
            onClick={() => {
              setShowInput(false)
              const updatedFormErrors = {...formErrors}
              delete updatedFormErrors?.folderName
              setFormErrors(updatedFormErrors)
            }}
          />
        </div>
      ) : (
        ''
      )}
      {formErrors?.folderName?.type && (
        <div className='t-text-primary'>{formErrors?.folderName?.message}</div>
      )}
      <p className='t-text-primary'>{message?.info}</p>

      <div className='t-flex t-justify-between t-mt-5'>
        <button
          type='button'
          className='t-text-primary t-text-center 375:t-w-[70%] 500:t-w-[30%] t-border t-border-primary t-focus:outline-none t-focus:ring-4 t-font-medium t-rounded-lg t-text-sm t-px-5 t-py-2.5 t-mr-2 t-mb-2'
          onClick={handleClose}
        >
          Cancel
        </button>
        {/* {(qrName?.length === 0 || qrFolder?.length === 0) && (
          <button
            type='button'
            // disabled={message?.info && mFessage?.type !== 'success'}
            className='t-text-white t-text-center 375:t-w-[70%] 500:t-w-[30%] t-border t-gradient t-font-medium t-rounded-lg t-text-lg t-px-5 t-py-2.5 t-mr-2 t-mb-2 '
            onClick={handleSaveQrCode}
          >
            Save
          </button>
        )} */}
        <button
          type={`${qrName?.length > 0 && qrFolder?.length > 0 ? 'submit' : 'button'}`}
          // disabled={message?.info && message?.type !== 'success'}
          className='t-text-white t-text-center 375:t-w-[70%] 500:t-w-[30%] t-border t-gradient t-font-medium t-rounded-lg t-text-lg t-px-5 t-py-2.5 t-mr-2 t-mb-2 '
          onClick={handleSaveQrCode}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default LabelDropdown
