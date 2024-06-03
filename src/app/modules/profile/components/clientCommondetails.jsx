import React, {useState} from 'react'
import {Button} from '_metronic/partials/qrComponents'
import {CustomPlanModal} from './superadmin/clients/customPlanModal'
import {Modal} from 'react-bootstrap'
import Input from '_metronic/partials/qrComponents/Input'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser} from 'store/userStore/userActions'
import {useParams} from 'react-router-dom'
import {IsSuperEditor, IsSuperViewer} from 'utils/functions'

const description = 't-font-md'
const title = 't-text-lg t-font-bold'
const wrap = 't-text-center t-flex t-flex-col'
export default function ClientCommonDetails({user, adminView, subPage}) {
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [resetModal, setResetModal] = useState(false)
  const [passwords, setPasswords] = useState()
  const uloading = useSelector((state) => state.user.loading)
  const dispatch = useDispatch()
  const {id} = useParams()
  const logeduser = useSelector((state) => state.auth.user)

  const capitalizeFirstLetterOfWords = (inputString) => {
    if (inputString.length === 0) return ''
    let resultString = inputString.charAt(0).toUpperCase() + inputString.slice(1)

    // Find the index of the first capital letter after the first character
    const capitalIndex = resultString.slice(1).search(/[A-Z]/)

    // If a capital letter is found, add a space before it
    if (capitalIndex >= 0) {
      resultString =
        resultString.slice(0, capitalIndex + 1) + ' ' + resultString.slice(capitalIndex + 1)
    }

    return resultString
  }

  const handlePasswordChange = (event) => {
    const {name, value} = event.target
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }))
  }
  const handleResetPassword = () => {
    if (passwords?.password !== passwords?.confirmPassword) {
      setPasswords((prevPasswords) => ({
        ...prevPasswords,
        message: 'Password not matched',
      }))
    } else {
      if (passwords?.password?.length > 7 && passwords?.confirmPassword?.length > 7) {
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          message: '',
        }))
        dispatch(updateUser({id, password: passwords.password}))
          .unwrap()
          .then(() => {
            setPasswords()
            setResetModal(false)
          })
      } else {
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          message: 'Password Must be greater than 7 characters',
        }))
      }
    }
  }

  return (
    <div className='t-bg-white  t-rounded-lg t-p-6 t-mb-3'>
      <div className='t-overflow-auto t-w-full'>
        {adminView && (
          <div className='t-flex t-flex-col md:t-flex-row t-gap-3 t-items-center t-justify-between'>
            {Object.keys(user).map((prop) => {
              if (prop === 'picture') {
                return (
                  <img
                    src={user[prop]}
                    height={40}
                    width={40}
                    className='t-rounded-full'
                    alt='img'
                  />
                )
              } else {
                return (
                  <div className={wrap}>
                    <div className={title}>{capitalizeFirstLetterOfWords(prop)}</div>
                    <div className={description}>{user[prop]}</div>
                  </div>
                )
              }
            })}

            {subPage ? (
              ''
            ) : (
              <div
                className={
                  IsSuperViewer(logeduser?.role) || IsSuperEditor(logeduser?.role)
                    ? `${wrap} t-pointer-events-none t-opacity-50`
                    : wrap
                }
              >
                <Button
                  click={() => {
                    setShowCustomModal(true)
                  }}
                  className='t-bg-primary hover:t-text-primary t-text-white t-cursor-pointer'
                  Name='Add Custom Plan'
                />
                <p
                  onClick={() => setResetModal(true)}
                  className='t-text-primary  t-mt-3 t-cursor-pointer'
                >
                  Reset Password
                </p>
              </div>
            )}
          </div>
        )}

        <Modal
          show={resetModal}
          backdrop='static'
          keyboard={false}
          // onHide={() => setInfoModal(false)}
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <div className='t-items-center t-flex t-flex-col t-gap-4 t-p-10'>
            <h3 className='t-text-[24px] t-font-bold t-text-black'>Reset Password</h3>

            <div className='t-flex t-flex-col t-w-full t-gap-[3rem]'>
              <div className='t-flex t-flex-col t-gap-10  t-w-full'>
                <Input
                  name='password'
                  onChange={handlePasswordChange}
                  type='password'
                  label='Password'
                />
                <Input
                  name='confirmPassword'
                  onChange={handlePasswordChange}
                  type='password'
                  label='Confirm Password'
                />
              </div>
              {passwords?.message && (
                <span className='t-text-lg t-text-primaryblue t-font-semibold'>
                  {passwords?.message}
                </span>
              )}
              <div className='t-flex t-items-center t-gap-10 t-w-full t-text-[16px]'>
                <Button
                  Name='Reset'
                  loading={uloading}
                  click={handleResetPassword}
                  primary
                  className='t-w-full'
                />
                <Button
                  Name='Cancel'
                  click={() => {
                    setResetModal(false)
                  }}
                  className='t-w-full'
                />
              </div>
            </div>
          </div>
        </Modal>
        <CustomPlanModal
          show={showCustomModal}
          userId={id}
          updatePlan={user?.updatePlan}
          handleClose={() => {
            setShowCustomModal(false)
          }}
        />
      </div>
    </div>
  )
}
