import {useForm, FormProvider} from 'react-hook-form'
import {VALIDATION_MATCH} from './schema/schema-handler'
import {yupResolver} from '@hookform/resolvers/yup'
import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LOGOS} from '../app/modules/GeneratoreBox/utils/mock'
import {DEFAULT_VALUES_MATCH, DEFAULTS} from './defaultValues/defaultsProvider'
import {getQrCode, saveQrCode, updateTheQrCode, uploadFileGCP} from 'store/barCode/barCodeAction'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

// import QrFolderComponet from '@/components/QrFolderComponent'

import {
  downloadQRCode,
  getUserToDashBoard,
  convertToFile,
  getEditQrId,
  getIsDuplicate,
} from 'app/modules/GeneratoreBox/utils/functions'
import {
  setCoverImage,
  setProfileImage,
  setQrCodeState,
  setQrType,
  setFolderModal,
  setLogo,
  setQrCodeUrl,
} from 'store/barCode/barCodeSlice'
import QrFolderComponet from 'app/modules/GeneratoreBox/QrFolderComponent'
import {useBlocker} from 'app/modules/GeneratoreBox/FormPrompt'
import ImageLoader from 'app/modules/GeneratoreBox/imageLoader'

const navigationBlocker = (tx) => {
  if (true) {
    // You can show a confirmation message or perform other actions here
    const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (answer) {
      tx.retry() // Retry the navigation
    }
  }
}

