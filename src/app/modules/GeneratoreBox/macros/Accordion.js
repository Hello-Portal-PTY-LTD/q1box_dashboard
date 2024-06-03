import React, {useState} from 'react'

const Accordion = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => setIsOpen(!isOpen)

  return (
    <div className='cursor-pointer py-5' onClick={toggleAccordion}>
      <div className='flex justify-between items-center'>
        <h2 className='t-text-base t-sm:text-lg font-semibold'>{title}</h2>

        {isOpen ? (
          <img
            src='/graphics/svgs/faq/minus_circle.svg'
            width={20}
            height={20}
            className='t-w-4 t-sm:w-6 t-h-4 t-sm:h-6'
          />
        ) : (
          <img
            src='/graphics/svgs/faq/plus_circle.svg'
            width={20}
            height={20}
            className='t-w-4 t-sm:w-6 t-h-4 t-sm:h-6'
          />
        )}
      </div>
      {isOpen && <div className='t-mt-1 t-text-sm t-sm:text-base'>{children}</div>}
    </div>
  )
}

export default Accordion
