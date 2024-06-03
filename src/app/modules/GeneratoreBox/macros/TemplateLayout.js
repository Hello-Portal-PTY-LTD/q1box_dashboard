function TemplateLayout({children, fgColor, qrTemplate}) {
  const templateComponents = {
    ScanButton: ScanButton,
    ScanTagButton: ScanTagButton,
    // add more templates and their corresponding components as needed
  }

  const TemplateComponent = templateComponents[qrTemplate] || null

  return (
    <div className='t-w-full'>
      {children}
      <div>{TemplateComponent && <TemplateComponent fgColor={fgColor} />}</div>
    </div>
  )
}

export default TemplateLayout

const ScanButton = ({fgColor}) => {
  return (
    <div
      style={{background: fgColor}}
      className='t-w-[100%] t-mt-2 t-rounded-md t-text-center t-flex t-items-center t-justify-center t-text-white t-h-[35px] t-bg-black'
    >
      Scan Me
    </div>
  )
}

const ScanTagButton = ({fgColor}) => (
  <div className='t-w-full t-bottom-[30px]'>
    <div className='t-flex-column t-relative t-items-center'>
      <div className='up-triangle' />
      <div
        style={{background: '#007bff'}}
        className='t-w-[100%] t-text-center t-flex t-items-center t-justify-center t-text-white t-h-[35px] '
      >
        Scan Me
      </div>
    </div>
  </div>
)
