import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react'
import moment from 'moment'
const {axiosInstance} = require('../../../../axios/index')

const Banner = () => {
  const [bannerData, setBannerData] = useState([])
  const getbanner = async () => {
    try {
      let res = await axiosInstance.get('/banner/getbanner')
      setBannerData(res?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getbanner()
  }, [])
  const endTimeUnix = bannerData.length && bannerData[0]?.couponRedeemBy
  const currentUnixTime = moment().unix()
  let checkTime = endTimeUnix < currentUnixTime ? false : true

  const {user} = useSelector((state) => state.auth)
  const calculateRemainingTime = () => {
    const now = moment().unix()
    const remainingSeconds = endTimeUnix - now
    return moment.duration(remainingSeconds, 'seconds')
  }

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime())

  useEffect(() => {
    if (bannerData.length) {
      const interval = setInterval(() => {
        setRemainingTime(calculateRemainingTime())
      }, 1000)

      return () => clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bannerData])
  if (!bannerData.length) {
    return <div></div>
  }

  return (
    <>
      {user?.role !== 'superAdmin' && bannerData?.length > 0 && bannerData[0]?.status && (
        <div
          style={{
            background: `${bannerData[0]?.bgColor}`,
            padding: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            <div style={{textAlign: 'center'}} className='dangerouslysetinnerhtml'>
              <div
                dangerouslySetInnerHTML={{
                  __html: bannerData[0]?.bannerTitle,
                }}
              />
            </div>

            {bannerData[0]?.announcement === 'coupon' && (
              <p
                style={{
                  textAlign: 'center',
                  color: checkTime ? 'white' : 'red',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginLeft: '20px',
                }}
              >
                {checkTime ? (
                  <>
                    {remainingTime.days()} days, {remainingTime.hours()} hours,
                    {remainingTime.minutes()} minutes, {remainingTime.seconds()} seconds
                  </>
                ) : (
                  'Coupon expired'
                )}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Banner
