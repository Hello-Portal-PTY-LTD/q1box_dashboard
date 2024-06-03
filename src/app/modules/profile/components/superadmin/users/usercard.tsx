import {toAbsoluteUrl} from '_metronic/helpers'
import {useRef, useState} from 'react'
import {useOnClickOutside} from 'hooks/useOnClickOutside'
import {AddUserModal} from './usermodals/addusermodal'
import {DeleteUserModal} from './usermodals/deleteuserModal'
import {ViewUserModal} from './usermodals/viewuser'
import {IsSuperEditor, IsSuperViewer, roleFormat} from 'utils/functions'
import {useSelector} from 'react-redux'
import {RootState} from 'store'

const UserCard = ({user, offset}: any) => {
  const {firstName, lastName, email, id, role, picture} = user
  const [opensetting, setOpenSettings] = useState(false)
  const [usertodelete, setUserToDelete] = useState({id: ''})
  const logeduser = useSelector((state: RootState) => state.auth.user)

  const [usertoview, setUserToView] = useState({
    firstName: '',
    lastName: '',
    id: '',
    email: '',
    role: '',
    picture: '',
  })

  const [opendelete, setOpenDelete] = useState(false)
  const [openview, setOpenView] = useState(false)
  const [openedit, setOpenEdit] = useState(false)
  const settingref = useRef<HTMLDivElement>(null)

  useOnClickOutside(settingref, () => {
    setOpenSettings(false)
  })
  return (
    <div className='t-items-center t-bg-[white] t-py-10 t-relative'>
      <img
        alt='img'
        src={require('../../../../../../assets/media/dotsmenu.png')}
        height={5}
        width={5}
        className={
          IsSuperViewer(logeduser?.role)
            ? ' t-pointer-events-none t-opacity-50  t-absolute  t-right-5 t-top-5 '
            : ' t-absolute  t-right-5 t-top-5 t-cursor-pointer'
        }
        onClick={() => {
          setOpenSettings(true)
        }}
      />

      {opensetting ? (
        <div ref={settingref}>
          <ul className='t-absolute t-z-[9999999] flex-column t-w-[200px] t-py-1 t-top-12 t-right-5 t-bg-white t-border t-border-greyp t-rounded-xl'>
            <li
              className='t-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer  hover:t-text-blue-600'
              onClick={() => {
                setOpenSettings(false)
                setOpenEdit(true)
              }}
            >
              <img
                alt='img'
                src={toAbsoluteUrl('/media/icons/duotune/general/gen055.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Edit</span>
            </li>
            <li
              className={
                IsSuperEditor(logeduser?.role)
                  ? ' t-pointer-events-none t-opacity-50 t-p-2  t-flex t-gap-3 t-items-center'
                  : 't-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer  hover:t-text-blue-600'
              }
              onClick={() => {
                setUserToDelete({
                  id: id,
                })
                setOpenSettings(false)
                setOpenDelete(true)
              }}
            >
              <img
                alt='img'
                src={toAbsoluteUrl('/media/icons/duotune/general/gen027.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Delete Profile</span>
            </li>{' '}
            <li
              className='t-p-2  t-flex t-gap-3 t-items-center t-cursor-pointer hover:t-text-blue-600'
              onClick={() => {
                setUserToView({
                  firstName,
                  lastName,
                  email,
                  id,
                  role,
                  picture,
                })
                setOpenSettings(false)
                setOpenView(true)
              }}
            >
              <img
                alt='img'
                src={toAbsoluteUrl('/media/icons/duotune/communication/com006.svg')}
                height={30}
                width={30}
                className='t-text-[green]'
              />
              <span className='t-text-lg'>Profile</span>
            </li>
          </ul>
        </div>
      ) : (
        ''
      )}

      <div className='t-flex t-flex-col t-items-center t-mb-3'>
        <img
          alt='img'
          src={picture ? picture : toAbsoluteUrl('/media/avatars/300-1.jpg')}
          className='t-rounded-full t-min-h-[100px] min-w-[100px]
          t-max-w-[100px] t-max-h-[100px]'
          loading='lazy'
        />{' '}
        <h3 className='t-text-xl t-mt-2 t-text-[green]'>{roleFormat(role)}</h3>
        {/* <h3 className='t-text-xl t-mt-2 '>{id}</h3> */}
      </div>

      <div className='t-flex t-flex-col t-items-center t-mt-5 t-mb-5'>
        <img
          alt='img'
          src={toAbsoluteUrl('/media/icons/duotune/communication/com002.svg')}
          height={30}
          width={30}
          className='t-text-[green]'
        />
        <h2 className='t-text-xl t-mt-4 t-font-bold'>{firstName + ' ' + lastName}</h2>
        <a className='t-text-lg  t-mt-2 t-underline t-cursor-pointer' href={`mailto:${email}`}>
          {email}
        </a>
      </div>

      <AddUserModal
        show={openedit}
        user={user}
        handleClose={() => {
          setOpenEdit(false)
        }}
      />

      <DeleteUserModal
        show={opendelete}
        user={usertodelete}
        offset={offset}
        handleClose={() => {
          setOpenDelete(false)
        }}
      />

      <ViewUserModal
        show={openview}
        user={usertoview}
        handleClose={() => {
          setOpenView(false)
        }}
      />
    </div>
  )
}
export default UserCard
