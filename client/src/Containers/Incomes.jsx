import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '../Components/Table';
import Pagination from '../Components/Pagination';
import { useGlobalContext } from '../Context/globalContext';
import CreateIncomeModal from '../Components/CreateIncomeModal';
import UpdateIncomeModal from '../Components/UpdateIncomeModal';

const tableHeaders = [
    {
        name: 'Expense'
    },
    {
        name: 'Description'
    },
    {
        name: 'Total'
    },
    {
        name: 'Date'
    },
    {
        name: 'Update'
    },
    {
        name: 'Delete'
    }
]

const tableBody = [
    {
        name: "Water Bottle",
        description: 'Bottle of water',
        total: 10,
        date: '11/12/23'
    },
    {
        name: "Juice Bottle",
        description: 'Bottle of Juice',
        total: 11,
        date: '10/12/23'
    },
    {
        name: "Soda Bottle",
        description: 'Bottle of Soda',
        total: 14,
        date: '9/12/23'
    }
];

const getBudget = (path) => {
    let budget = path.split('incomes/')[1]
    budget = budget.replace(/%20/g, " ")
    return budget;
}

const Incomes = () => {
    const navigate = useNavigate()
    console.log('navigate', getBudget(window.location.pathname))
    const [currentPage, setCurrentPage] = useState(1)
    const [currentBudget, setCurrentBudget] = useState('')
    const { auth, incomes, incomesPages, getUserIncomes } = useGlobalContext();

    console.log('check budget', getBudget(window.location.pathname))
    useEffect(() => {
        getUserIncomes(getBudget(window.location.pathname))
        setCurrentBudget(getBudget(window.location.pathname))
    }, [auth])

    const updateIncome = (data) => {
        console.log('Updating Income: ', { ...data })
    }

    const deleteIncome = (data) => {
        console.log('Deleting Income: ', { ...data })
    }

    const checkIncomesPerPage = (page, sort) => {
        getUserIncomes(page, sort)
    }

    return (
        <div className='col-md-11 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                <div className='col-md-12 mx-auto center-block'>
                    <div className='profile-logo'>
                        <i id='profile-icon' className="bi bi-piggy-bank-fill me-3 fs-4"></i>
                        <span id='profile-title-tag' className="brand-name fs-4">My Incomes</span>
                        <hr />
                    </div>
                    <CreateIncomeModal budget={currentBudget} />

                    <Table
                        headers={tableHeaders}
                        body={incomes}
                        handleUpdate={updateIncome}
                        handleDelete={deleteIncome}
                        updateForm={UpdateIncomeModal}
                        budget={currentBudget}
                    />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} nPages={incomesPages} checkBudgetsPerPage={checkIncomesPerPage} />
                </div>


            </div>
        </div>
    )
}

export default Incomes