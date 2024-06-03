import React, {useEffect, useRef, useState} from 'react'
import {Button, DropdownCheckbox} from '../../../../../_metronic/partials/qrComponents'
import {KTSVG} from '../../../../../_metronic/helpers'
import {images} from '../../../../../assets'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {QR_OPTIONS, QR_HAVE_PREVIEW} from '../../../../../mock'
import Modal from './Modal'
import {useDispatch, useSelector} from 'react-redux'
import {getAllQrCodes, getUserQrFolders, setTemplate, updateQrCode} from 'store/qrStore/qrAction'
import {message} from 'antd'

import {camelize, formatDate} from 'utils/functions'
import * as authHelper from '../../../auth/core/AuthHelpers'
import {Badge} from 'antd'
import CopyText from '../macros/CopyText'
import {saveQrCode, uploadLogo} from 'store/barCode/barCodeAction'
import Qr from 'app/modules/GeneratoreBox/macros/Qr'
import {setTemplateLoading} from 'store/barCode/barCodeSlice'
import {convertToFile, downloadQRCode} from 'app/modules/GeneratoreBox/utils/functions'
import {Link} from 'react-router-dom'

const actions = {
  AdvanceLinks: 'Advance Links',
  LandingPage: 'Landing Page',
  Url: 'URL',
  ReviewCollector: 'Review Collector',
  Calendar: 'Calendar',
  Social: 'Social',
  Menu: 'Menu',
  AppDownload: 'App Download',
  Location: 'Location',
  Sms: 'SMS',
  MakeCall: 'Make Call',
  SendEmail: 'Send Email',
  ShowText: 'Show Text',
  UploadImage: 'Upload Image',
  DownloadPdf: 'Download PDF',
  Video: 'Video',
  Coupon: 'Coupon',
  Forms: 'Forms',
  BusinessCard: 'Business Card',
}

