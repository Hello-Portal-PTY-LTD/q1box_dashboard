import Input from '../macros/Input'
import {GRAPHICS} from '../graphics'

function AdvanceLinks() {
  return (
    <div className='t-flex-column t-gap-5'>
      <div className='t-flex-column t-gap-5'>
        <div className='t-flex t-items-center t-gap-5'>
          <img
            className='t-cursor-pointer'
            src={GRAPHICS.GPLAY}
            width={30}
            height={30}
            alt='Google_play'
          />
          <h3>Google Play URL</h3>
        </div>
        <div className='t-flex-column t-gap-2'>
          <label className='t-text-[13.3px] t-font-[400]'>Enter URL</label>
          <div>
            <Input placeholder='www.example.com' name='googlePlayUrl' />
          </div>
        </div>
      </div>
      <div className='t-flex-column t-gap-5'>
        <div className='t-flex t-items-center t-gap-5'>
          <img
            className='t-cursor-pointer'
            src={GRAPHICS.Apple}
            width={30}
            height={30}
            alt='Google_play'
          />
          <h3>Apple Store URL (IOS)</h3>
        </div>
        <div className='t-flex-column t-gap-2'>
          <label className='t-text-[13.3px] t-font-[400]'>Enter URL</label>
          <div>
            <Input placeholder='www.example.com' name='appStoreUrl' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvanceLinks
