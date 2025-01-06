import React from 'react'

const videoBg = () => {
  return (
    <div className='w-full h-full absolute top-0 left-0 overflow-hidden rounded-lx z-10 pointer-events-none'>
      <video
        autoPlay
        muted
        loop
        id='bgVideo'
        className='rounded-lx w-full brightness-75 h-full object-cover'
      >
        <source src='/bgVideo.mp4' type='video/mp4' />
      </video>
    </div>
  )
}

export default videoBg
