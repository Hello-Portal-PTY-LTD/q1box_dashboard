import React, {useEffect, useState} from 'react'

import facebook from '../graphics/svgs/social/facebook-colored.svg'
import instagram from '../graphics/svgs/social/instagram-colored.svg'
import youtube from '../graphics/svgs/social/youtube-colored.svg'
import linkedin from '../graphics/svgs/social/linkedin-colored.svg'
import skype from '../graphics/svgs/social/skype-colored.svg'
import pinterest from '../graphics/svgs/social/pinterest-colored.svg'
import whatsapp from '../graphics/svgs/social/whatsapp-colored.svg'
import twitter from '../graphics/svgs/social/twitter-colored.svg'
import website from '../graphics/svgs/social/website-colored.png'

import {useWatch} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {GRAPHICS} from '../graphics'
import {getEditQrId} from '../utils/functions'

const coloredIcons = {
  facebook: facebook,
  instagram: instagram,
  youtube: youtube,
  linkedin: linkedin,
  pinterest: pinterest,
  skype: skype,
  whatsapp: whatsapp,
  website1: website,
  website2: website,
  website3: website,
  twitter: twitter,
}

function PreviewSocial(props) {
  let links = useWatch({name: 'links'})
  let preview = useWatch({name: 'preview'})
  const state = useSelector((state) => state.barCode)
  const currentData = props.data
  const edit_qrId = getEditQrId()
  const [coverImage, setCoverImage] = useState()
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    if (preview?.coverImage?.preview) {
      setCoverImage(preview?.coverImage?.preview)
    } else {
      setCoverImage(GRAPHICS.PREVIEW_PROFILE)
    }
  }, [preview?.coverImage?.preview, state?.coverImage?.url])

  useEffect(() => {
    if (state?.profileImage?.url) {
      setProfileImage(state?.profileImage?.url)
    }
    if (preview?.profileImage?.preview) {
      setProfileImage(preview?.profileImage?.preview)
    } else {
      console.log('profile social ', GRAPHICS.PROFILE_SOCIAL)
      setProfileImage(GRAPHICS.PROFILE_SOCIAL)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview?.profileImage?.preview])

  useEffect(() => {
    if (edit_qrId) {
      if (state?.profileImage?.url) {
        setProfileImage(state?.profileImage?.url)
      }
      if (state?.coverImage?.url) {
        setCoverImage(state?.coverImage?.url)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit_qrId, state?.profileImage?.url, state?.coverImage?.url])

  let textColor = currentData?.social.preview.textColor

  const linkItems = links?.map((current, index) => (
    <div
      key={index}
      className='t-row-flex t-bg-white t-items-center t-gap-3 t-cursor-pointer t-p-2 t-rounded-lg'
      onClick={() => window.open(current.url)}
    >
      <img src={coloredIcons[current.type]} width={40} height={40} alt='icon' />
      <p className='t-text-base t-text=  t-w-full' style={{color: textColor || preview?.textColor}}>
        /{current.name}
      </p>
    </div>
  ))
  //--- icons text color is remaining
  return (
    <>
      <div
        className='t-w-full  t-rounded-[20px] t-h-[100%]'
        style={{
          background: `${
            currentData?.social.preview.bgColor
              ? currentData?.social.preview.bgColor
              : preview?.bgColor
          }`,
        }}
      >
        <img
          src={coverImage}
          width={100}
          height={100}
          className='t-w-full md:t-min-h-[140px]  lg:t-min-h-[180px] lg:t-max-h-[180px] t-object-cover t-rounded-t-[20px]'
          alt='bg-img'
        />
        <div className='t-relative t-px-5 '>
          <div
            className={`t-absolute  375:t-top-[-40px] lg:t-top-[-71px] t-flex-column t-gap-1.5 t-h-auto t-bg-primary`}
          >
            <img
              src={profileImage}
              width={100}
              height={100}
              alt='bg-img'
              className='t-w-[70px] lg:t-w-[100px] t-h-[70px] t-lg:h-[100px] lg:t-min-h-[100px] t-object-cover	 '
            />
          </div>
        </div>
        <div className='t-mt-[37px] t-space-y-2 t-w-full  t-pb-5 t-px-5 '>
          <h3
            className={`t-font-bold  t-break-words t-max-w-[100%] t-h-auto`}
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {preview.profileName}
          </h3>
          <p
            className='t-text-[13.3px] t-beak-words t-break-words t-max-w-[100%] t-h-auto'
            style={{
              color: `${textColor ? textColor : preview?.textColor}`,
            }}
          >
            {preview.summary}
          </p>
          <p className='t-font-medium'>Social Links</p>
          <div className='t-overflow-y-auto 375:t-max-h-[300px] t-max-h-[200px] t-flex-column t-gap-4'>
            <div className='t-flex-column t-gap-3 '>{linkItems}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewSocial
