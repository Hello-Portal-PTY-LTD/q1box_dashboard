import {FC, useRef, useState} from 'react'
import {parseISO, format} from 'date-fns'
import '../../qrComponents/Style/style.css'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
import {setSelectedFolder} from 'store/qrStore/qrSlice'
import {images} from '../../../../assets'
import {QR_OPTIONS, } from '../../../../mock'
import { KTSVG } from '_metronic/helpers'
import {useOnClickOutside} from '../../../../hooks/useOnClickOutside'
type Props = {
  content: {
    name: string
    createdAt: string
    qrs?: number
    id?: string
    owner?: string
  }
  folderName?:any,
  setFolderName?:any
  setEdit?:any
  edit?:any
  setNewFolder?:any
  onChange?:any
  optionsRef:any
}

const Card: FC<Props> = ({content,setNewFolder,setEdit,edit,onChange,optionsRef}: Props) => {


  const dispatch = useDispatch<AppDispatch>()
  const onClick = () => {
    dispatch(setSelectedFolder(content.id))
  }

  return (
    <div
      className='card t-cursor-pointer t-h-full t-px-6 t-py-6 t-w-full t-shadow-md '
    >
      <div className='t-flex t-justify-end t-pb-4 t-z-50' 
      onClick={()=>setEdit(true)}
      >
       <img src={images.dotsmenu} className='t-w-[5px]' alt='dots menu' />
       </div>
      <div className='t-flex r-flex-row t-items-center t-justify-between'>
        <div className='t-flex t-flex-col t-gap-3'>
          <h5 className='t-text-[18.7px] t-font-medium'>{content.name}</h5>
          {content.createdAt && (
            <span className='t-text-[16px] t-text-t1'>
              {' '}
              {format(parseISO(content.createdAt), 'MMM dd, yyyy')}
            </span>
          )}
        </div>

        <div className='t-rounded-full t-bg-primaryblue t-flex t-flex-row t-items-center t-justify-center t-text-[qrFolders4px] t-w-20 t-h-20 text-white'>
          {content.qrs}
        </div>
      </div>
      <div className='t-absolute t-shadow-2xl t-bg-white t-z-[99999] t-rounded-xl t-top-[2rem] t-right-16 t-flex-column'
       ref={optionsRef}
      >
          {edit && QR_OPTIONS.length > 0 && (
            <ul
             
              className=' t-w-max t-py-1 t-top-[55px] t-px-1 t-left-0  t-whitespace-nowrap t-rounded-xl'
            >
              {[{label:"edit",image:"edit"}].map(({label, image}, index) => {
                return (
                  <li key={index.toString() }
                    onClick={() => {
                      setNewFolder(true)
                      onChange(content.name)
                    }}

                    className='t-cursor-pointer  t-text-t1 t-px-5 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap t-flex t-items-center t-gap-5'
                  >
                    <KTSVG path={'edit'} className=' svg-icon-5' />
                    {  label}
                    
                  </li>
                )
              })}
            </ul>
          )}
        </div>{' '}
    </div>
  )
}

export default Card
