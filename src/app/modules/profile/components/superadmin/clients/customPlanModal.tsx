import React, {useState} from 'react'
import {Spin, message, Modal} from 'antd'
import Input from '_metronic/partials/qrComponents/Input'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import DropDownCustomPlan from 'app/modules/GeneratoreBox/macros/DropDownCustom'
import {useDispatch} from 'react-redux'
import {customSubscriptionPurchase} from 'store/payment/paymentAction'
const initialValues = {
  scans: 0,
  users: 0,
  period: 0,
  amount: 0,
  periodType: 'month',
}
type Props = {
  show: boolean
  handleClose: () => void
  userId: string
  updatePlan: string
}
const validationSchema = Yup.object().shape({
  scans: Yup.number().required('No Of Scans are required').min(1, 'Number must be greater than 0'),
  users: Yup.number().required('No Of Users are required').min(1, 'Number must be greater than 0'),
  period: Yup.number()
    .required('No Of Years are required')
    .when('periodType', {
      is: 'year',
      then: Yup.number().max(1, 'Maximum year should be 1.'),
    })
    .when('periodType', {
      is: 'month',
      then: Yup.number().max(12, 'Maximum months should be 12.'),
    }),
  amount: Yup.number().required('price is required').min(1, 'Number must be greater than 0'),
  periodType: Yup.string().required('Subscription Type is required'),
})

const PaymentOptions = [
  {label: 'Monthly', value: 'month'},
  {label: 'Yearly', value: 'year'},
]
const CustomPlanModal: React.FC<Props> = ({show, handleClose, userId, updatePlan}) => {
  const [paymentPeriod, setPaymentPeriod] = useState('month')
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        dispatch(customSubscriptionPurchase({...values, userId}))
          .unwrap()
          .then(() => {
            handleClose()
            message.success('Successfully Done')
          })
          .catch(() => {
            message.error('Error While making the plan')
          })
      }
    },
  })
  return (
    <Modal width={600} onCancel={handleClose} footer={false} closeIcon={true} open={show}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title t-text-xl t-font-bold'>Create Enterprise Package</h5>
        </div>
        <div className='modal-body '>
          <form onSubmit={formik.handleSubmit} className='t-flex t-flex-col t-gap-3 t-mt-5 '>
            <div className='t-flex  t-gap-10 font-inter'>
              <div className='t-w-full '>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>
                  Number of Scans
                </p>
                <Input
                  type='number'
                  name='scans'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Number of Scans'
                  value={formik.values.scans}
                />
                {formik.touched.scans && formik.errors.scans && (
                  <div className='t-text-primary'>{formik?.errors?.scans}</div>
                )}
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium  t-mb-2'>
                  Number Of Users
                </p>
                <Input
                  type='number'
                  name='users'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='No Of Users'
                  value={formik.values.users}
                />
                {formik.touched.users && formik.errors.users && (
                  <div className='t-text-primary'>{formik.errors.users}</div>
                )}
              </div>
            </div>
            <div className='t-flex t-gap-10  font-inter'>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>
                  Subscription Type
                </p>
                <DropDownCustomPlan
                  title='Select Payment'
                  listItems={PaymentOptions}
                  onChange={(list: any) => {
                    setPaymentPeriod(list.value)
                    formik.setFieldValue('periodType', list.value)
                    if (list.value === 'year') {
                      formik.setFieldValue('period', 1)
                    }
                  }}
                />
              </div>
              <div className='t-w-full'>
                <p className='t-text-[14px] md:t-text-[16px] t-font-medium t-mb-2'>
                  Number of {paymentPeriod === 'year' ? 'Years' : 'Months'}
                </p>
                <Input
                  type='number'
                  name='period'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={`Number of ${paymentPeriod === 'year' ? 'Years' : 'Months'}`}
                  value={formik.values.period}
                  // max={paymentPeriod === 'year' ? 1 : 12}
                />
                {formik.touched.period && formik.errors.period && (
                  <div className='t-text-primary'>{formik.errors.period}</div>
                )}
              </div>
            </div>
            <div className='t-w-full'>
              <p className='t-text-[14px] md:t-text-[16px] t-font-medium  t-mb-2'>Price $</p>
              <Input
                type='number'
                name='amount'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Price'
                value={formik.values.amount}
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className='t-text-primary'>{formik.errors.amount}</div>
              )}
            </div>

            <Spin className='t-w-full' spinning={false}>
              <button
                type='submit'
                className='t-bg-primary t-w-full t-h-[50px] md:t-h-[51px] t-text-white t-rounded-[12px] font-inter t-text-[16px] t-font-semibold t-mt-5'
              >
                Create Plan
              </button>
            </Spin>
            <p className='t-text-sm'>
              *If user already have plan then new subscription will be generated against him, also
              that would be started when the current will end, other wise an email is send to him to
              buy a plan.
            </p>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export {CustomPlanModal}
