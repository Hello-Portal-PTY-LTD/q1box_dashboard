import React, {useEffect, useRef, useState} from 'react'
import {useOnClickOutside} from '../../../hooks/useOnClickOutside'
import {KTSVG} from '../../helpers'
import './Style/style.css'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import Button from './Button'
import {GRAPHICS} from 'app/modules/GeneratoreBox/graphics'
import {createLabel} from 'store/qrStore/qrAction'

interface ListItem {
  label: string
  value: string
}

interface ListItem {
  label: string
  value: string
}
interface Props {
  title: string
  label?: string
  value?: string
  listItems: ListItem[] // Use 'ListItem[]' instead of 'ListItem[{label: string; value: string}]'
  fontsize?: string
  primary?: boolean
  setSelectedItem?: any
  onClick?: any
  filterClear?: any
}
const DropdownCheckbox: React.FC<Props> = ({
  title,
  label,
  setSelectedItem,
  value,
  listItems,
  fontsize,
  onClick,
  filterClear,
  primary = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const {selectedFolder} = useSelector((state: RootState) => state.qr)
  const [openCreateLabel, setOpenCreateLabel] = useState(false)
  const dispatch = useDispatch()
  const [newLabel, setNewLabel] = useState('')
  const [labelError, setLabelError] = useState('')
  const dropDownRef = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  useOnClickOutside(dropDownRef, () => setIsOpen(false))

  const [selected, setSelected] = useState({
    label: '',
    value: '',
  })

  useEffect(() => {
    if (selectedFolder) {
      const selectedItem = listItems.find((item) => item.value === selectedFolder)
      if (selectedItem) {
        setSelected(selectedItem)
      }
    }
  }, [selectedFolder, listItems])

  const listClass = `t-cursor-pointer t-text-t1 t-px-6 t-py-2 t-rounded-[3px] hover:t-bg-gray-100`
  useEffect(() => {
    if (title === 'Select a Label' && !listItems.some((item) => item.value === 'newlabel')) {
      listItems.unshift({label: 'Create New Label', value: 'newlabel'})
    }
  }, [title, label, listItems])

  useEffect(() => {
    setSelected({label: '', value: ''})
  }, [filterClear])

  const handleCreateLabel = () => {
    if (newLabel === '' || newLabel === null) {
      setLabelError('Please Enter a Label Name')
    } else {
      setLabelError('')
      dispatch(createLabel(newLabel))
        .unwrap()
        .then((res: any) => {
          setSelected({label: res.name, value: res.id})
          setSelectedItem && setSelectedItem(res.id)
          setOpenCreateLabel(false)
          setNewLabel('')
        })
        .catch(() => {
          // setLableModal(false)
        })
    }
  }

  return (
    <div className='t-w-full'>
      <div className='t-relative flex-column t-gap-2' ref={dropDownRef}>
        {label && (
          <p className='t-block t-text-sm lg:t-text-[16px] t-mb-2 t-font-medium t-text-gray-90'>
            {label}
          </p>
        )}
        <button
          name='drop-down'
          className={`t-w-full ${
            primary
              ? 't-bg-primary t-text-white'
              : 't-bg-white t-text-t1 t-text-[16px] t-shadow-md t-border t-h-[50px]'
          } t-gap-6 t-px-7 t-py-4 t-rounded-full t-flex t-items-center t-whitespace-nowrap t-justify-between`}
          onClick={toggleDropdown}
        >
          <span>{selected?.label?.length > 0 ? selected.label : title}</span>
          {primary ? (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down_white.svg' className='svg-icon-5' />
          ) : (
            <KTSVG path='/media/svg/qr_dashboard/chevron_down.svg' className='svg-icon-5' />
          )}
        </button>
        {isOpen && listItems?.length > 0 && (
          <>
            <ul className='t-absolute t-z-[9999999]  t-max-h-[350px] t-text-[16px] t-flex-column t-w-full t-py-1 t-top-[55px] t-left-0 t-bg-white t-border t-border-greyp t-rounded-xl t-overflow-scroll'>
              {listItems.map(({label, value}, index) => {
                const inputId = `radio-${index}`
                return (
                  <>
                    {/* <label htmlFor={inputId} className={`${listClass} t-flex t-items-center t-gap-3`}>
                    <input type='radio' className='rounded-radio' id={inputId} name='radio-group' />
                    <li>{label}</li>
                  </label> */}
                    <label
                      htmlFor={inputId}
                      className={`${listClass} t-flex t-items-center t-gap-3`}
                    >
                      <input
                        type='radio'
                        className='option-input radio rounded-radio'
                        id={inputId}
                        name='radio-group'
                        onClick={() => {
                          if (value === 'newlabel') {
                            setOpenCreateLabel(true)
                          } else {
                            setSelected({label: label, value: value})
                            setSelectedItem && setSelectedItem(value)
                          }
                          toggleDropdown()
                          onClick && onClick(value)
                        }}
                      />
                      {label === 'Create New Label' ? (
                        <span className='t-font-bold'>{label}</span>
                      ) : (
                        <span>{label}</span>
                      )}
                    </label>
                  </>
                )
              })}
            </ul>
          </>
        )}
        {openCreateLabel && (
          <>
            <div className='t-relative t-w-full  t-mt-3 t-flex t-gap-3 t-justify-center t-align-middle t-items-center'>
              <input
                className='t-input  t-w-[60%]'
                placeholder='Enter Label Name'
                name='labelname'
                onChange={(e: any) => {
                  setNewLabel(e.target.value)
                }}
              />

              <Button
                Name='Create Label'
                click={handleCreateLabel}
                primary
                className='t-w-[25%] t-h-[40px] t-text-center t-align-middle'
              />
              <img
                className={GRAPHICS.CROSS_BLACK}
                src={GRAPHICS.CROSS_BLACK}
                alt='icon'
                width={15}
                height={15}
                onClick={() => {
                  setOpenCreateLabel(false)
                }}
              />
            </div>
            <div className='t-text-primary t-text-sm t-ml-6 t-mt-2'>{labelError}</div>
          </>
          // <div className='  t-w-full t-mt-5 t-flex t-gap-3 t-justify-center t-align-middle t-items-center'>
          //   <div className='t-h-[60px] t-gap-3  t-w-full'>
          //     <input
          //       className='t-input'
          //       placeholder='Create New Folder'
          //       name='folderName'
          //       onChange={(e) => {}}
          //     />
          //     {/* <p className='t-text-primaryblue t-mt-3'>{err}</p> */}
          //   </div>
          //   {/* <Input
          //     className='t-h-[50px] t-w-[60%] t-rounded-full '
          //     placeholder='Enter Label Name'
          //     onChange={(e: any) => {
          //       setNewLabel(e.target.value)
          //     }}
          //   /> */}

          //   {/* <Button Name='Create Label' click={handleCreateLabel} primary className='t-w-[30%]' /> */}
          //   {/* <button
          //     onClick={handleCreateLabel}
          //     type='button'
          //     className='t-border t-border-[#D0D5DD] t-h-[50px] t-bg-primaryblue t-text-white t-py-3 t-px-2 t-rounded-xl t-w-[20%] t-font-medium'
          //   >
          //     Create
          //   </button> */}
          //   <img
          //     src={GRAPHICS.CROSS_BLACK}
          //     alt='icon'
          //     className='t-cursor-pointer'
          //     width={15}
          //     height={15}
          //     onClick={() => {
          //       setOpenCreateLabel(false)
          //     }}
          //   />
          // </div>
        )}
      </div>
      {isOpen ? (
        <div
          className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)]'
          onClick={toggleDropdown}
        ></div>
      ) : (
        ''
      )}
    </div>
  )
}

export default DropdownCheckbox
