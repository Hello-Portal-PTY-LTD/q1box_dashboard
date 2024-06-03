import {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {useFormContext, useWatch} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import Loader from './Loader'
import {formatFileSize} from '../utils/mock'
import {uploadFileGCP} from 'store/barCode/barCodeAction'
import {GRAPHICS} from '../graphics'
import {getEditQrId} from '../utils/functions'

function ImageUpload({text, label, fileType, variant, description, name, maxFiles, type}) {
  const formFiles = useWatch({name: name})

  const [files, setFiles] = useState([])
  const {loading, formSubmitted} = useSelector((state) => state.barCode)
  const {setValue, register} = useFormContext()
  const [state, setState] = useState(true)
  const [uploadedUrls, setUploadedUrls] = useState([])

  const dispatch = useDispatch()
  const edit_qrId = getEditQrId()

  useEffect(() => {
    if (edit_qrId && state) {
      if (formFiles?.length === 1) {
        setFiles([formFiles])
        setState(false)
      }
      if (formFiles?.length >= 1 && name === 'files') {
        setFiles([...formFiles])
        setUploadedUrls([...formFiles])
        setState(false)
      }
    }
  }, [formFiles, edit_qrId, state, name])

  useEffect(() => {
    if (formSubmitted) {
      setFiles([])
    }
  }, [formSubmitted])

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections) => {
      if (files?.length + acceptedFiles.length > 10) {
        // toast.error('Upload limit exceeded')
        alert('Upload limit exceeded')
        return
      }

      if (fileRejections && fileRejections.length > maxFiles) {
        // toast.error('Upload limit exceeded')
        return
      }

      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      dispatch(uploadFileGCP(updatedFiles))
        .unwrap()
        .then((res) => {
          const urls = res.map((file) => file.url)
          setUploadedUrls((prevUrls) => [...prevUrls, ...urls])
          if (variant === 'pdf') {
            setValue(name || 'file', urls[0])
          } else {
            setValue(name || 'file', [...uploadedUrls, ...urls])
          }
        })

      if (variant === 'pdf') {
        setFiles([...updatedFiles])
      } else {
        setFiles((prevFiles) => [...prevFiles, ...updatedFiles])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, setValue, variant, name, uploadedUrls, files]
  )

  const removeFile = (index) => {
    const updatedFiles = Array.isArray(files) ? [...files] : []
    const newFiles = Array.isArray(formFiles) ? [...formFiles] : []
    const newUploadedUrls = Array.isArray(uploadedUrls) ? [...uploadedUrls] : []

    updatedFiles.splice(index, 1)
    newFiles.splice(index, 1)
    newUploadedUrls.splice(index, 1)

    setFiles(updatedFiles)
    setValue(name || 'file', newFiles)
    setUploadedUrls(newUploadedUrls)
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: fileType,
    maxFiles: variant === 'pdf' ? 1 : 10,
    multiple: variant === 'pdf' ? false : true,
    maxSize: 5 * 1024 * 1024,
  })

  return (
    <div className='t-arimo-regular'>
      {label && <label className='t-block t-mb-2 t-font-medium t-text-gray-90'>{label}</label>}
      {variant === 'pdf' ? (
        <div className='t-relative'>
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                className='t-relative t-pl-4 t-border t-border-blue-500 t-px-3 t-py-2 t-rounded-md t-my-3 t-bg-white t-text-blue-500 t-flex t-flex-col t-justify-center'
                key={index}
              >
                {loading && <Loader classNames='t-w-[25px] t-absolute t-top-3 t-ml-2' />}
                <>
                  <p className='t-text-sm t-md:text-base'>
                    {file?.length > 0 && file?.substring(file?.lastIndexOf('/') + 1)}
                  </p>
                  {file?.name && <p className='t-text-sm t-md:text-base'>{file.name}</p>}
                </>
                <p className='t-text-[10px] t-text-slate-500'>
                  {file?.size && formatFileSize(file?.size)}
                </p>
                {!loading && (
                  <img
                    src={GRAPHICS.CROSS}
                    width={20}
                    height={20}
                    alt='check_arrow'
                    onClick={() => removeFile(index)}
                    className='t-absolute -t-right-2 -t-top-[10px] t-z-10 t-cursor-pointer t-mix-blend-multiply t-bg-white'
                  />
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className='t-flex t-gap-4 t-flex-wrap t-my-5'>
          {files.map((file, index) => (
            <div className='t-flex-column' key={index}>
              <div className='t-relative t-w-[50px]'>
                <div className='t-relative'>
                  <img
                    src={file?.length > 0 ? file : file.preview}
                    alt='check_arrow'
                    className={`t-w-[55px] t-h-[50px] t-rounded-md ${loading && 't-opacity-[0.8]'}`}
                  />
                  {loading && (
                    <Loader classNames='t-w-[25px t-absolute t-top-3 t-w-[25px] t-ml-2' />
                  )}
                </div>

                {!loading && (
                  <img
                    src={GRAPHICS.CROSS}
                    width={20}
                    height={20}
                    alt='check_arrow'
                    onClick={() => removeFile(index)}
                    className='t-absolute -t-right-2 -t-top-[10px] t-z-10 t-mix-blend-multiply t-cursor-pointer t-bg-white'
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length >= 10 ? (
        <div className='t-p-6 t-border t-border-dashed t-border-[#CBD5E1] t-rounded-xl t-bg-[#F9FAFB] t-cursor-pointer'>
          <div className='t-flex t-flex-col t-justify-center t-items-center t-text-[#52525B] t-gap-1 t-arimo-regular'>
            <h3 className='t-text-base t-text-center t-arimo-regular t-text-primary'>
              <div className='t-flex t-justify-center t-items-center t-border t-gradient-border t-rounded-lg t-py-2.5 t-px-8 t-font-semibold t-bg-transparent'>
                {text}
              </div>
            </h3>
            <p className='t-text-[13px] t-mt-2'>{description}</p>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className='t-p-6 t-border t-border-dashed t-border-[#CBD5E1] t-rounded-xl t-bg-[#F9FAFB] t-cursor-pointer'
        >
          <input {...(name ? register(name) : {})} {...getInputProps()} />

          <div className='t-flex t-flex-col t-justify-center t-items-center t-text-[#52525B] t-gap-1 t-arimo-regular'>
            <h3 className='t-text-base t-text-center t-arimo-regular t-text-primary'>
              <div className='t-flex t-justify-center t-items-center t-border t-gradient-border t-rounded-lg t-py-2.5 t-px-8 t-font-semibold t-bg-transparent'>
                {text}
              </div>
            </h3>
            <p className='t-text-[13px] t-mt-2'>{description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
