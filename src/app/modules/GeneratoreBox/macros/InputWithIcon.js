import React from 'react'
import {useFormContext} from 'react-hook-form'
import facebook from '../graphics/svgs/social/facebook-colored.svg'
import instagram from '../graphics/svgs/social/instagram-colored.svg'
import youtube from '../graphics/svgs/social/youtube-colored.svg'
import linkedin from '../graphics/svgs/social/linkedin-colored.svg'
import skype from '../graphics/svgs/social/skype-colored.svg'
import pinterest from '../graphics/svgs/social/pinterest-colored.svg'
import whatsapp from '../graphics/svgs/social/whatsapp-colored.svg'
import twitter from '../graphics/svgs/social/twitter-colored.svg'
import website from '../graphics/svgs/social/website-colored.png'

const coloredIcons = {
  facebook: facebook,
  instagram: instagram,
  youtube: youtube,
  linkedin: linkedin,
  pinterest: pinterest,
  skype: skype,
  whatsapp: whatsapp,
  twitter: twitter,
  website1: website,
  website2: website,
  website3: website,
}

const InputWithIcon = (props) => {
  const {register, formState} = useFormContext()
  const {inputLabel, placeholder, name, classNames, width, bg, index, type} = props
  const errors = formState.errors
  // console.log('ERORR', errors);

  return (
    <div className={`${width} `}>
      {inputLabel && (
        <label className='t-block t-mb-2  t-font-medium t-text-gray-90'>{inputLabel}</label>
      )}
      <div className='t-relative t-overflow-hidden t-rounded-[12px] t-flex t-items-center'>
        <input
          type='text'
          name={name}
          placeholder={placeholder}
          className={`${
            bg === 'light' ? 't-bg-white' : 't-bg-light'
          } t-placeholder-gray  t-pl-[55px] t-placeholder-gray t-border t-border-gray-300 t-rounded-[12px] t-focus:outline-none t-focus:ring-2 t-focus:ring-secondary t-focus:border-transparent t-text-gray-700 t-text-sm  t-block t-w-full t-h-[45px] ${classNames}`}
          {...(name ? register(name) : {})}
        />
        <div className='t-absolute t-left-0 t-bg-[#52525B] t-py-4 t-px-3'>
          {/* <img src={coloredIcons[type]} height={25} width={25} alt='fb' /> */}
          <img throwIfNamespace={false} src={coloredIcons[type]} height={25} width={25} alt='fb' />
        </div>
      </div>
      {errors?.links?.[index]?.url?.message && (
        <span className='t-text-primary t-text-xs'>{errors.links[index]?.url?.message}</span>
      )}
    </div>
  )
}

export default InputWithIcon