function RHFProvider({children}) {
  // const [fdata, setfData] = useState(null)
  const {folderModal} = useSelector((state) => state.barCode)
  // const {user} = useSelector((state) => state.user)
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  // const findByName = (array, nameToFind) => {
  //   return array.find((item) => item?.name === nameToFind)
  // }
  const {barCode} = useSelector((state) => state)
  const dispatch = useDispatch()
  const edit_qrId = getEditQrId()
  const isDuplicate = getIsDuplicate()

  const [qrValues, setQrValues] = useState()

  const defaultValues = useMemo(() => {
    return {
      ...DEFAULT_VALUES_MATCH[barCode?.qrType],
      ...DEFAULTS,
    }
  }, [barCode?.qrType])

  function makeResetValues(qrValues, name) {
    if (qrValues) {
      const excludedFields = [
        'files',
        'eyeBall',
        'eyeFrame',
        'pattern',
        'bgColor',
        'fgColor',
        'qrFrame',
        'qrTemplate',
        'qrEyeBallColor',
        'qrEyeFrameColor',
        'qrFrameColor',
        'logo',
      ]

      const resetValues = Object.keys(qrValues)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = qrValues[key]
          return obj
        }, {})

      return {
        ...resetValues,
        ...qrValues[name],
      }
    }
  }

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      qrFrameButtonText: '',
      qrErrorLevel: '',
    },
    resolver: yupResolver(VALIDATION_MATCH[barCode?.qrType]),
  })

  function camelize(str) {
    return str
      ?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase()
      })
      .replace(/\s+/g, '')
  }

  useEffect(() => {
    /** When Qr In edit mode */
    const typesToStoreImages = ['advanceLinks', 'social', 'menu', 'coupon']
    if (qrValues) {
      let name = camelize(qrValues.qrType)
      methods.reset(makeResetValues(qrValues, name))
      let temp = qrValues
      if (typesToStoreImages.includes(name)) {
        temp = {
          ...temp,
          coverImage: {
            url: temp[name]?.preview?.coverImage,
          },
          profileImage: {
            url: temp[name]?.preview?.profileImage,
          },
        }
      }
      if (qrValues?.qrType === 'Menu') {
        temp = {
          ...temp,
          products: temp?.menu?.products,
        }
      }
      delete temp[name]
      dispatch(setQrCodeState(temp))
    }
    //eslint-disable-next-line
  }, [qrValues])

  useBlocker({
    blocker: navigationBlocker,
    when: methods.formState.isDirty, // Pass the condition to the hook
  })
  const handleClose = () => {
    // handleFormSubmit(data);
    dispatch(setFolderModal(false))
  }
  useEffect(() => {
    if (!edit_qrId) {
      methods.reset(defaultValues)
      dispatch(setProfileImage(''))
      dispatch(setCoverImage(''))
    }
    //eslint-disable-next-line
  }, [defaultValues])

  const CheckBeforeSubmit = async (data) => {
    // const token = localStorage.getItem('token')
    setLoader(true)
    // if (!token) {
    //   toast.info('Please Login First');
    //   return;
    // }
    // console.log('data before submit', data)

    return handleFormSubmit(data)
  }

  const hasErrors = Object.keys(methods.formState.errors).length > 0

  if (hasErrors && folderModal) {
    dispatch(setFolderModal(false))
  }

  const handleFormSubmit = async (data) => {
    dispatch(setFolderModal(false))

    let theData = data
    theData = {
      ...theData,
      // qrFolder: barCode?.qrFolder,
      // qrName: barCode?.qrName,
    }

    // keep the updated fields and delete the old one from the data.
    // in the edit mode.

    if (theData.qrType === 'AdvanceLinks' && edit_qrId) {
      delete theData.advanceLinks
    }

    if (theData.qrType === 'Social' && edit_qrId) {
      delete theData.social
    }

    if (theData.qrType === 'Coupon' && edit_qrId) {
      delete theData.coupon
    }

    if (theData.qrType === 'DownloadPdf' && edit_qrId) {
      delete theData.downloadPdf
    }
    if (theData.qrType === 'UploadImage' && edit_qrId) {
      delete theData.uploadImage
    }
    if (theData.qrType === 'Menu' && edit_qrId) {
      delete theData.menu
    }
    if (theData.qrType === 'BusinessCard' && edit_qrId) {
      delete theData.businessCard
    }
    if (theData.qrType === 'Location' && edit_qrId) {
      delete theData.location
    }
    if (theData.qrType === 'LandingPage' && edit_qrId) {
      delete theData.landingPage
    }
    if (theData.qrType === 'Sms' && edit_qrId) {
      delete theData.sms
    }
    if (theData.qrType === 'SendEmail' && edit_qrId) {
      delete theData.sendEmail
    }
    if (theData.qrType === 'MakeCall' && edit_qrId) {
      delete theData.makeCall
    }
    // if (theData.qrType === "Url" && edit_qrId) {
    //   delete theData.url;
    // }
    if (theData.qrType === 'ReviewCollector' && edit_qrId) {
      delete theData.reviewCollector
    }
    if (theData.qrType === 'Calendar' && edit_qrId) {
      delete theData.calendar
    }
    if (theData.qrType === 'Forms' && edit_qrId) {
      delete theData.forms
    }
    if (theData.qrType === 'ShowText' && edit_qrId) {
      delete theData.showText
    }
    if (theData.qrType === 'AppDownload' && edit_qrId) {
      delete theData.appDownload
    }
    if (theData.qrType === 'Video' && edit_qrId) {
      delete theData.video
    }
    /**
       * download the qr image file * /
      /*
       *  below the code use to structure the theData for FORM submission.
          we get the current type of qr type according to that we create a object theData of it.
       */

    const nestedPick = (obj, keys) => {
      const result = {}
      keys.forEach((key) => {
        const keyParts = key.split('.')
        let value = obj
        let currentResult = result
        for (let i = 0; i < keyParts.length; i++) {
          const part = keyParts[i]
          if (value && value.hasOwnProperty(part)) {
            if (i === keyParts.length - 1) {
              currentResult[part] = value[part]
            } else {
              currentResult[part] = {}
              currentResult = currentResult[part]
              value = value[part]
            }
          } else {
            value = undefined
            break
          }
        }
      })
      return result
    }

    const formFields = {
      BusinessCard: [
        'firstName',
        'lastName',
        'email',
        'workPhone',
        'mobilePhone',
        'companyName',
        'jobTitle',
        'street',
        'city',
        'zipcode',
        'website',
        'country',
        'state',
        'summary',
      ],
      BulkUpload: ['bulkData', 'bulkName', 'selectedBulkUploadQrsType'],
      AppDownload: ['googlePlayUrl', 'appStoreUrl'],
      Social: ['preview', 'links'],
      SendEmail: ['subject', 'email', 'message'],
      Location: ['mapUrl', 'position', 'placeName'],
      Url: ['url'],
      Sms: ['phone', 'message'],
      ShowText: ['text'],
      LandingPage: ['url', 'url2', 'url3'],
      Coupon: [
        'pallete',
        'couponTime',
        'preview',
        'validUntil',
        'buttonLink',
        'buttonText',
        'salePercentage',
        'couponDetails',
        'couponNo',
      ],
      Video: ['videoTitle', 'videoUrl', 'description', 'preview'],
      DownloadPdf: ['url', 'file'],
      AdvanceLinks: ['preview', 'links'],
      Calendar: ['url'],
      Forms: ['url'],
      Menu: [
        'shopName',
        'description',
        'coverImage',
        'storeLink',
        'buttonName',
        'products',
        'preview',
        'menuName',
      ],
      UploadImage: ['files', 'galleryName', 'backgroundColor'],
      ReviewCollector: ['url'],
      MakeCall: ['phone'],
    }

    const formName = barCode.qrType
    const camelCaseFormName = camelize(formName)

    const filteredFields = {
      ...(formName && formFields[formName] ? {[camelCaseFormName]: {}} : {}),
    }

    if (filteredFields[camelCaseFormName]) {
      const fields = formFields[formName]
      const pickedFields = {...nestedPick(theData, fields)}
      Object.assign(filteredFields[camelCaseFormName], pickedFields)
      for (const field in pickedFields) {
        delete theData[field]
      }
    }

    const finalResult = {
      ...filteredFields,
      ...barCode,
      ...theData,
    }

    if (finalResult[camelCaseFormName]?.preview?.profileImage) {
      finalResult[camelCaseFormName].preview.profileImage = barCode?.profileImage.url || ''
    }
    if (finalResult[camelCaseFormName]?.preview?.coverImage) {
      finalResult[camelCaseFormName].preview.coverImage = barCode?.coverImage.url || ''
    }

    if (camelCaseFormName === 'menu' && finalResult?.menu?.products.length > 0) {
      for (let i = 0; i < finalResult?.menu?.products.length; i++) {
        finalResult.menu.products[i].image =
          finalResult.menu.products[i].image?.url || finalResult.menu.products[i].image
      }
    }

    if (camelCaseFormName === 'downloadPdf') {
      delete finalResult.downloadPdf.file
    }

    if (camelCaseFormName === 'coupon') {
      finalResult.coupon.validUntil = moment(finalResult.coupon.validUntil).format('YYYY-MM-DD')
    }
    /**
     *   if the logo is system file path then only store the logo name.
     */

    if (finalResult?.logo?.url && typeof finalResult?.logo === 'object') {
      console.log('finalResult', finalResult)
      finalResult.logo = finalResult?.logo?.url
    } else if (!finalResult?.logo?.url && finalResult?.logo && finalResult?.logo?.file) {
      let str = finalResult.logo.file
      str = str?.split('/')
      str = str[str.length - 1].split('.')[0]
      finalResult.logo = str
    } else if (typeof finalResult.logo === 'string' && finalResult.logo) {
      let finalValue = finalResult.logo
      finalResult.logo = finalValue
    } else {
      finalResult.logo = ''
    }

    const uploadQrImage = async (qrRes, name, isBulkUpload) => {
      try {
        methods.reset()
        if (isBulkUpload) {
          setTimeout(() => {
            getUserToDashBoard(navigate)
          }, 2000)
        } else {
          //  if shouldDownload is true then it will allow to download the code
          let shouldDownload = edit_qrId ? '' : 'QR'
          setTimeout(async () => {
            downloadQRCode(
              theData?.qrQuality,
              theData?.qrDownloadOption,
              shouldDownload,
              'qr_parent'
            ).then(() => {
              getUserToDashBoard(navigate)
            })
          }, 2000)
        }
      } catch (err) {
        setLoader(false)
      }
    }

    delete finalResult?.coverImage
    delete finalResult?.profileImage
    delete finalResult?.logoBase
    delete finalResult?.fileList

    try {
      if (edit_qrId) {
        let updatedData = finalResult
        delete updatedData._id
        delete updatedData.user

        dispatch(updateTheQrCode({id: edit_qrId, payload: updatedData}))
          .unwrap()
          .then(async (qrRes) => {
            uploadQrImage(qrRes)
          })
      } else {
        let name = camelize(finalResult.qrType)
        if (finalResult?.bulkUpload) {
          finalResult.qrType = finalResult?.bulkUpload?.selectedBulkUploadQrsType
        }
        setLoader(true)
        dispatch(saveQrCode(finalResult))
          .unwrap()
          .then(async (qrRes) => {
            let isBulkUpload = false
            if (finalResult?.bulkUpload) {
              isBulkUpload = true
            }

            dispatch(setQrCodeUrl(qrRes?.shortId))
            uploadQrImage(qrRes, name, isBulkUpload)
          })
          .catch(() => {
            setLoader(false)
            methods.reset(makeResetValues(finalResult, name))
          })
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  function extractNameFromSrc(array) {
    return array?.map((item) => {
      const srcParts = item?.src.split('/')
      const fileName = srcParts[srcParts?.length - 1] // Get the last part of the src
      const name = fileName?.replace('.svg', '').split('.')[0] // Remove the '.svg' extension and everything after the first dot
      const cleanName = name.replace('.', '') // Remove the dot from the name
      return {...item, name: cleanName}
    })
  }
  const newArrayWithExtractedNames = extractNameFromSrc(LOGOS)

  const findObjectByName = (newArrayWithExtractedNames, nameToSearch) => {
    return newArrayWithExtractedNames?.find((item) => item?.name === nameToSearch)
  }

  useEffect(() => {
    dispatch(
      setQrCodeState({
        qrType: 'Url',
      })
    )
    methods.reset()
    //eslint-disable-next-line
  }, [window.location.pathname])

  useEffect(() => {
    if (edit_qrId && qrValues) {
      const found = findObjectByName(newArrayWithExtractedNames, qrValues?.logo)

      if (found && qrValues?.logo) {
        dispatch(
          setLogo({
            file: found?.name,
            preview: found?.src,
          })
        )
      } else if (!found && qrValues?.logo) {
        dispatch(
          setLogo({
            url: qrValues?.logoBase,
            preview: qrValues?.logo,
          })
        )
      }
    }
    //eslint-disable-next-line
  }, [qrValues?.logo, edit_qrId])

  useEffect(() => {
    if (edit_qrId) {
      dispatch(getQrCode(edit_qrId)).then((res) => {
        setQrValues({...res.payload})
        dispatch(setQrCodeState(res.payload))
      })
    }
    if (edit_qrId && isDuplicate) {
      dispatch(getQrCode(edit_qrId)).then((res) => {
        setQrValues({...res.payload})

        dispatch(setQrCodeState(res.payload))

        let duplicatedQrCode = res.payload
        delete duplicatedQrCode.logoBase

        dispatch(saveQrCode(duplicatedQrCode))
          .unwrap()
          .then(async (res) => {
            const found = findObjectByName(newArrayWithExtractedNames, res?.logo)
            if (found && res?.logo) {
              dispatch(
                setLogo({
                  file: found?.name,
                  preview: found?.src,
                })
              )
            }
            setTimeout(async () => {
              const qrImage = await downloadQRCode(res.qrQuality, res?.qrDownloadOption)
              let newFile = await convertToFile(qrImage, 'QR', res?.qrDownloadOption)

              if (newFile) {
                dispatch(uploadFileGCP([newFile]))
                  .unwrap()
                  .then(async (response) => {
                    const qrImageUrl = response[0].url
                    const qrId = res.id
                    await downloadQRCode(res.qrQuality, res.qrDownloadOption, 'QR').catch(() => {
                      methods.reset(makeResetValues(res, res.qrType))
                    })
                    dispatch(
                      updateTheQrCode({
                        id: qrId,
                        payload: {qrImage: qrImageUrl},
                      })
                    )
                      .unwrap()
                      .then(() => {
                        methods.reset()
                        navigate('/dashboard/qrcodes')
                        // window.location.href = '/dashboard/qrcodes'
                      })
                  })
                // }
              } else {
              }
            }, 2000)
          })
      })
    } else {
      dispatch(setQrType('Url'))
    }
    //eslint-disable-next-line
  }, [edit_qrId, isDuplicate])

  return (
    <div className='t-relative'>
      {loader && (
        <ImageLoader loadingText={edit_qrId ? 'Saving Your Changes...' : 'Creating QR...'} />
      )}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(CheckBeforeSubmit)}>
          {children}

          <QrFolderComponet
            open={folderModal}
            close={() => {
              // methods.handleSubmit(data);
              // setSelectFolder(false);
              handleClose()
            }}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default RHFProvider
