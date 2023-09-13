import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '../Components/Table';
import Pagination from '../Components/Pagination';
import { useGlobalContext } from '../Context/globalContext';
import CreateExpenseModal from '../Components/CreateExpenseModal';
import UpdateExpenseModal from '../Components/UpdateExpenseModal';

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

const checkValidSession = (auth, navigate) => {
    if (!auth) {
        navigate('/');
    }
}

const getBudget = (path) => {
    let budget = path.split('expenses/')[1]
    if (budget) {
        budget = budget.replace(/%20/g, " ")
        return budget;
    }
}

const Expenses = () => {
    const navigate = useNavigate()

    console.log('navigate', getBudget(window.location.pathname))
    const [currentPage, setCurrentPage] = useState(1)
    const [currentBudget, setCurrentBudget] = useState('')
    const { auth, expenses, userProfile, expensesPages, getUserExpenses, deleteUserExpense } = useGlobalContext();
    checkValidSession(auth, navigate)

    
    useEffect(() => {
        getUserExpenses(userProfile.username, getBudget(window.location.pathname))
        setCurrentBudget(getBudget(window.location.pathname))
    }, [auth, userProfile])

    const updateExpense = (data) => {
        console.log('Updating Expense: ', { ...data })
    }

    const deleteExpense = (data) => {
        console.log('Deleting Expense: ', { ...data })
        deleteUserExpense(data.id, data.budget, data.total)
    }

    const checkExpensesPerPage = (page, sort) => {
        getUserExpenses(page, sort)
    }

    return (
        <div className='col-md-11 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                <div className='col-md-12 mx-auto center-block'>
                    <div className='profile-logo'>
                        <i id='profile-icon' className="bi bi-piggy-bank-fill me-3 fs-4"></i>
                        <span id='profile-title-tag' className="brand-name fs-4">My Expenses</span>
                        <hr />
                    </div>
                    {auth ? <CreateExpenseModal budget={currentBudget} /> : <div />}

                    {auth ? <Table
                        headers={tableHeaders}
                        body={expenses}
                        handleUpdate={updateExpense}
                        handleDelete={deleteExpense}
                        updateForm={UpdateExpenseModal}
                        budget={currentBudget}
                    /> : <div />}
                    {auth ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} nPages={expensesPages} checkBudgetsPerPage={checkExpensesPerPage} sort={6} /> : <div />}
                </div>


            </div>
        </div>
    )
}

export default Expenses