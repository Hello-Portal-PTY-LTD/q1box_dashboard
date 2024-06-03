import {GRAPHICS} from '../graphics'

function Button({
  text,
  onClick,
  type,
  className,
  buttonClass,
  checkEnable,
  actionType,
  loading,
  disable,
}) {
  return (
    <div className={`t-relative t-m-auto ${className}  t-object-contain t-flex t-items-center`}>
      {checkEnable && (
        <img
          src={GRAPHICS.ARROW_CHECK}
          width={20}
          height={20}
          alt='check_arrow'
          className='t-absolute t-right-2 -t-top-[10px] t-z-10'
        />
      )}

      <button
        onClick={onClick}
        type={actionType}
        disabled={loading || disable}
        className={`
          t-w-full    
          t-text-base 
          t-rounded-[7px]
          ${
            type === 'fill'
              ? 't-gradient lg:t-px-[20px] t-py-[5px] lg:t-py-[10px] t-text-white'
              : type === 'WhiteFill'
              ? 't-bg-white t-text-primary'
              : 'gradient-border t-py-1 t-lg:px-4 lg:t-py-2 t-text-primary'
          }
          ${buttonClass}`}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
