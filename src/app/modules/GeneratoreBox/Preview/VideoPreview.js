import React, {useState} from 'react'
import {useFormContext, useWatch} from 'react-hook-form'
import MediaPlayer from '../macros/MediaPlayer'

function VideoPreview(props) {
  const {control} = useFormContext()
  const [playing, setPlaying] = useState(false)
  const currentData = props.data

  const {videoTitle, description, videoUrl} = useWatch(control, {
    name: ['videoTitle', 'buttonLink', 'description', 'videoUrl'],
  })

  const colorPreview = useWatch({name: 'preview'})

  const handlePlayVideo = () => {
    setPlaying(!playing)
  }

  return (
    <>
      <div
        style={{
          borderColor: colorPreview?.backGroundColor,
          borderWidth: 10,
          background: colorPreview?.backGroundColor,
        }}
        className='t-flex-column t-gap-2 t-justify-between t-text-white t-p-[7px] t-break-words  t-w-full  t-rounded-[10px]'
      >
        <div>
          <MediaPlayer
            setIsPlaying={setPlaying}
            isPlaying={playing}
            url={currentData?.video.videoUrl ? currentData?.video.videoUrl : videoUrl}
          />
        </div>
        <div className='t-flex-column t-overflow-auto t-bg-[white] t-p-3 t-rounded-lg  t-max-h-[300px] t-gap-2'>
          <p
            className='t-font-semibold'
            style={{
              color: colorPreview?.textColor,
            }}
          >
            {videoTitle || `Exploring the Amazon Rainforest`}
          </p>
          <p
            style={{
              color: colorPreview?.textColor,
            }}
          >
            {description ||
              `  Join us on an incredible journey through the Amazon Rainforest, one of the
      most biodiverse and awe-inspiring places on Earth. Immerse yourself in the
      lush greenery, encounter exotic wildlife, and learn about the delicate
      balance of this remarkable ecosystem.`}
          </p>
        </div>
        <button
          onClick={handlePlayVideo}
          type='button'
          style={{
            background: colorPreview?.buttonColor,
            color: colorPreview?.textColor,
          }}
          className='t-w-full t-shadow-sm t-py-3 t-rounded-full'
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
}

export default VideoPreview
