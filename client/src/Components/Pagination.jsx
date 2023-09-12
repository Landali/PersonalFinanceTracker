import React, { useState, useEffect } from 'react'

const Pagination = ({ nPages = 5, currentPage = 1, setCurrentPage, checkBudgetsPerPage }) => {
    // const nPages = Math.ceil(data.length / recordsPerPage)
    const data = 5

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        console.log('Next page')
        if (currentPage !== nPages) {
            setCurrentPage(currentPage + 1)
            checkBudgetsPerPage(currentPage + 1, 4)
        }
    }
    const prevPage = () => {
        console.log('Previous page')
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
            checkBudgetsPerPage(currentPage - 1, 4)
        }
    }

    const setPaginationPageNumber = (pgNumber) => {
        setCurrentPage(pgNumber)
        checkBudgetsPerPage(pgNumber, 4)
    }

    return (
        <nav>
            <ul className='pagination justify-content-end'>
                <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <a className="page-link"
                        onClick={prevPage}
                        href='#'>

                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item ${currentPage == pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setPaginationPageNumber(pgNumber)}
                            className='page-link'
                            href='#'>

                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link"
                        onClick={nextPage}
                        href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
