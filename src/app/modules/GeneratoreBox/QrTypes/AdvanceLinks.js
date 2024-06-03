import ColorPallete from '../ColorPallete'
import {COLOR_PALLETES_ADVANCE_LINKS} from '../utils/mock'
import InputColor from '../macros/inputColor'
import Input from '../macros/Input'
import FileUpload from '../macros/FileUpload'
import {setSelectedPallets} from '../utils/functions'
import {useFieldArray, useFormContext} from 'react-hook-form'
import Button from '../macros/Button'
import {GRAPHICS} from '../graphics'
import FontDropdown from '../macros/SelectFont'

function AdvanceLinks() {
  const {fields, append, remove} = useFieldArray({name: 'links'})

  const {setValue} = useFormContext()

  const handleAddInput = () => {
    append({name: 'Click Me!', url: 'https://www.example.com'})
  }
  const handlePalleteChange = (pallete) => {
    setSelectedPallets(setValue, pallete)
  }

  return (
    <section className='t-flex-column t-gap-6 t-text-t2'>
      <div className='t-row-flex t-gap-[10px] t-items-center t-font-medium'>
        <p>Design</p>
        <img src={GRAPHICS.CROWN} alt='premium' width={20} height={20} />
      </div>
      <div>
        <FontDropdown />
      </div>
      <div className='t-flex-column t-gap-6'>
        <ColorPallete
          pallete={COLOR_PALLETES_ADVANCE_LINKS}
          palleteClass='t-color-palette-flex'
          type='advanceLinks'
          onChange={handlePalleteChange}
        />
        <div className='t-input-color-wrapper'>
          <InputColor name='preview.bgColor' inputLabel='Background Color' />
          <InputColor name='preview.iconsColor' inputLabel='Icons Color' />
          <InputColor name='preview.textColor' inputLabel='Text Color' />
        </div>
        <div className='t-row-flex t-w-full t-gap-10 md:t-gap-40 t-font-medium'>
          <FileUpload name='preview.coverImage' label='Cover Image' accept='image/*' />
          <FileUpload name='preview.profileImage' label='Profile Picture' accept='image/*' />
        </div>
        <div className='t-w-full'>
          <Input inputLabel='Profile Name' name={`preview.name`} placeholder={'Profile Name'} />
        </div>

        <div className='t-flex-column t-gap-[10px]'>
          <div className='t-flex t-mb-3 t-justify-between'>
            <p className='t-text-base t-font-[500]'>Advance Links</p>
          </div>
          <div className='t-flex-column  t-gap-[20px]'>
            {fields?.map(({placeHolder}, index) => {
              return (
                <div key={index} className='t-row-flex  t-items-center t-gap-5'>
                  <div className='t-grid t-w-[93%] t-grid-cols-2 t-gap-2'>
                    <Input
                      name={`links[${index}].name`}
                      width='t-w-full'
                      placeholder={placeHolder}
                    />
                    <Input
                      name={`links[${index}].url`}
                      width='t-w-full'
                      placeholder={placeHolder}
                    />
                  </div>
                  {index >= 1 && (
                    <img
                      className='t-cursor-pointer'
                      src={GRAPHICS.BIN}
                      width={18}
                      height={20}
                      alt='input-delete'
                      onClick={() => {
                        remove(index)
                      }}
                    />
                  )}
                </div>
              )
            })}
            <Button
              text='+ Add More'
              actionType='button'
              type='gradient'
              className='t-w-full'
              buttonClass='t-rounded-xl  t-w-full t-h-[45px] t-bg-none'
              onClick={handleAddInput}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvanceLinks
