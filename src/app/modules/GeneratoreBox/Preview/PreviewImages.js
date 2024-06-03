import React, {useState} from 'react'

import {Modal} from '../Modal'
import Masonry from 'react-responsive-masonry'

import {
  FacebookIcon,
  TwitterIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import {GRAPHICS} from '../graphics'

function PreviewImages(props) {
  // const localimages = [
  //   'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
  //   'https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg',
  //   'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
  //   'https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg',
  //   'https://images.freeimages.com/images/large-previews/ac1/global-warning-1153635.jpg',
  // ]

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const currentData = props.data
  const bgColor = currentData?.uploadImage?.backgroundColor
  const galleryName = currentData?.uploadImage?.galleryName
  const images = currentData?.uploadImage.files ? currentData.uploadImage.files : []

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  const handleCloseLightbox = () => {
    setSelectedImage(null)
    setLightboxOpen(false)
  }

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const fileName = 'updated_Data.png'
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }

  const [shareUrl, setShareUrl] = useState()

  const handleShare = async (imageUrl) => {
    setShareUrl(imageUrl)
  }

  return (
    <>
      <div
        style={{
          backgroundColor: bgColor ? bgColor : 'white',
        }}
        className='t-w-full relative t-h-full t-overflow-y-auto t-border t-p-2'
      >
        <div className='t-flex t-justify-center t-items-center t-pt-2 t-pb-3'>
          <h3 className='t-font-bold t-break-words t-text-2xl'>
            {galleryName ? galleryName : 'Gallery'}
          </h3>
        </div>

        <Masonry columnsCount={2} gutter='10px'>
          {images.map((image, index) => (
            <div
              key={index}
              className='t-cursor-pointer t-border'
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image}
                width={100}
                height={100}
                className='t-w-full t-h-full t-object-cover'
                alt='img'
              />
            </div>
          ))}
        </Masonry>

        {lightboxOpen && (
          <div className='t-fixed t-bg-black t-inset-0 t-flex t-items-center t-justify-center t-z-50'>
            <div className='t-absolute t-top-0 t-right-1 t-text-white t-flex t-items-center t-gap-6 t-p-2'>
              <p onClick={() => handleDownload(selectedImage)} className='t-cursor-pointer'>
                Download
              </p>
              <div onClick={() => handleShare(selectedImage)} className='t-cursor-pointer'>
                <img src={GRAPHICS.SHARE} alt='Share' width={30} height={30} className='' />
              </div>
              <div className='t-cursor-pointer' onClick={handleCloseLightbox}>
                X
              </div>
            </div>
            <div className='t-relative'>
              <img
                src={selectedImage}
                width={500}
                height={500}
                className='t-max-w-full t-max-h-full'
                alt='img'
              />
            </div>
            <Modal
              open={shareUrl}
              handleClose={() => {
                setShareUrl(false)
              }}
            >
              <div className='t-py-5 t-px-10 t-flex t-flex-col t-items-center'>
                <div className='t-self-start t-text-sm'>
                  You can share the image to the following applications
                </div>
                <div className='t-flex t-gap-3 t-mt-6'>
                  <WhatsappShareButton url={shareUrl}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  )
}

export default PreviewImages
