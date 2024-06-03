import {FC} from 'react'
import {parseISO, format} from 'date-fns'
import '../../qrComponents/Style/style.css'
import {useDispatch} from 'react-redux'
import {AppDispatch} from 'store'
import {setSelectedFolder} from 'store/qrStore/qrSlice'

type Props = {
  content: {
    name: string
    createdAt: string
    qrs?: number
    id?: string
    owner?: string
  }
}

const Card: FC<Props> = ({content}: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const onClick = () => {
    dispatch(setSelectedFolder(content.id))
  }
  return (
    <div
      onClick={() => onClick()}
      className='card t-cursor-pointer t-h-full t-px-6 t-py-6 t-w-full t-shadow-md'
    >
      <div className='t-flex r-flex-row t-items-center t-justify-between'>
        <div className='t-flex t-flex-col t-gap-3'>
          <h5 className='t-text-[18.7px] t-font-medium'>{content.name}</h5>
          {content.createdAt && (
            <span className='t-text-[16px] t-text-t1'>
              {' '}
              {format(parseISO(content.createdAt), 'MMM dd, yyyy')}
            </span>
          )}
        </div>

        <div className='t-rounded-full t-bg-primaryblue t-flex t-flex-row t-items-center t-justify-center t-text-[qrFolders4px] t-w-20 t-h-20 text-white'>
          {content.qrs}
        </div>
      </div>
    </div>
  )
}

export default Card
