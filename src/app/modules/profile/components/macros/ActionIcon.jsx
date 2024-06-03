function ActionIcon({onClick}) {
  return (
    <p className='t-pl-14 t-py-7 t-text-center t-cursor-pointer  ' onClick={onClick}>
      <img
        src={require('../../../../../assets/media/dotsmenu.png')}
        height={5}
        width={5}
        alt='img'
      />
    </p>
  )
}

export default ActionIcon
