import React, {useRef, useEffect, useState} from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import {useFormContext, useWatch} from 'react-hook-form'
import {BULK_UPLOAD_OPTIONS} from '../utils/mock'
import {UseSelectToggle} from '../utils/functions'
import {camelize} from 'utils/functions'
import {images} from 'assets'

const SAMPLE_FILES_SRC = {
  Url: images.url_sample,
  Sms: images.sms_sample,
  MakeCall: images.call,
}

const LIMIT = 100
const BulkUpload = () => {
  const [options, setOptions] = useState(BULK_UPLOAD_OPTIONS)
  const {formState, setError} = useFormContext()
  const selectedBulkUploadQrsType = useWatch({
    name: 'selectedBulkUploadQrsType',
  })

  const [records, setRecords] = useState([])
  const [fileName, setFileName] = useState('')
  const {setValue, clearErrors} = useFormContext()
  const fileInputRef = useRef(null)

  const [message, setMessage] = useState({
    type: '',
    message: '',
  })

  const handleSelectOption = (id, name) => {
    UseSelectToggle(setOptions, id, 'isSelected')
    setValue('selectedBulkUploadQrsType', name)
  }

  const handleRemoveFile = () => {
    setRecords(0)
    setMessage({})
    setFileName('')
    clearErrors('bulkData')
    handleClearInput()
  }

  function camelCaseObjectKeys(obj) {
    const camelCasedObj = {}

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelCasedKey = key
          .trim()
          .toLowerCase()
          .replace(/([^A-Z0-9]+)(.)/gi, function (match) {
            return arguments[2].toUpperCase()
          })

        camelCasedObj[camelCasedKey] = obj[key]
      }
    }

    return camelCasedObj
  }

  const handleClearInput = () => {
    fileInputRef.current.value = ''
  }

  const handleFileUpload = (e) => {
    // Clear any previous messages
    setMessage({})

    const files = e.target.files
    if (files.length === 0) {
      return // No files selected
    }

    const fileName = files[0]?.name
    setFileName(fileName)

    if (fileName.endsWith('.csv')) {
      const reader = new FileReader()

      reader.onload = function (event) {
        const fileContent = event.target.result
        Papa.parse(fileContent, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: function (results) {
            if (results.errors.length > 0) {
              setError('bulkData', {
                type: 'manual',
                message: 'Error parsing the CSV file. Please check the file format',
              })
            } else {
              clearErrors('bulkData')
              const toLowerCase = results?.data?.map(camelCaseObjectKeys)
              setRecords(toLowerCase)
            }
          },
        })
      }

      reader.onerror = function (event) {
        console.error('File reading error:', event.target.error)
        setMessage({
          message: 'File reading error. Please try again.',
          type: 'error',
        })
      }

      reader.readAsText(files[0])
    } else if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
      const reader = new FileReader()

      reader.onload = function (event) {
        const fileData = event.target.result

        try {
          const workbook = XLSX.read(fileData, {type: 'binary'})
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const parsedData = XLSX.utils.sheet_to_json(sheet, {header: 1})
          const toLowerCase = parsedData.map(camelCaseObjectKeys)
          setRecords(toLowerCase)
        } catch (error) {
          console.error('Excel parsing error:', error)
          setError('bulkData', {
            type: 'manual',
            message: 'File reading error. Please try again.',
          })
        }
      }

      reader.onerror = function (event) {
        console.error('File reading error:', event.target.error)
        setError('bulkData', {
          type: 'manual',
          message: 'Error parsing the Excel file. Please check the file format.',
        })
      }

      reader.readAsBinaryString(files[0])
    } else {
      setError('bulkData', {
        type: 'manual',
        message: 'Unsupported file format. Please upload a CSV, XLS, or XLSX file..',
      })
    }
  }

  const keyMappings = {
    Sms: ['phone', 'message', 'qrName'],
    Url: ['url', 'qrName'],
    Call: ['phone', 'qrName'],
  }

  useEffect(() => {
    if (records.length > 0) {
      if (records?.length > LIMIT) {
        setError('bulkData', {
          type: 'manual',
          message: 'You can upload a maximum of 100 records.',
        })
      } else {
        clearErrors('bulkData')
        setMessage({
          message: `Total Number of QR's  We Found ${records.length}`,
          type: 'records',
        })
        const allValuesDefinedAndNotEmpty = records?.every((obj) => {
          for (const key in obj) {
            const value = obj[key]
            if (typeof value === 'undefined' || value === null || value === '') {
              return false
            }
          }
          return true
        })

        if (!allValuesDefinedAndNotEmpty) {
          setError('bulkData', {
            type: 'manual',
            message: `The Some of the fields are empty`,
          })
          return
        }

        const selectedKeys = keyMappings[selectedBulkUploadQrsType]
        if (selectedKeys) {
          const allKeysInArray = records.every((obj) =>
            selectedKeys.every((key) => Object.keys(obj).some((objKey) => objKey === key))
          )

          if (!allKeysInArray) {
            let selectedType =
              selectedBulkUploadQrsType === 'Url' ? 'URL' : selectedBulkUploadQrsType
            setError('bulkData', {
              type: 'manual',
              message: `The Data is not matched with your selected QR type ${selectedType}`,
            })
          }
          if (allKeysInArray) {
            const newData = records.map((item) => {
              return {
                [camelize(selectedBulkUploadQrsType)]: {
                  ...item,
                },
              }
            })
            setValue('bulkData', newData)
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records, records?.length, selectedBulkUploadQrsType])

  return (
    <div className=''>
      <div className='t-flex t-justify-between flex-wrap'>
        <div className='t-flex t-gap-4 t-pb-3'>
          {options.map(({title, isSelected, value, id}, index) => (
            <div className='t-relative' key={index}>
              <div
                onClick={() => handleSelectOption(id, value)}
                className={`${
                  isSelected ? 't-border-primary' : 't-border t-border-gray-200'
                }  t-row-flex t-p-1 t-rounded-[5px] t-border t-w-[100px] t-justify-center t-cursor-pointer t-items-center t-gap-[5px]`}
              >
                {title.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        <a
          rel='noreferrer'
          download={camelize(selectedBulkUploadQrsType)}
          className='t-text-sm t-mt-2 t-text-primary'
          target='_blank'
          href={SAMPLE_FILES_SRC[selectedBulkUploadQrsType]}
        >
          Download Sample file.
        </a>
      </div>
      <div className='t-flex t-pb-2 t-justify-between'>
        <p className='t-text-primary'>{fileName}</p>
        {message?.message?.length > 0 && (
          <p className='t-cursor-pointer t-text-red' onClick={() => handleRemoveFile()}>
            Remove
          </p>
        )}
      </div>

      <label htmlFor='fileInput' className='t-w-full hiddenLabel'>
        <div className='t-p-6 t-border t-w-full t-border-dashed t-border-[#CBD5E1] t-rounded-xl t-bg-[#F9FAFB] t-cursor-pointer'>
          <div className='t-flex t-flex-col t-justify-center t-items-center t-text-[#52525B] t-gap-1 t-arimo-regular'>
            <h3 className='t-text-base t-text-center t-arimo-regular t-text-primary'>
              <div className='t-flex t-justify-center t-items-center t-border t-gradient-border t-rounded-lg t-py-2.5 t-px-8 t-font-semibold t-bg-transparent'>
                Pick file
              </div>
            </h3>
            <p className='t-text-[13px] t-mt-2'>Please upload CSV File</p>
          </div>
        </div>
      </label>
      <input
        id='fileInput'
        type='file'
        name='fileInput'
        className='t-hidden'
        accept='.xls, .xlsx, .xlsm, .csv'
        onChange={handleFileUpload}
        ref={fileInputRef}
      />

      <p className='text-primary pt-2'>
        {formState?.errors?.bulkData?.message
          ? formState?.errors?.bulkData?.message
          : message?.message}
      </p>
    </div>
  )
}

export default BulkUpload
