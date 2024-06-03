import {GRAPHICS} from 'app/modules/GeneratoreBox/graphics'

const Loader = () => {
  return (
    <div className='splash-screen'>
      <img src={GRAPHICS.QrLogo} alt='Metronic logo' />
      <p>Loading...</p>
    </div>
  )
}

export default Loader
