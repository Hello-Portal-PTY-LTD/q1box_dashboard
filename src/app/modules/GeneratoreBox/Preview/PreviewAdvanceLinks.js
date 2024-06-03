import {useEffect, useState} from 'react'

import {useWatch} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {GRAPHICS} from '../graphics'

function PreviewAdvanceLinks(props) {
  const preview = useWatch({name: 'preview'})
  const links = useWatch({name: 'links'})
  const state = useSelector((state) => state.barCode)
  const [coverImage, setCoverImage] = useState(GRAPHICS.BG_RECTANGLE)
  const [profileImage, setProfileImage] = useState(GRAPHICS.PROFILE)

  useEffect(() => {
    if (state?.coverImage?.url) {
      setCoverImage(state.coverImage.url)
    }
    if (state?.profileImage?.url) {
      setProfileImage(state.profileImage.url)
    }
    if (preview?.coverImage?.preview) {
      setCoverImage(preview.coverImage.preview)
    }
    if (preview?.profileImage?.preview) {
      setProfileImage(preview.profileImage.preview)
    }
  }, [
    state?.coverImage?.url,
    state?.profileImage?.url,
    preview?.coverImage?.preview,
    preview?.profileImage?.preview,
  ])

  const currentData = props.data
  let textColor = preview?.textColor
  let backgroundColor = preview?.bgColor
  let profilename = currentData?.advanceLinks.preview.name || preview?.name || 'Profile Name'
  const renderLinks = links || currentData?.advanceLinks.links
  let srcc = currentData?.advanceLinks.links ? 'db' : 'local'

  return (
    <>
      <div
        className={`t-w-full t-relative t-rounded-[20px] `}
        style={{
          background: `${backgroundColor}`,
        }}
      >
        <img
          src={coverImage}
          width={100}
          height={100}
          className='t-w-full t-rounded-t-[20px] t-object-cover t-max-h-[174px]'
          alt='bg-img'
        />
        <div className='t-border-2 t-absolute t-top-[90px] t-left-0 t-right-0 t-m-auto t-p-1 t-rounded-[100px] t-border-white t-h-[112px] t-w-[112px]'>
          <img
            src={profileImage}
            width={100}
            height={100}
            alt='bg-img'
            className='t-rounded-[100px] t-w-full t-h-full'
          />
        </div>
        <div className='t-text-center  t-mt-[75px] t-md:mt-10'>
          <p
            style={{
              color: `${textColor}`,
              fontFamily: preview?.fontFamily,
            }}
          >
            {profilename}
          </p>
        </div>
        <div className='t-px-3 t-space-y-2 t-w-full t-py-10'>
          {renderLinks?.map(({name, url}, index) => {
            return (
              <div
                key={index}
                className={`t-bg-white t-row-flex  t-items-center t-rounded-md t-px-5 t-py-2 t-cursor-pointer ${
                  srcc === 'db' && url?.length < 1 ? 't-opacity-0 t-pointer-events-none' : ''
                }`}
                onClick={() => window.open(url)}
              >
                <p
                  style={{color: `${textColor}`, fontFamily: preview?.fontFamily}}
                  className='t-text-base t-font-medium t-text-center t-w-full t-break-words'
                >
                  {name || 'Click Me!'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PreviewAdvanceLinks
