import {Button, Col, DatePicker, Image, List, Row, Space} from 'antd'
import React, {useEffect, useState, createRef, useRef} from 'react'
import {useSelector} from 'react-redux'
import {scaleLinear} from 'd3-scale'
import {ComposableMap, Geographies, Geography, Sphere, Graticule} from 'react-simple-maps'
import {useScreenshot} from 'use-react-screenshot'
import Layout from '../../../GeneratoreBox/Layout'
import {request} from '../../../config/API'
import {COLORS} from '../../../config/theme'
import dateWithSuffix from '../../../helpers/dateWithSuffix'
import greetUser from '../../../helpers/greetUser'
import {openNotification} from '../../../redux/actions/Notification/notifications.action'
import authHeader from '../../../redux/services/authHeader'
import styles from './AdminDashboard.module.css'
import Countup from 'react-countup'
import {AiOutlineQrcode} from 'react-icons/ai'
import {useHistory} from 'react-router-dom'
import {loader} from '../../../assets/images'
import {getStripId} from '../../../redux/actions/Membership/membership.actions'
import {useDispatch} from 'react-redux'
import {FiUsers} from 'react-icons/fi'
import {AiOutlineEye} from 'react-icons/ai'
import {RiStackshareLine} from 'react-icons/ri'
import {AiTwotoneLock} from 'react-icons/ai'
import {Bar, Doughnut} from 'react-chartjs-2'
import moment from 'moment'
import {updateTourState} from '../../../redux/actions/Admin/admin.actions'
import {isMobile} from 'react-device-detect'

const Website = ({text}) => {
  const [open, setOpen] = useState(false)
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  const truncate = (input) => {
    const temp = input || ''
    return temp?.length > 15 ? `${temp?.substring(0, 15)}...` : temp
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{cursor: 'pointer'}}
        onClick={() => {
          setOpen((prev) => !prev)
        }}
      >
        <p>{truncate(text)}</p>
      </div>
      {open && (
        <div
          ref={wrapperRef}
          style={{
            position: 'absolute',
            right: 0,
            padding: '10px 20px',
            background: 'white',
            outline: '1px solid lightGray',
            boxShadow: '0px 0px 5px .5px',
            zIndex: 1,
            borderRadius: '1rem',
            width: isMobile ? '75vw' : '25rem',
          }}
        >
          <div
            style={{
              flexDirection: 'column',
              paddingTop: '.75rem',
              paddingBottom: '.75rem',
            }}
          >
            <p
              style={{
                cursor: 'pointer',
                fontWeight: '400',
                fontSize: '1.15rem',
                overflowWrap: 'break-word',
              }}
              onClick={() => {
                window.open(text, '_blank')
              }}
            >
              {text}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
// import { utils, writeFile } from "xlsx";
const AdminDashboard = () => {
  const dispatch = useDispatch()
  const {RangePicker} = DatePicker
  const {user} = useSelector((state) => state.auth)
  const {subscribedPlan} = useSelector((state) => state.membership)
  const {tourActive, stepIndex} = useSelector((state) => state.user)
  const [topPerformingCards, setTopPerformingCards] = useState([])
  const [topTapLocations, setTopTapLocations] = useState([])
  const [hourWiseAnalysis, setHourWiseAnalysis] = useState([])
  const [dayWiseAnalysis, setDayWiseAnalysis] = useState([])
  const [geoAnalysis, setGeoAnalysis] = useState([])
  const [deviceAnalysis, setDeviceAnalysis] = useState([])
  const [browserAnalysis, setBrowserAnalysis] = useState([])
  const [lastUsersActivities, setLastUsersActivities] = useState([])
  const [dayWiseLeadAnalysis, setDayWiseLeadAnalysis] = useState([])
  const [topActionsClicked, setTopActionsClicked] = useState([])
  const [avgVisitorTime, setAvgVisitorTime] = useState(0)
  const [totalVisitorTime, setTotalVisitorTime] = useState(0)
  const [totalLeads, setTotalLeads] = useState(0)
  const [totalWaveCards, setTotalWaveCards] = useState(0)
  const [allowrdWavedCards, setAllowrdWavedCards] = useState(0)
  const [topLinksClicked, setTopLinksClicked] = useState([])
  const [totalSubUsers, setTotalSubUsers] = useState(0)
  const [mostRecentVisitors, setMostRecentVisitors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {primaryDark} = COLORS
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  })
  const dayLeadAnalysisOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        // display: true,
        text: 'Day-Wise Lead Analysis',
      },
    },
  }
  const hourAnalysisOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        // display: true,
        text: 'Hour-Wise Analysis',
      },
    },
  }
  const dailyAnalysisOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        // display: true,
        text: 'Day-Wise Analysis',
      },
    },
  }
  const hourAnalysis = {
    labels: hourWiseAnalysis?.map((item) => moment(item?._id, 'hh').format('LT')),
    datasets: [
      {
        label: 'Hour-Wise',
        data: hourWiseAnalysis?.map((item) => item.count),
        backgroundColor: 'rgba(75, 124, 249, 0.5)',
      },
    ],
  }
  const dayAnalysis = {
    labels: dayWiseAnalysis?.map((item) =>
      moment(item?._id === 7 ? 0 : item?._id, 'd').format('ddd')
    ),
    datasets: [
      {
        label: 'Day-Wise',
        data: dayWiseAnalysis?.map((item) => item.count),
        backgroundColor: 'rgba(75, 124, 249, 0.5)',
      },
    ],
  }
  const dayLeadAnalysis = {
    labels: dayWiseLeadAnalysis?.map((item) =>
      moment(item?._id === 7 ? 0 : item?._id, 'd').format('ddd')
    ),
    datasets: [
      {
        label: 'Day-Wise',
        data: dayWiseLeadAnalysis?.map((item) => item.count),
        backgroundColor: 'rgba(75, 124, 249, 0.5)',
      },
    ],
  }
  const dayLeadAnalysisDummy = {
    labels: [1, 2, 3, 4, 5, 6, 7]?.map((item) => moment(item === 7 ? 0 : item, 'd').format('ddd')),
    datasets: [
      {
        label: 'Day-Wise',
        data: [10, 20, 30, 40, 30, 20, 10]?.map((item) => item),
        backgroundColor: 'rgba(75, 124, 249, 0.5)',
      },
    ],
  }
  const devices = {
    labels: deviceAnalysis?.map((item) => (item._id === 'Window' ? 'Windows' : item._id)),
    datasets: [
      {
        label: 'Device Analysis',
        data: deviceAnalysis?.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const devicesDummy = {
    labels: ['Device1', 'Device2', 'Device3', 'Device4'],
    datasets: [
      {
        label: 'Device Analysis',
        data: [1, 3, 2, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const browsers = {
    labels: browserAnalysis?.map((item) => item._id),
    datasets: [
      {
        label: 'Browser Analysis',
        data: browserAnalysis?.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(11, 231, 255, 0.8)',
          'rgba(311, 121, 255, 0.8)',
          'rgba(911, 229,235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(11, 231, 255, 1)',
          'rgba(311, 121, 255, 1)',
          'rgba(911, 229,235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const browsersDummy = {
    labels: ['Browser1', 'Browser2', 'Browser3', 'Browser4', 'Browser5'],
    datasets: [
      {
        label: 'Browser Analysis',
        data: [3, 1, 4, 2, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(11, 231, 255, 0.8)',
          'rgba(311, 121, 255, 0.8)',
          'rgba(911, 229,235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(11, 231, 255, 1)',
          'rgba(311, 121, 255, 1)',
          'rgba(911, 229,235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const topLinks = {
    labels: topLinksClicked?.map((item) =>
      item._id === 'sociallink' ? 'Social Link' : 'Web Link'
    ),
    datasets: [
      {
        label: 'Top Links',
        data: topLinksClicked?.map((item) => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(11, 231, 255, 0.8)',
          'rgba(311, 121, 255, 0.8)',
          'rgba(911, 229,235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(11, 231, 255, 1)',
          'rgba(311, 121, 255, 1)',
          'rgba(911, 229,235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const topLinksDummy = {
    labels: ['LinkType1', 'LinkType2'],
    datasets: [
      {
        label: 'Top Links',
        data: [2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(11, 231, 255, 0.8)',
          'rgba(311, 121, 255, 0.8)',
          'rgba(911, 229,235, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(11, 231, 255, 1)',
          'rgba(311, 121, 255, 1)',
          'rgba(911, 229,235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  const geoAnalysisDummy = [
    {ISO3: 'AUS', count: 0.7},
    {ISO3: 'PAK', count: 0.2},
    {ISO3: 'USA', count: 0.1},
    {ISO3: 'DEU', count: 0.2},
    {ISO3: 'FJI', count: 0.6},
  ]
  const mostRecentVisitorsDummy = [
    {
      _id: 1,
      browser: 'Browser1',
      country: 'Country1',
      city: 'City1',
      source: 'souce1',
      createdAt: moment(Date.now()).format('ll'),
    },
    {
      _id: 2,
      browser: 'Browser2',
      country: 'Country2',
      city: 'City2',
      source: 'souce2',
      createdAt: moment(Date.now()).format('ll'),
    },
    {
      _id: 3,
      browser: 'Browser3',
      country: 'Country3',
      city: 'City3',
      source: 'souce3',
      createdAt: moment(Date.now()).format('ll'),
    },
    {
      _id: 4,
      browser: 'Browser4',
      country: 'Country4',
      city: 'City4',
      source: 'souce5',
      createdAt: moment(Date.now()).format('ll'),
    },
  ]
  const topTapLocationsDummy = [
    {
      _id: 'City1',
      count: 20,
    },
    {
      _id: 'City2',
      count: 15,
    },
    {
      _id: 'City3',
      count: 10,
    },
    {
      _id: 'City4',
      count: 5,
    },
  ]
  const geoUrl = '/GeoFeatures.json'
  const colorScale = scaleLinear().domain([0.29, 0.68]).range(['#b1defc', '#35a2eb'])
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // }
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()
  useEffect(() => {
    if (image) {
      const linkSource = `${image}`
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = linkSource
      downloadLink.target = '_self'
      downloadLink.download = `${new Date()}.png`
      downloadLink.click()
    }
  }, [image])
  const handleExport = () => {
    takeScreenshot(ref.current)
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getStats = () => {
    // setStats({});
    setIsLoading(true)
    request
      .get(`super-Q1box-admin-gate24`, {
        headers: {...authHeader()},
        params: {
          queryDateRange: dateRange,
        },
      })
      .then(({data: {data}}) => {
        setAllowrdWavedCards(data.admin.qrAllowed)
        setTotalWaveCards(data.adminQr)
        setTotalSubUsers(data.subuser)
        setTopPerformingCards(data.topScanedCards)
        setTopTapLocations(data.topScanedLocations)
        setHourWiseAnalysis(data.hourWiseAnalysis)
        setDayWiseAnalysis(data.dayWiseAnalysis)
        setLastUsersActivities(data.lastActivities)
        setDeviceAnalysis(data.deviceAnalysis)
        setBrowserAnalysis(data.browserAnalysis)
        setGeoAnalysis(data.geoAnalysis)
        setTopActionsClicked(data.topActionsCalled)
        setDayWiseLeadAnalysis(data.dayWiseLeadAnalysis)
        setMostRecentVisitors(data.mostRecentVisitors)
        setAvgVisitorTime(data.totalAndAvgTime[0]?.avgQuantity)
        setTotalVisitorTime(data.totalAndAvgTime[0]?.total)
        setTotalLeads(data.totalLeads)
        setTopLinksClicked(data.topLinksClicked)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        const error = err?.response?.data?.data || 'Something Happened'
        openNotification({
          message: 'Error',
          description: JSON.stringify(error),
          icon: 'error',
        })
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getStats()
    //eslint-disable-next-line
  }, [dateRange])
  const history = useHistory()
  const date = new Date()
  const userName = user?.fullName.split(' ')
  const flex = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
    borderRadius: 13,
    padding: '25px 50px',
    gap: 15,
  }
  useEffect(() => {
    if (!user?.stripeId) {
      dispatch(getStripId())
    }
  }, [dispatch, user.stripeId])

  useEffect(() => {
    if (tourActive && stepIndex > 0) {
      setTimeout(() => {
        dispatch(updateTourState(true, null, true)) //run, stepIndex, tourActive
      }, 1200)
    }
  }, [dispatch, tourActive, stepIndex])
  return (
    <Layout heading='Admin Dashboard'>
      <Space direction='horizontal' size={24} style={{marginBottom: '1rem'}}>
        <RangePicker
          disabledDate={(d) => !d || d.isAfter(new Date())}
          onChange={(date) => {
            if (date && date[0]?._d) {
              const newRange = {startDate: date[0]?._d, endDate: date[1]?._d}
              setDateRange(newRange)
            } else {
              setDateRange({startDate: null, endDate: null})
            }
          }}
        />
        <Button
          id='export_button'
          shape='round'
          type='primary'
          style={{
            background: isLoading ? '#edededed' : primaryDark,
            borderColor: isLoading ? '#edededed' : primaryDark,
            color: isLoading ? 'gray' : 'white',
          }}
          onClick={handleExport}
          disabled={isLoading === true}
        >
          Export
        </Button>
      </Space>
      <div ref={ref}>
        <Row className={styles.box} xs={6} md={10}>
          <Col xs={24} md={20}>
            <div className={styles.greet}>
              <h2>{greetUser()},</h2>
              <h2>
                {userName[0]} {!userName[1] ? '' : userName[1][0] + '.'}
              </h2>
            </div>
          </Col>
          <Col
            xs={24}
            md={4}
            className={styles.dateContainer}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className={styles.date}>
              <h2 style={{margin: 0}}>
                {date.toLocaleDateString('en-US', {weekday: 'long'})},{' '}
                {date.toLocaleDateString('en-US', {month: 'long'})} {dateWithSuffix()}
              </h2>
            </div>
          </Col>
        </Row>
        <Row gutter={[24, 24]} style={{marginTop: 24}}>
          {isLoading ? (
            <Col span={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '100px 0',
                }}
              >
                <img className='spin-loader' src={loader} preview={false} draggable={false} />
              </div>
            </Col>
          ) : (
            <Space
              direction='horizontal'
              style={{
                marginBottom: '1rem',
                justifyContent: 'center',
                width: '100%',
              }}
              wrap={true}
            >
              <Col>
                <div
                  style={{
                    ...flex,
                  }}
                >
                  <FiUsers
                    style={{
                      width: 75,
                      height: 75,
                      padding: 15,
                      color: 'white',
                      background: primaryDark,
                      borderRadius: 125,
                    }}
                  />
                  <h2 style={{fontSize: 24, lineHeight: 1}}>Sub User{totalSubUsers > 1 && 's'}</h2>
                  <div>
                    <Countup
                      end={totalSubUsers}
                      start={0}
                      duration={1}
                      style={{
                        fontSize: 28,
                        fontWeight: '600',
                        lineHeight: 1,
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div style={{...flex, margin: '0 1rem'}}>
                  <AiOutlineQrcode
                    style={{
                      width: 75,
                      height: 75,
                      padding: 15,
                      color: 'white',
                      background: primaryDark,
                      borderRadius: 125,
                    }}
                  />
                  <h2 style={{fontSize: 24, lineHeight: 1}}>Wave Cards</h2>
                  <div>
                    <Countup
                      end={totalWaveCards}
                      start={0}
                      duration={1}
                      style={{
                        fontSize: 28,
                        fontWeight: '600',
                        lineHeight: 1,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: '600',
                        lineHeight: 1,
                      }}
                    >
                      /
                    </span>
                    <Countup
                      end={allowrdWavedCards}
                      start={0}
                      duration={1}
                      style={{
                        fontSize: 28,
                        fontWeight: '600',
                        lineHeight: 1,
                      }}
                    />
                  </div>
                </div>
              </Col>
              <Col>
                <div style={{...flex, margin: '0 1rem'}}>
                  <RiStackshareLine
                    style={{
                      width: 75,
                      height: 75,
                      padding: 15,
                      color: 'white',
                      background: primaryDark,
                      borderRadius: 125,
                    }}
                  />
                  <h2 style={{fontSize: 24, lineHeight: 1}}>Total Leads</h2>
                  {subscribedPlan?.paymentStatus === 'SUCCESS' ? (
                    <div>
                      <Countup
                        end={totalLeads}
                        start={0}
                        duration={1}
                        style={{
                          fontSize: 28,
                          fontWeight: '600',
                          lineHeight: 1,
                        }}
                      />
                    </div>
                  ) : (
                    <AiTwotoneLock
                      onClick={() => {
                        history.push('/app/subscriptions-and-plans')
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        color: primaryDark,
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </div>
              </Col>
              <Col>
                <div style={{...flex, margin: '0 1rem'}}>
                  <AiOutlineEye
                    style={{
                      width: 75,
                      height: 75,
                      padding: 15,
                      color: 'white',
                      background: primaryDark,
                      borderRadius: 125,
                    }}
                  />
                  <h2 style={{fontSize: 24, lineHeight: 1}}>{`Total Card’s`}</h2>
                  <h3 style={{fontSize: 20, lineHeight: 1}}>{`visiting time`}</h3>
                  {subscribedPlan?.paymentStatus === 'SUCCESS' ? (
                    <div>
                      <Countup
                        suffix=' min'
                        end={totalVisitorTime / 60}
                        start={0}
                        duration={1}
                        style={{
                          fontSize: 28,
                          fontWeight: '600',
                          lineHeight: 1,
                        }}
                      />
                    </div>
                  ) : (
                    <AiTwotoneLock
                      onClick={() => {
                        history.push('/app/subscriptions-and-plans')
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        color: primaryDark,
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </div>
              </Col>
              <Col>
                <div style={{...flex, margin: '0 1rem'}}>
                  <AiOutlineEye
                    style={{
                      width: 75,
                      height: 75,
                      padding: 15,
                      color: 'white',
                      background: primaryDark,
                      borderRadius: 125,
                    }}
                  />
                  <h2 style={{fontSize: 24, lineHeight: 1}}>{`Avg Card’s`}</h2>
                  <h3 style={{fontSize: 20, lineHeight: 1}}>{`visiting time`}</h3>
                  {subscribedPlan?.paymentStatus === 'SUCCESS' ? (
                    <div>
                      <Countup
                        suffix=' min'
                        end={avgVisitorTime / 60}
                        start={0}
                        duration={1}
                        style={{
                          fontSize: 28,
                          fontWeight: '600',
                          lineHeight: 1,
                        }}
                      />
                    </div>
                  ) : (
                    <AiTwotoneLock
                      onClick={() => {
                        history.push('/app/subscriptions-and-plans')
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        color: primaryDark,
                        cursor: 'pointer',
                      }}
                    />
                  )}
                </div>
              </Col>
            </Space>
          )}
        </Row>
        <Row xs={24} md={24} style={{marginTop: '1rem'}} justify='space-evenly'>
          <Col
            xs={24}
            md={7}
            style={{
              padding: '1rem',
              boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '13px',
            }}
          >
            <Row justify='center'>
              <p style={{fontWeight: '700', marginBottom: '1rem'}}>Top performing Cards</p>
            </Row>
            <Row style={{display: 'flex', flex: 1}}>
              <Col style={{flex: 1, display: 'flex'}}>
                <p style={{fontWeight: '600'}}>Link</p>
              </Col>
              <Col style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                <p style={{fontWeight: '600'}}>Full-Name</p>
              </Col>
              <Col style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                <p style={{fontWeight: '600'}}>Quantity</p>
              </Col>
            </Row>
            <List
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={topPerformingCards}
              renderItem={(item) => (
                <List.Item style={{display: 'flex', flex: 1}}>
                  <Col style={{flex: 2, display: 'flex'}}>
                    <p>{item?.link}</p>
                  </Col>
                  <Col
                    style={{
                      flex: 2,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <p>{`${item.fName} ${item.lName || ''}`}</p>
                  </Col>
                  <Col
                    style={{
                      flex: 2,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <p>{item?.totalScans}</p>
                  </Col>
                </List.Item>
              )}
            />
          </Col>
          <Col
            xs={24}
            md={8}
            style={{
              padding: '1rem',
              boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '13px',
            }}
          >
            <Row justify='center'>
              <p style={{fontWeight: '700', marginBottom: '1rem'}}>Top Actions Performed</p>
            </Row>
            <Row justify='space-between'>
              <p style={{fontWeight: '600'}}>Actions</p>
              <p style={{fontWeight: '600'}}>Quantity</p>
            </Row>
            <List
              itemLayout='horizontal'
              loading={isLoading}
              dataSource={topActionsClicked}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={<p style={{fontWeight: '400'}}>{item?._id}</p>} />
                  <div>{item?.count}</div>
                </List.Item>
              )}
            />
          </Col>
          <Col
            xs={24}
            md={7}
            style={{
              padding: '1rem',
              boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '13px',
            }}
          >
            <Row justify='center'>
              <p style={{fontWeight: '700', marginBottom: '1rem'}}>Last User Activities</p>
            </Row>
            <Row justify='space-between'>
              <p style={{fontWeight: '600'}}>Name</p>
              <p style={{fontWeight: '600'}}>Activity</p>
            </Row>
            <List
              itemLayout='horizontal'
              dataSource={lastUsersActivities}
              loading={isLoading}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<p style={{fontWeight: '400'}}>{item?.userId?.fullName}</p>}
                  />
                  <div>{item?.actionType}</div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <Row
          xs={24}
          md={24}
          justify='space-around'
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Col
            md={24}
            lg={10}
            style={{
              padding: '1rem',
              boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '13px',
            }}
          >
            <Row justify='center'>
              <p style={{fontWeight: '700', marginBottom: '1rem'}}>
                All Cards Traffic - Hour-Wise Analysis
              </p>
            </Row>
            <Bar loading={isLoading.toString()} options={hourAnalysisOptions} data={hourAnalysis} />
          </Col>
          <Col
            md={24}
            lg={10}
            style={{
              padding: '1rem',
              boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
              borderRadius: '13px',
            }}
          >
            <Row justify='center'>
              <p style={{fontWeight: '700', marginBottom: '1rem'}}>
                All Cards Traffic - Day-Wise Analysis
              </p>
            </Row>
            <Bar loading={isLoading.toString()} options={dailyAnalysisOptions} data={dayAnalysis} />
          </Col>
        </Row>
        {subscribedPlan?.paymentStatus !== 'SUCCESS' && (
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              marginTop: '10rem',
              width: '85%',
              zIndex: 1000,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                height: '15rem',
                width: '40rem',
                backgroundColor: 'white',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
                alignItems: 'center',
              }}
            >
              <AiTwotoneLock
                onClick={() => {
                  history.push('/app/subscriptions-and-plans')
                }}
                style={{
                  width: 120,
                  height: 120,
                  paddingLeft: 25,
                  paddingRight: 15,
                  color: primaryDark,
                  borderRadius: 125,
                  cursor: 'pointer',
                }}
              />
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <p
                  onClick={() => {
                    history.push('/app/subscriptions-and-plans')
                  }}
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  Upgrade to Premium to unlock advance analytics
                </p>
                <Button
                  shape='round'
                  type='primary'
                  style={{
                    background: primaryDark,
                    borderColor: primaryDark,
                    color: 'white',
                    width: '9rem',
                    alignSelf: 'center',
                    marginTop: '1rem',
                  }}
                  onClick={() => {
                    history.push('/app/subscriptions-and-plans')
                  }}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            filter: subscribedPlan?.paymentStatus === 'SUCCESS' ? 'blur(0px)' : 'blur(6px)',
            pointerEvents: subscribedPlan?.paymentStatus !== 'SUCCESS' && 'none',
          }}
        >
          <Row
            xs={24}
            md={24}
            justify='space-around'
            style={{marginTop: '1rem', marginBottom: '1rem'}}
          >
            <Col
              xs={24}
              md={6}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
                textAlign: 'center',
              }}
            >
              <p style={{marginBottom: '1rem', fontWeight: '700'}}>Device Analysis</p>
              <Doughnut
                data={subscribedPlan?.paymentStatus === 'SUCCESS' ? devices : devicesDummy}
              />
            </Col>
            <Col
              xs={24}
              md={6}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  marginBottom: '1rem',
                  fontWeight: '700',
                }}
              >
                Browser Analysis
              </p>
              <Doughnut
                data={subscribedPlan?.paymentStatus === 'SUCCESS' ? browsers : browsersDummy}
              />
            </Col>
            <Col
              xs={24}
              md={6}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  marginBottom: '1rem',
                  fontWeight: '700',
                }}
              >
                Top Links Analysis
              </p>
              <Doughnut
                data={subscribedPlan?.paymentStatus === 'SUCCESS' ? topLinks : topLinksDummy}
              />
            </Col>
          </Row>
          <Row
            xs={24}
            md={24}
            justify='space-around'
            style={{marginTop: '1rem', marginBottom: '1rem'}}
          >
            <Col
              xs={24}
              md={7}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
              }}
            >
              <Row justify='center'>
                <p style={{fontWeight: '700', marginBottom: '1rem'}}>Day-Wise Lead Analysis</p>
              </Row>
              <Bar
                loading={isLoading.toString()}
                options={dayLeadAnalysisOptions}
                data={
                  subscribedPlan?.paymentStatus === 'SUCCESS'
                    ? dayLeadAnalysis
                    : dayLeadAnalysisDummy
                }
              />
            </Col>
            <Col
              xs={24}
              md={5}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
                alignSelf: 'flex-start',
              }}
            >
              <Row justify='center'>
                <p style={{fontWeight: '700', marginBottom: '1rem'}}>
                  Top Locations (Card Performance)
                </p>
              </Row>
              <Row justify='space-between'>
                <p style={{fontWeight: '600'}}>City</p>
                <p style={{fontWeight: '600'}}>Quantity</p>
              </Row>
              <List
                itemLayout='horizontal'
                dataSource={
                  subscribedPlan?.paymentStatus === 'SUCCESS'
                    ? topTapLocations
                    : topTapLocationsDummy
                }
                loading={isLoading}
                style={{}}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={<p style={{fontWeight: '400'}}>{item?._id}</p>} />
                    <div>{item?.count}</div>
                  </List.Item>
                )}
              />
            </Col>
            <Col
              xs={24}
              md={10}
              style={{
                padding: '1rem',
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
              }}
            >
              <Row justify='center'>
                <p style={{fontWeight: '700', marginBottom: '1rem'}}>Most Recent Visitors</p>
              </Row>
              <Row style={{display: 'flex', flex: 1}}>
                <Col style={{flex: 2, display: 'flex'}}>
                  <p style={{fontWeight: '600'}}>Browser</p>
                </Col>
                <Col style={{flex: 2, display: 'flex'}}>
                  <p style={{fontWeight: '600'}}>Country</p>
                </Col>
                <Col style={{flex: 2, display: 'flex'}}>
                  <p style={{fontWeight: '600'}}>City</p>
                </Col>
                <Col style={{flex: 2, display: 'flex'}}>
                  <p style={{fontWeight: '600'}}>Source</p>
                </Col>
                <Col style={{flex: 2, display: 'flex'}}>
                  <p style={{fontWeight: '600'}}>Date</p>
                </Col>
              </Row>
              <List
                itemLayout='horizontal'
                loading={isLoading}
                dataSource={
                  subscribedPlan?.paymentStatus === 'SUCCESS'
                    ? mostRecentVisitors
                    : mostRecentVisitorsDummy
                }
                renderItem={(item) => (
                  <List.Item style={{flex: 1, display: 'flex'}}>
                    <Col style={{flex: 2, display: 'flex'}}>
                      <p>{item?.browser || 'unknown'}</p>
                    </Col>
                    <Col style={{flex: 2, display: 'flex'}}>
                      <p>{item?.country || 'unknown'}</p>
                    </Col>
                    <Col style={{flex: 2, display: 'flex'}}>
                      <p>{item?.city || 'unknown'}</p>
                    </Col>
                    <Col style={{cursor: 'pointer', flex: 2, display: 'flex'}}>
                      {item?.source ? <Website text={item?.source} /> : 'unknown'}
                    </Col>
                    <Col style={{flex: 2, display: 'flex'}}>
                      <p>{moment(item?.createdAt).format('ll')}</p>
                    </Col>
                  </List.Item>
                )}
              />
            </Col>
          </Row>

          <Row xs={24} md={24} justify='space-around'>
            <Col
              xs={24}
              md={12}
              style={{
                boxShadow: '2px 1px 15px -3px rgba(0, 0, 0, 0.1)',
                borderRadius: '13px',
              }}
              align='center'
            >
              <p
                style={{
                  fontWeight: '700',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                Geo Analysis
              </p>
              <ComposableMap
                projection='geoMercator'
                projectionConfig={{
                  center: [0, 30],
                  scale: 110,
                }}
              >
                <Sphere stroke='#E4E5E6' strokeWidth={0} />
                <Graticule stroke='#E4E5E6' strokeWidth={0} />
                <Geographies geography={geoUrl}>
                  {({geographies}) =>
                    geographies.map((geo) => {
                      const d =
                        subscribedPlan?.paymentStatus === 'SUCCESS'
                          ? geoAnalysis.find((s) => s.ISO3 === geo.id)
                          : geoAnalysisDummy.find((s) => s.ISO3 === geo.id)
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={d ? colorScale(d.count) : '#ebebeb'}
                        />
                      )
                    })
                  }
                </Geographies>
              </ComposableMap>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}
export default AdminDashboard
