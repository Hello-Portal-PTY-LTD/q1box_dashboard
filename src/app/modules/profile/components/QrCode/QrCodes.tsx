/* eslint-disable jsx-a11y/anchor-is-valid */
import {QR_CARD_DATE} from '../../../../../mock'
import Card from '../../../../../_metronic/partials/content/cards/Card'
import Button from '../../../../../_metronic/partials/qrComponents/Button'
import CardSelection from './CardSelection'
import {useEffect, useRef, useState} from 'react'
import {createFolder, createLabel, getUserQrFolders, getUserQrLabels} from 'store/qrStore/qrAction'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from 'store'
import Input from '../../../../../_metronic/partials/qrComponents/Input'
import * as authHelper from '../../../auth/core/AuthHelpers'
import {useOnClickOutside} from '../../../../../hooks/useOnClickOutside'
import {Empty, Spin, message} from 'antd'
import './style.css'
import PaginationComponent from 'app/modules/pagination/pagination'
import {Modal, Button as BootstrapButton} from 'react-bootstrap'
import {INDUSTRIES_LIST} from '../../../../../mock'
import {updateAuthUser} from 'store/authStore/authAction'
import {Country, City} from 'country-state-city'
import {Link} from 'react-router-dom'
const {axiosInstance} = require('../../../../../axios/index')

