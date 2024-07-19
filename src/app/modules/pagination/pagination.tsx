import React, {useState, useEffect} from 'react'
import {Pagination} from 'antd'

interface PaginationComponentProps {
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  currentPage?: number // Make currentPage optional by adding a question mark
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}) => {
  const [currPage, setCurrPage] = useState(1)

  useEffect(() => {
    // When the current page changes, calculate the offset and notify the parent component
    const offset = (currPage - 1) * itemsPerPage
    onPageChange(offset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    if (currentPage !== undefined) {
      const offset = (page - 1) * itemsPerPage
      onPageChange(offset)
    } else {
      setCurrPage(page)
    }
  }

  return (
    <div style={{width: '100%', display: 'flex', marginTop: '20px', justifyContent: 'flex-end'}}>
      <div>
        {totalItems > 0 && (
      
          <Pagination
            current={currentPage || currPage}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            style={{width: '100%'}}
            showSizeChanger={false}
          />
        )}
      </div>
    </div>
  )
}

export default PaginationComponent
