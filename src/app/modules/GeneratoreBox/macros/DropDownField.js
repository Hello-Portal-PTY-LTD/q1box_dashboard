import {Controller} from 'react-hook-form'
import DropDown from './DropDown'

const DropDownField = ({label, name, control, listItems}) => {
  return (
    <div>
      <label className='t-block t-text-sm t-font-medium t-text-gray-700'>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({field: {value, onChange}}) => (
          <DropDown
            title={value}
            label={label}
            listItems={listItems}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            onChange={onChange}
          />
        )}
      />
    </div>
  )
}

export default DropDownField
