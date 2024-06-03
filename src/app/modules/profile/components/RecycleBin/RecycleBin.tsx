/*x eslint-disable jsx-a11y/anchor-is-valid */

import CardSelectionRecycle from './CardSelectionRecycle'

export function RecycleBin() {
  return (
    <div className='t-flex t-flex-col t-gap-8 t-h-full'>
      <div>
        <h3 className='t-font-bold t-my-2 t-text-[24px]'>Recycle Bin</h3>
      </div>
      <div className='t-h-full'>
        <div className='t-overflow-x-auto t-h-full'>
          <CardSelectionRecycle />
        </div>
      </div>
    </div>
  )
}

export default RecycleBin
