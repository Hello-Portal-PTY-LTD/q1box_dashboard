import React, {useEffect, useState} from 'react'

import {useContext} from 'react'
import {useWatch} from 'react-hook-form'
import {GRAPHICS} from '../graphics'

function PreviewPdf({data}) {
  const currentData = data

  const download = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  let {url} = currentData.downloadPdf

  //--- icons text color is remaining
  return (
    <>
      <div className='t-w-full t-rounded-[20px] '>
        <div className='t-min-h-[60px] t-bg-white t-m-5 t-flex t-justify-between t-items-center t-pl-5 t-pr-5 t-rounded-md'>
          <div className='t-flex t-justify-between t-items-center'>
            <img
              src={GRAPHICS.PDF}
              width={20}
              height={20}
              alt='food'
              className='t-rounded-full t-bg-red t-h-[40px] t-w-[40px] t-items-center'
            />

            <div className='t-ml-5'>{url.substring(url.lastIndexOf('/') + 1)}</div>
          </div>
          <div
            className={`t-h-[30px] t-w-[30px] t-items-center t-flex t-pl-2`}
            onClick={() => {
              download(url)
            }}
          >
            <img src={GRAPHICS.ARROW_DOWN} width={10} height={10} className='' />
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewPdf
