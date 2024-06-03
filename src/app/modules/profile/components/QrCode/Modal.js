import {Button} from '../../../../../_metronic/partials/qrComponents'

const Modal = ({open, close, children, onOk}) => {
  return open ? (
    <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
      <div className='t-bg-white t-px-16 t-py-20 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'>
        <div className='  t-w-full '>{children}</div>
        <div className='t-flex t-items-center t-gap-12 t-w-full t-text-[16px]'>
          <Button Name='Done' click={onOk} primary className='t-w-full' />
          <Button click={close} Name='Cancel' className='t-w-full' />
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default Modal
