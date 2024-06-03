import {Empty} from 'antd'

const PlainTable = ({columns, rows, emptyDescription, disableTitle = false}) => {
  return (
    <div className='t-grid  t-w-full t-grid-cols-2 t-gap-2 375:t-grid-cols-1 '>
      <div className='375:t-w-[80vw] 500:t-w-auto t-mb-5'>
        {!disableTitle && (
          <div className='t-mb-3 bg-white t-p-3 t-rounded-md'>
            <h2 className='t-text-2xl t-font-bold '>Transaction History</h2>
          </div>
        )}
        <div className='t-overflow-x-scroll'>
          <table className='t-rounded-xl t-table-auto t-w-full t-text-black font-inter  t-text-[12px] md:t-text-[16px] t-whitespace-nowrap'>
            <thead className='t-rounded-xl '>
              <tr className='t-rounded-xl t-bg-[#FAFAFA]  t-font-semibold t-w-full'>
                {columns?.map((column, index) => (
                  <td key={index} className='t-px-4 t-py-7 t-text-center'>
                    {column}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className='t-rounded-xl t-bg-white '>
              {rows?.map((row, rowIndex) => (
                <tr key={rowIndex} className='t-border-b'>
                  {row?.map((cell, cellIndex) => (
                    <td key={cellIndex} className='t-px-4 t-py-7 t-text-center'>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows?.length === 0 && (
            <Empty className='t-mt-10' description={<p>{emptyDescription}</p>} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PlainTable