export function QrCodes() {
  const modalRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalRef, () => setNewFolder(false))
  const [newFolder, setNewFolder] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const {foldersInfo, foldersLoading, loading} = useSelector((state: RootState) => state.qr)
  const {
    industry: Indu,
    country: Cont,
    city: Cit,
    _id,
  } = useSelector((state: RootState) => state.auth.user)
  const user = useSelector((state: RootState) => state.auth.user)
  const [folderName, setFolderName] = useState('')
  const [infoModal, setInfoModal] = useState(false)
  const [isWelcomeModal, setIsWelcomeModal] = useState(true)
  const roles = ['viewer', 'whiteLabel']
  const [labelmodal, setLableModal] = useState(false)
  const [label, setLabel] = useState(null)
  const role = authHelper.getAuth()?.role
  const userId = authHelper.getAuth()?.userId
  const [err, setErr] = useState<string | undefined>(undefined)
  const [displayedFolders, setDisplayedFolders] = useState<
    {
      name: string
      owner: string
      id: string
      createdAt: string
    }[]
  >([])

  const handleClicks = () => {
    setNewFolder(true)
  }
  useEffect(() => {
    const userId = authHelper.getAuth()?.userId
    dispatch(getUserQrFolders({userId}))
    dispatch(getUserQrLabels({userId}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (foldersInfo?.qrFolders?.length > 0) {
      setDisplayedFolders(foldersInfo?.qrFolders?.slice(0, 4))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foldersInfo?.qrFolders])

  const handleCreateLabel = () => {
    if (label === '' || label === null) {
      message.error('Please Enter a Label Name')
    } else {
      dispatch(createLabel(label))
        .unwrap()
        .then(() => {
          setLableModal(false)
          setLabel(null)
        })
        .catch(() => {
          setLableModal(false)
        })
    }
  }

  function isValidFolderName(folderName: string) {
    // Check if folderName is not empty and contains at least one alphabet character
    const regex = /[a-zA-Z]/
    return folderName.length > 0 && regex.test(folderName)
  }

  const createFolderSubmit = () => {
    if (isValidFolderName(folderName)) {
      let name = folderName?.trim()
      dispatch(createFolder(name))
        .unwrap()
        .then(() => {
          dispatch(getUserQrFolders({userId, offset: 0, limit: 4}))
          setNewFolder(false)
          setFolderName('')
        })
        .catch(() => {
          setNewFolder(false)
        })
    } else {
      setErr('Folder name Required')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidFolderName(e.target.value)) {
      setFolderName(e.target.value)
      setErr('')
    } else {
      setErr('Folder name Required')
    }
  }

  const handleCancel = () => {
    setNewFolder(false)
  }

  const handleFolderPageChange = (offset: number) => {
    const startIndex = offset
    const endIndex = startIndex + 4
    const displayedFolders = foldersInfo?.qrFolders?.slice(startIndex, endIndex)
    setDisplayedFolders(displayedFolders)
  }

  const [countries, setCountries] = useState<any>([])
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [cities, setCities] = useState<any>([])
  const [selectedCity, setSelectedCity] = useState<any>('')
  const [industry, setIndustry] = useState('')
  const [disabled, setDisabled] = useState(false)

  const handleCountrySelect = (country: any) => {
    console.log(country)
    setSelectedCountry(country)
  }
  const handleCitySelect = (city: any) => {
    console.log(city)
    setSelectedCity(city)
  }
  const handleIndustryInput = (value: any) => {
    setIndustry(value)
  }

  const handleSubmit = () => {
    if (selectedCountry?.name === '' || industry === '') {
      setDisabled(true)
    } else if (selectedCountry?.name !== '' && industry !== '') {
      setDisabled(false)
      dispatch(
        updateAuthUser({_id: _id, industry, country: selectedCountry?.name, city: selectedCity})
      )
        .unwrap()
        .then(message.success('User profile updated'))
        .finally(setInfoModal(false))
    }
  }

  useEffect(() => {
    console.log((user as any)?.isWelcome || (user as any)?.isWelcome === undefined)
    if ((user as any)?.isWelcome) {
      setIsWelcomeModal(true)
    } else {
      setIsWelcomeModal(false)
      firstQuestionModal()
    }
  }, [user])

  const firstQuestionModal = () => {
    if (
      Cont === '' &&
      Indu === '' &&
      Cit === '' &&
      user?.role === 'admin' &&
      role === 'admin' &&
      user
    ) {
      setInfoModal(true)
      const fetchCountryNames = async () => {
        try {
          const allCountries = Country.getAllCountries()

          const newzelandindex = allCountries.findIndex((country) => country.name === 'New Zealand')
          const australiaindex = allCountries.findIndex((country) => country.name === 'Australia')

          if (newzelandindex !== -1 && australiaindex !== -1) {
            const newzeland = allCountries.splice(newzelandindex, 1)[0]
            const australia = allCountries.splice(australiaindex, 1)[0]

            allCountries.unshift(newzeland, australia)
          }
          if (allCountries) {
            setCountries(allCountries)
          }
        } catch (error) {
          console.error('Error fetching country names:', error)
        }
      }

      fetchCountryNames()
    }
  }

  // useEffect(() => {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [Cont, Indu, Cit, user, isWelcomeModal])

  useEffect(() => {
    setCities([])
    setSelectedCity('')
    if (selectedCountry?.name) {
      const allCities = City.getCitiesOfCountry(selectedCountry.code)
      setCities(allCities)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry?.name])

  const handleIsWelcomeModal = () => {
    axiosInstance
      .post('/users/update-iswelcome', {id: userId})
      .then((res: any) => {
        setIsWelcomeModal(false)

        console.log('caled ==============>>>>>>>>>>>>>>>.')
        firstQuestionModal()
      })
      .catch((err: any) => {
        console.log(err)
      })

    setIsWelcomeModal(false)
  }

  return (
    <div className='t-flex t-flex-col t-gap-8 '>
      <div>
        <div className='t-flex t-flex-row t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3'>
          <h3 className='t-font-bold t-my-2 t-text-[24px]'>Folders</h3>

          {role && !roles.includes(role) && (
            <div className='t-flex t-flex-col 500:t-flex-row t-items-center t-gap-2 500:t-gap-6 t-my-2'>
              <Button
                Name='New Folder'
                Icon='/media/icons/buttonIcons/folder.svg'
                click={handleClicks}
              />
              <Button
                Name='New Label'
                Icon='/media/icons/buttonIcons/folder.svg'
                click={() => {
                  setLableModal(true)
                }}
              />
              {/* <Dropdown title='CREATE QR CODE' listItems={QR_CODE} primary={true} /> */}
              <Link to='/dashboard/create-qr'>
                <Button
                  Name='Create QR Code'
                  className='bg-[white] t-text-primary t-cursor-pointer'
                />
              </Link>
            </div>
          )}
        </div>
        <Spin spinning={foldersLoading}>
          <div className='w-full'>
            {displayedFolders?.length > 0 && displayedFolders[0]?.name ? (
              <div className='t-grid t-grid-cols-1 500:t-grid-cols-2 lg:t-grid-cols-3 xl:t-grid-cols-4 t-gap-5'>
                {!foldersLoading &&
                  displayedFolders?.map(
                    (item, index) =>
                      // Add a condition to check if the 'name' property exists in the item
                      item?.name &&
                      item?.id && (
                        <div key={index} className='t-w-full'>
                          <Card content={item} />
                        </div>
                      )
                  )}
              </div>
            ) : (
              <Empty description={<span>No Folders</span>} />
            )}

            <PaginationComponent
              totalItems={foldersInfo?.qrFolders?.length}
              itemsPerPage={4}
              onPageChange={(offset: number) => handleFolderPageChange(offset)}
            />
          </div>
        </Spin>
      </div>

      <div>
        <div className='t-flex t-items-center t-justify-between t-flex-wrap t-flex-stack t-mb-3'>
          <h3 className='t-font-bold t-my-2 t-text-[24px]'>QR Codes</h3>
        </div>

        <div className=' t-min-h-[500px]'>
          <CardSelection setLableModal={setLableModal} cardData={QR_CARD_DATE} />
        </div>
      </div>

      {newFolder ? (
        <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
          <div
            ref={modalRef}
            className='t-bg-white t-px-16 t-py-20 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'
          >
            <h3 className='t-text-[24px] t-font-bold t-text-black'>New Folder</h3>
            <div className='t-h-[60px] t-gap-3  t-w-full'>
              <Input placeholder='Enter Folder Name' onChange={onChange} />
              <p className='t-text-primaryblue t-mt-3'>{err}</p>
            </div>
            <div className='t-flex t-items-center t-gap-12 t-w-full t-text-[16px]'>
              <Button
                Name='Create'
                loading={loading}
                click={createFolderSubmit}
                primary
                className='t-w-full'
              />
              <Button Name='Cancel' click={handleCancel} className='t-w-full' />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {labelmodal && (
        <div className='t-fixed t-top-0 t-left-0 t-w-[100vw] t-h-[100vh] t-z-[999999] t-bg-[rgba(0,0,0,0.6)] t-flex t-items-center t-justify-center t-px-3'>
          <div className='t-bg-white t-px-16 t-py-20 t-w-[587px] t-flex t-flex-col t-items-center t-justify-center t-gap-10 t-rounded-2xl'>
            <h3 className='t-text-[24px] t-font-bold t-text-black'>New Label</h3>
            <div className='t-h-[60px]  t-w-full'>
              <Input
                placeholder='Enter Label Name'
                onChange={(e: any) => {
                  setLabel(e.target.value)
                }}
              />
            </div>
            <div className='t-flex t-items-center t-gap-12 t-w-full t-text-[16px]'>
              <Button
                Name='Create Label'
                loading={loading}
                click={handleCreateLabel}
                primary
                className='t-w-full'
              />
              <Button
                Name='Cancel'
                click={() => {
                  setLableModal(false)
                }}
                className='t-w-full'
              />
            </div>
          </div>
        </div>
      )}
      {isWelcomeModal && (
        <Modal
          show={isWelcomeModal}
          backdrop='static'
          keyboard={false}
          onHide={handleIsWelcomeModal}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Body>
            <div className='t-w-full t-flex t-flex-col t-gap-8'>
              <div>
                <div onClick={handleIsWelcomeModal} className='t-absolute t-right-8 cursor-pointer'>
                  <img
                    className='t-w-6'
                    src={'/media/svg/qr_dashboard/cross.svg'}
                    alt='cross icon'
                  />
                </div>
                <h3 className='t-font-bold t-text-3xl t-text-center t-mb-4'>Welcome</h3>
                <p className='t-text-xl t-mb-6'>
                  Welcome to Q1box! We're delighted to let you know that your trial is now live.
                </p>
                <p className='t-text-lg t-my-3'>
                  Explore our features, streamline your workflows, and make the most of this trial
                  period.
                </p>
                <p className='t-text-lg'>
                  If you need any assistance along the way, we're here to help. Let's embark on this
                  journey together!
                </p>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {infoModal && (
        <Modal
          show={infoModal}
          backdrop='static'
          keyboard={false}
          onHide={() => setInfoModal(false)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Body>
            <div className='t-w-full t-flex t-flex-col t-gap-8'>
              <div>
                <div
                  onClick={() => setInfoModal(false)}
                  className='t-absolute t-right-8 cursor-pointer'
                >
                  <img
                    className='t-w-6'
                    src={'/media/svg/qr_dashboard/cross.svg'}
                    alt='cross icon'
                  />
                </div>
                <h3 className='t-font-bold t-text-3xl t-text-center t-mb-4'>Welcome</h3>
                <p>
                  Before moving forward, we need some details. Kindly fill in the Country and the
                  City you belong to.
                </p>
                <div className='mt-3 t-flex t-flex-col t-gap-3'>
                  <div>
                    <p className='t-font-medium t-mb-1'>Choose your Country</p>

                    <select
                      onChange={(event) => {
                        if (event.target.value) {
                          let country: any = JSON.parse(event.target.value)
                          handleCountrySelect({name: country.name, code: country.isoCode})
                        } else {
                          handleCountrySelect(null)
                        }
                      }}
                      style={{border: '1px solid rgb(59 130 246)', borderRadius: '8px'}}
                      className='t-p-4 t-w-full t-bg-white'
                    >
                      <option value={''}>Select Country</option>
                      {countries.map((country: any, index: number) => (
                        <option key={index} value={JSON.stringify(country)}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {/* <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle variant='primary' id='country-dropdown'>
                        {selectedCountry ? selectedCountry.name : 'Select a country'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {countries.map((country: any, index: number) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() =>
                              handleCountrySelect({name: country.name, code: country.isoCode})
                            }
                          >
                            {country.name}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown> */}
                  </div>
                  <div>
                    <p className='t-font-medium t-mb-1'>Choose Your City</p>

                    <select
                      disabled={!selectedCountry}
                      onChange={(event) => {
                        if (event.target.value) {
                          let city: any = JSON.parse(event.target.value)
                          handleCitySelect(city.name)
                        } else {
                          handleCitySelect(null)
                        }
                      }}
                      style={{border: '1px solid rgb(59 130 246)', borderRadius: '8px'}}
                      className='t-p-4 t-w-full t-bg-white'
                    >
                      <option value={''}>Select City</option>
                      {cities.map((city: any, index: number) => (
                        <option key={index} value={JSON.stringify(city)}>
                          {city.name}
                        </option>
                      ))}
                    </select>

                    {/* <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle
                        disabled={cities.length > 0 ? false : true}
                        variant='primary'
                        id='country-dropdown'
                      >
                        {selectedCity ? selectedCity : 'Select a City'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {cities.map((city: any, index: number) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => handleCitySelect(city.name)}
                          >
                            {city.name}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown> */}
                  </div>
                  <div>
                    <p className='t-font-medium t-mb-1'>Choose Your Industry</p>

                    <select
                      onChange={(event) => {
                        handleIndustryInput(event.target.value)
                      }}
                      style={{border: '1px solid rgb(59 130 246)', borderRadius: '8px'}}
                      className='t-p-4 t-w-full t-bg-white'
                    >
                      <option value={''}>Select Industry</option>
                      {INDUSTRIES_LIST.map((industry: any, index: number) => (
                        <option key={index} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    {/* <BootstrapDropdown style={{width: '100%'}}>
                      <BootstrapDropdown.Toggle
                        variant='primary'
                        id='country-dropdown'
                        style={{
                          backgroundColor: '#1D59F9',
                        }}
                      >
                        {industry || 'Select Industry'}
                      </BootstrapDropdown.Toggle>
                      <BootstrapDropdown.Menu>
                        {INDUSTRIES_LIST.map((industry: string, index: number) => (
                          <BootstrapDropdown.Item
                            key={index}
                            onClick={() => handleIndustryInput(industry)}
                          >
                            {industry}
                          </BootstrapDropdown.Item>
                        ))}
                      </BootstrapDropdown.Menu>
                    </BootstrapDropdown> */}
                  </div>
                </div>
              </div>
              <div className='t-ml-0 t-flex t-flex-col t-gap-2' aria-disabled={disabled}>
                <BootstrapButton onClick={handleSubmit} id='change-btn'>
                  Save Changes
                </BootstrapButton>
                {disabled && (
                  <span className='t-text-xs t-text-red'>Please fill the form to continue</span>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  )
}
