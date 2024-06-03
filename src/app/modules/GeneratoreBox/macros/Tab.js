import { GRAPHICS } from '../graphics'

export const Tab = ({ name, premium, handleTabSelect, selectedTab }) => (
  <div
    className={`t-flex t-flex-wrap t-cursor-pointer t-items-center  t-gap-[5px] ${selectedTab === name
      ? `t-border-b-primary t-border-b-4`
      : 't-border-b-transparent t-border-b-4'
      }`}
    onClick={() => handleTabSelect()}
  >
    <p
      className={`t-text-[10px] lg:t-text-sm   t-font-semibold ${selectedTab === name ? `t-text-primary` : 't-text-black'
        }`}
    >
      {name}
    </p>
    {premium && (
      <img
        src={GRAPHICS.CROWN}
        alt='premium'
        width={20}
        height={20}
        className='t-w-[14px] t-ml-2 t-mb-[2px]  t-h-[14px] lg:t-w-[20px] lg:t-h-[20px]'
      />
    )}
  </div>
)