const CardQR = ({content, isChecked, handleCheck}) => {
  const [deleteQr, setDeleteQr] = useState(false)
  const [blockQr, setBlockQr] = useState(false)
  const [edit, setEdit] = useState(false)
  const [moveFolder, setFolderMove] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState()
  const [labelmodal, setLableModal] = useState(false)
  const [label, setLabel] = useState(null)

  const dispatch = useDispatch()

  const createSpaceInWords = (word) => {
    return word.replace(/([a-z])([A-Z])/g, '$1 $2')
  }

  const createSpaceInType = (word) => {
    const actionLabel = actions[word]
    return actionLabel
  }

  const optionsRef = useRef()
  const {foldersInfo, qrLabels, offset} = useSelector((state) => state.qr)
  const {id: userId} = useSelector((state) => state?.auth?.user)
  const [formedFolders, setFormedFolders] = useState()
  const [formedLabels, setFormedLabels] = useState([])
  const [duplicate, setDuplicate] = useState(false)

  const closeModal = () => setFolderMove(false)
  useOnClickOutside(optionsRef, () => setEdit(false))
  const role = localStorage.getItem('role')
  const roles = ['viewer', 'whiteLabel']
  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      let formedData = foldersInfo?.qrFolders.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedFolders(formedData)
    }
  }, [foldersInfo?.qrFolders])

  useEffect(() => {
    if (qrLabels?.length > 0) {
      let formedData = qrLabels.map(({name, id}) => {
        return {
          title: name,
          label: name,
          value: id,
        }
      })
      setFormedLabels(formedData)
    }
  }, [qrLabels])

  const handleUpdateLabel = () => {
    if (!content._id || !label) return
    setLableModal(false)
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          label: label,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(`Label Added successfully`)
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
      })
  }
  const handleFolderOk = () => {
    if (!content._id || !selectedFolder) return
    closeModal()
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          folder: selectedFolder,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(`Moved to folder`)
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
        const userId = authHelper.getAuth()?.userId
        dispatch(getUserQrFolders({userId}))
      })
  }

  const handleOptionClick = async (label) => {
    setEdit(false)
    if (label === 'Send to Folder') {
      setFolderMove(true)
    }
    if (label === 'Delete') {
      setDeleteQr(true)
    }
    if (label === 'Add Label') {
      setLableModal(true)
    }
    if (label === 'Block') {
      setBlockQr(true)
    }
    if (label === 'Duplicate') {
      setDuplicate(true)
    }
    if (label === 'Save as Template') {
      const qrImage = await downloadQRCode('HIGH', 'PNG', '', content?.shortId)
      let newFile = await convertToFile(qrImage, 'qr', 'PNG')
      dispatch(setTemplateLoading(true))
      dispatch(uploadLogo([newFile]))
        .unwrap()
        .then((res) => {
          const templateData = {
            userId: userId,
            type: 'Custom',
            qrImage: res[0]?.url,
            qrStyle: content.qrStyle,
            qrFrame: content.qrFrame,
            qrFrameColor: content.qrFrameColor,
            qrEyeBallColor: content.qrEyeBallColor,
            qrEyeFrameColor: content.qrEyeFrameColor,
            qrTextColor: content.qrTextColor,
            bgColor: content.bgColor,
            fgColor: content.fgColor,
            logo: content.logo,
            logoSize: content.logoSize,
            eyeBall: content.eyeBall,
            eyeFrame: content.eyeFrame,
            pattern: content.pattern,
            qrTemplate: content?.qrTemplate,
            eyeRadius: content?.eyeRadius,
            aspectRatio: content?.aspectRatio,
          }
          dispatch(setTemplate(templateData))
            .then(() => {
              message.success('Template Saved Successfully')
              dispatch(setTemplateLoading(false))
            })
            .catch((err) => {
              dispatch(setTemplateLoading(false))
              message.error('Error While Saving Template')
            })
        })
        .catch(() => {
          dispatch(setTemplateLoading(false))
          message.error('Error While Saving Template')
        })
    }
  }

  const handleDeletePost = () => {
    const afterDelete = () => {
      setDeleteQr(false)
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
      const userId = authHelper.getAuth()?.userId
      dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
    }
    updateQrStatus('Deleted', 'QR Deleted Successfully', afterDelete)
  }

  const handleBlockQr = () => {
    const afterDelete = () => {
      setBlockQr(false)
      dispatch(getAllQrCodes({type: 'all', offset: offset}))
    }
    const status = content.qrStatus === 'Blocked' ? 'Active' : 'Blocked'
    updateQrStatus(status, 'QR Status Updated Successfully', afterDelete)
  }

  const updateQrStatus = (status, updateMessage, handleAfterDelete) => {
    dispatch(
      updateQrCode({
        qrId: content._id,
        data: {
          qrStatus: status,
        },
      })
    )
      .unwrap()
      .then(() => {
        message.success(updateMessage)
        handleAfterDelete && handleAfterDelete()
      })
  }

  // const handleEditQr = (value) => {
  //   window.location.href = `/dashboard/create-qr/?eid=${value}`
  // }

  const handleDownload = (format) => {
    let name = content?.qrName || 'logo'
    downloadQRCode('HIGH', format, name, content?.shortId)
  }

  const handleDuplicateQR = () => {
    setDuplicate(false)
    let camelizeName = camelize(content.qrType)
    let qrInfo = {
      qrName: content.qrName,
      qrType: content.qrType,
      eyeBall: content.eyeBall,
      eyeFrame: content.eyeFrame,
      pattern: content.pattern,
      bgColor: content.bgColor,
      fgColor: content.fgColor,
      qrFrame: content.qrFrame,
      qrTemplate: content.qrTemplate,
      qrEyeBallColor: content.qrEyeBallColor,
      qrEyeFrameColor: content.qrEyeFrameColor,
      qrTextColor: content.qrTextColor,
      qrFrameColor: content.qrFrameColor,
      eyeRadius: content.eyeRadius,
      aspectRatio: content?.aspectRatio,
      logoSize: content?.logoSize,
      logo: content?.logo,
      [camelizeName]: content[camelizeName],
    }

    if (content.folder.length > 0) {
      qrInfo.folder = content.folder[0]._id
    }
    if (content.label.length > 0) {
      qrInfo.label = content.label[0]._id
    }

    dispatch(
      saveQrCode({
        ...qrInfo,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllQrCodes({type: 'all', offset: offset}))
      })
  }

  return (
    <>
      <div className='t-relative'>
        <div>
          <div className='t-bg-white t-shadow-md t-rounded-xl t-w-full t-overflow-auto'>
            <Badge.Ribbon
              placement='start'
              style={{
                marginLeft: '5px',
                marginTop: '-5px',
                display: `${
                  content?.label?.length > 0 && content?.label[0]?.name ? 'block' : 'none'
                }`,
                maxWidth: '100%',
              }}
              text={content?.label?.length > 0 && content?.label[0]?.name}
            >
              <div
                key={content?._id}
                className=' sm:t-flex t-max-w-full t-items-center t-py-6 t-px-5 sm:t-px-10'
              >
                <div className='t-flex t-items-center t-flex-wrap sm:t-flex-nowrap mt-2 t-pl-2  lg:t-w-[600px]'>
                  <div>
                    <input
                      type='checkbox'
                      onChange={() => handleCheck(content?._id)}
                      checked={isChecked.includes(content?._id)}
                      style={{transform: 'scale(2)'}}
                    />
                  </div>
                  <div className='t-scale-[75%] md:t-scale-[100%] w-full md:w-auto'>
                    <Qr fromTable={true} current={content} disableReset={true} toggler={false} />
                  </div>
                </div>
                <div className='t-flex t-flex-col xl:t-flex-row t-gap-5 t-items-center t-justify-evenly t-w-full t-text-[14px] xl:t-text-[16px]'>
                  {/* <div className='t-w-[100px] t-max-w-[100px]'>
                    <Qr fromTable={true} current={content} disableReset={true} toggler={false} />
                  </div> */}
                  <div className='t-w-full xl:t-w-fit t-flex t-flex-col t-gap-2 '>
                    <h3 className='t-text-[20px] xl:t-text-[24px] t-text-primary t-font-medium '>
                      {createSpaceInWords(content?.qrName ? content?.qrName : 'No Name')}
                    </h3>
                    <p className=' t-font-small '>
                      QR Status: <span className='t-text-green-700'>{content?.qrStatus}</span>
                    </p>
                    <p className=' t-font-small '>
                      QR URL: <span className='t-text-green-700'>{`${content?.shortId}`}</span>{' '}
                      <span
                        className='border px-3 py-1 cursor-pointer'
                        onClick={() => {
                          navigator.clipboard
                            .writeText(`${process.env.REACT_APP_KEY}/${content.shortId}`)
                            .then(() => {
                              message.success(`URL Coppied`)
                            })
                            .catch((err) => {
                              message.error(`Error not coppied`)
                            })
                        }}
                      >
                        Copy
                      </span>
                    </p>
                    <p className=' t-font-small '>
                      QR Type:{' '}
                      <span className='t-text-primary'>{createSpaceInType(content?.qrType)}</span>
                    </p>
                    <p className=' t-font-small '>
                      Created: <span> {formatDate(content?.createdAt)}</span>
                    </p>

                    <div className='t-flex t-flex-row t-items-center t-gap-3'>
                      <KTSVG
                        path='/media/svg/qr_dashboard/folder-grey.svg'
                        className=' svg-icon-1'
                      />
                      <p className=' t-font-medium'>{content?.folder?.name}</p>
                    </div>
                  </div>
                  <div className='t-hidden md:t-block t-w-[0.5px] t-bg-[#9D9DA6]' />
                  <div className='t-w-full xl:t-w-fit t-flex t-flex-col md:t-gap-2'>
                    <p className=' t-font-medium'>
                      Total Scans:{' '}
                      <span className='t-text-[20px] xl:t-text-[24px]'>{content?.scanCount}</span>
                    </p>
                    <p className=' t-font-medium'>{content?.site}</p>
                    <div className='t-flex t-flex-row t-items-center t-gap-3'>
                      <KTSVG
                        path='/media/svg/qr_dashboard/folder-grey.svg'
                        className=' svg-icon-1'
                      />
                      <p className=' t-font-medium'>Modified: {formatDate(content?.updatedAt)}</p>
                    </div>
                  </div>

                  <div className='t-flex t-w-full xl:t-w-fit t-flex-col t-gap-4'>
                    {!roles.includes(role) && (
                      <Link to={`/dashboard/create-qr/?eid=${content?.shortId}`}>
                        <Button
                          Name='Edit'
                          Icon='/media/svg/qr_dashboard/edit.svg'
                          className='t-w-full md:t-w-[140px] t-text-[13.28px] '
                          // click={() => {
                          //   handleEditQr(content?.shortId)
                          // }}
                        />
                      </Link>
                    )}
                    <div className='t-flex gap-2 t-cursor-pointer t-text-center t-items-center t-justify-evenly t-text-primary'>
                      <p
                        onClick={() => handleDownload('PNG')}
                        className='t-rounded-full hover:t-bg-[#EDEFF3] t-border-primary t-py-1 t-w-full t-px-3 t-border '
                      >
                        PNG
                      </p>
                      <p
                        onClick={() => handleDownload('SVG')}
                        className='t-rounded-full hover:t-bg-[#EDEFF3] t-border-primary t-py-1 t-w-full t-px-3 t-border'
                      >
                        SVG
                      </p>
                      {!roles.includes(role) && (
                        <div
                          onClick={() => setEdit(!edit)}
                          className='t-absolute t-top-5 t-right-3  t-w-10 t-h-10  md:t-h-16 md:t-w-16 t-flex t-items-center t-justify-center t-cursor-pointer md:t-border t-border-grey t-rounded-full'
                        >
                          <img src={images.dotsmenu} className='t-w-[22%]' alt='dots menu' />
                        </div>
                      )}
                    </div>
                    {QR_HAVE_PREVIEW.includes(content?.qrType) && (
                      // the a=false we don't have to collect analytics
                      <div className='t-flex t-justify-evenly t-align-middle t-items-center'>
                        <CopyText
                          toolTipTitle='QR Link '
                          textToCopy={`${process.env.REACT_APP_QR_APP}/display/${content?._id}`}
                        />
                        <a
                          rel='noreferrer'
                          href={`${process.env.REACT_APP_QR_APP}/Q1/${content?.shortId}?a=false`}
                          target='_blank'
                          className='t-text-md t-text-primaryblue'
                        >
                          Visit Link
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {deleteQr && (
                  <ConfirmPopUp
                    message='Are you sure you want to delete this QR?'
                    handleClick={handleDeletePost}
                    setState={setDeleteQr}
                    btnText='Delete'
                  />
                )}
                {blockQr && (
                  <ConfirmPopUp
                    message={`${
                      content.qrStatus === 'Blocked'
                        ? 'Are you sure you want to Unblock this QR?'
                        : 'Are you sure you want to Block this QR?'
                    }`}
                    handleClick={handleBlockQr}
                    setState={setBlockQr}
                    btnText={`${content.qrStatus === 'Blocked' ? 'Unblock' : 'Blocked'}`}
                  />
                )}
                {duplicate && (
                  <ConfirmPopUp
                    message={'Are you sure you want to Duplicate this QR?'}
                    handleClick={handleDuplicateQR}
                    setState={setDuplicate}
                    btnText='Duplicate'
                  />
                )}
                <Modal onOk={handleFolderOk} open={moveFolder} close={closeModal}>
                  <DropdownCheckbox
                    setSelectedItem={setSelectedFolder}
                    title='Select a Folder'
                    listItems={formedFolders}
                  />
                </Modal>
                <Modal
                  open={labelmodal}
                  close={() => {
                    setLableModal(false)
                  }}
                  onOk={handleUpdateLabel}
                >
                  <DropdownCheckbox
                    setSelectedItem={setLabel}
                    title='Select a Label'
                    listItems={formedLabels}
                  />
                </Modal>
              </div>
            </Badge.Ribbon>
          </div>
        </div>
        <div className='t-absolute t-shadow-2xl t-bg-white t-z-[99999] t-rounded-xl t-top-[2rem] t-right-16 t-flex-column'>
          {edit && QR_OPTIONS.length > 0 && (
            <ul
              ref={optionsRef}
              className=' t-w-max t-py-1 t-top-[55px] t-px-1 t-left-0  t-whitespace-nowrap t-rounded-xl'
            >
              {QR_OPTIONS.map(({label, image}, index) => {
                return (
                  <li
                    onClick={() => {
                      handleOptionClick(label)
                    }}
                    key={index}
                    className='t-cursor-pointer  t-text-t1 t-px-5 t-py-2 t-rounded-[3px] hover:t-bg-gray-100 t-whitespace-nowrap t-flex t-items-center t-gap-5'
                  >
                    <KTSVG path={image} className=' svg-icon-5' />
                    {content.qrStatus === 'Blocked' && label === 'Block' ? 'Unblock' : label}
                  </li>
                )
              })}
            </ul>
          )}
        </div>{' '}
      </div>
    </>
  )
}

export default CardQR

const ConfirmPopUp = ({setState, handleClick, message, btnText}) => {
  const popUpRef = useRef()
  useOnClickOutside(popUpRef, () => setState(false))
  return (
    <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-text-t2 t-px-3'>
      <div
        ref={popUpRef}
        className='t-bg-white t-p-7 t-w-[412px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
      >
        <KTSVG path='/media/svg/qr_dashboard/exclamationred.svg' className=' svg-icon-1' />
        <p className='t-text-[14px] t-font-medium t-text-center'>{message}</p>
        <div className='t-flex t-items-center t-gap-6 t-w-full t-text-[16px] t-text-t1 '>
          <button
            onClick={() => setState(false)}
            type='button'
            className='t-border t-border-[#D0D5DD] t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleClick}
            className='t-border t-border-[#D92D20] t-bg-[#D92D20] t-text-white t-py-3 t-px-6 t-rounded-xl t-w-full t-font-medium'
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}
