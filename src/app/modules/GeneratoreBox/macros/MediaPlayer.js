import React from 'react'
import ReactPlayer from 'react-player'

const MediaPlayer = ({url, isPlaying, setIsPlaying}) => {
  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }
  return (
    <div className='t-w-full t-relative t-overflow-hidden t-bg-[#000] t-py-2 t-items-center t-flex t-rounded-2xl'>
      <ReactPlayer
        width={'100%'}
        height={240}
        controls={false}
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{
          overflow: 'hidden',
        }}
        url={
          url ? url : 'https://www.youtube.com/watch?v=a3ICNMQW7Ok&pp=ygUSc2FtcGxlIGZyZWUgdmlkZW9z'
        }
      />
    </div>
  )
}

export default MediaPlayer
