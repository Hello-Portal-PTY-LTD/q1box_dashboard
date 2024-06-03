import './Style/style.css'

interface ToggleProps {
  setvalue: (e: Boolean) => void
}

function Toggle({setvalue}: ToggleProps) {
  return (
    <>
      <label className='switch t-scale-75'>
        <input
          type='checkbox'
          onChange={(e) => {
            if (e.target.checked) {
              setvalue(true)
            } else {
              setvalue(false)
            }
          }}
        />
        <span className='slider round'></span>
      </label>
    </>
  )
}

export default Toggle
