import Input from '../macros/Input'

const BusinessCard = () => {
  return (
    <div className='t-flex-column t-gap-4'>
      <div className='t-grid t-grid-cols-1 sm:t-grid-cols-2 md:t-grid-cols-3 t-gap-4'>
        <Input name='firstName' inputLabel='First Name' placeholder='First Name' required={true} />
        <Input name='lastName' inputLabel='Last Name' placeholder='Last Name' required={true} />

        <Input name='email' placeholder='Enter Email' inputLabel='Email' />

        <Input name='workPhone' inputLabel='Work Phone' placeholder='Work' />
        <Input name='mobilePhone' inputLabel='Mobile' placeholder='Mobile' required={true} />

        <Input inputLabel='Company' name='companyName' placeholder='Name' />
        <Input inputLabel='Job' name='jobTitle' placeholder='Job' />

        <Input name='street' placeholder='Street' inputLabel='Street' />

        <Input inputLabel='City' name='city' placeholder='City' />
        <Input inputLabel='Zip Code' name='zipcode' placeholder='Zipcode' />

        <Input inputLabel='Country' name='country' placeholder='Country' />
        <Input inputLabel='State' name='state' placeholder='State' />

        <Input name='website' placeholder='https://www.website.com' inputLabel='Website' />
      </div>
      <Input name='summary' type='textarea' placeholder='Summary' inputLabel='Summary' />
    </div>
  )
}

export default BusinessCard
