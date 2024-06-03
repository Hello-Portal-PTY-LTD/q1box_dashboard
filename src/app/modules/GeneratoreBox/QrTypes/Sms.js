import Input from '../macros/Input'
import Textarea from '../macros/TextArea'

const Sms = () => {
  return (
    <div className='t-flex-column t-gap-7'>
      <div className='t-flex-column t-gap-3'>
        <Input name='phone' placeholder='+61 1234567890' inputLabel='Mobile Number' />
        <Textarea name='message' placeholder='Your Message Here:' inputLabel='Message' />
      </div>
    </div>
  )
}

export default Sms
