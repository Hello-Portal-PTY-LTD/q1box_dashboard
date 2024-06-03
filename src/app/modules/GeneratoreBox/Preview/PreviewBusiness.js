import React, {useEffect, useState} from 'react'

import {useContext} from 'react'
import {useWatch} from 'react-hook-form'
import {object} from 'yup'

function PreviewBusiness({data}) {
  //--- icons text color is remaining
  const currentData = data
  const {businessCard} = data
  const {email, workPhone} = businessCard

  return (
    <>
      <div className='t-bg-primary t-m-5 t-pt-3  t-w-full  '>
        <h2 className='t-text-xl t-text-white t-font-bold t-mb-2 t-text-center'>
          {currentData?.businessCard.firstName + ' ' + currentData?.businessCard.lastName}
        </h2>
        <p className='t-text-white t-mb-4 t-text-center t-break-words'>
          {currentData?.businessCard.jobTitle}
        </p>
        <div className='t-bg-white t-rounded-lg t-shadow-md t-p-4 t-m-5  t-rounded-[20px]'>
          <h2 className='t-text-xl t-text-primary  t-mb-2 '>Contact</h2>

          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Email:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.email}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Mobile:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.mobilePhone}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Work Phone:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.workPhone}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Company:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.companyName}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Street:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.street}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>City:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>{currentData?.businessCard.city}</p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Zip Code:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.zipcode}
            </p>
          </div>
          <div className='t-mb-2 t-border-b'>
            <label className='t-block t-text-sm t-font-medium t-text-gray-400'>Country:</label>
            <p className='t-text-gray-800 t-pb-2 t-break-words'>
              {currentData?.businessCard.country}
            </p>
          </div>
        </div>
        <div className='t-bg-white t-rounded-lg t-shadow-md t-p-4 t-m-5  t-rounded-[20px]'>
          <label className='t-block t-text-sm t-font-medium t-text-primary'>Website:</label>
          <a
            href={currentData?.businessCard.website}
            target='_blank'
            rel='noopener noreferrer'
            className='t-text-gray-500 t-break-words'
          >
            {currentData?.businessCard.website}{' '}
          </a>
        </div>
        <div className='t-bg-white t-rounded-lg t-shadow-md t-p-4 t-m-5  t-rounded-[20px]'>
          <label className='t-block t-text-sm t-font-medium t-text-primary'>Summary:</label>
          <p className='t-text-gray-800 t-w-full t-break-words'>
            {currentData?.businessCard.summary}
          </p>
        </div>
      </div>
    </>
  )
}

export default PreviewBusiness
