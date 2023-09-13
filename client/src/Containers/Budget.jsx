import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/globalContext';
import BudgetCard from '../Components/BudgetCard'
import Pagination from '../Components/Pagination'
import '../Styles/budget.css'
import CreateBudgetModal from '../Components/CreateBudgetModal';
import UpdateBudgetModal from '../Components/UpdatebudgetModal';

const cardsLinks = [
    {
        index: 1,
        id: 'budget-card-links-income',
        href: '/incomes/',
        class: 'card-link',
        text: 'Incomes',
        hasIcon: false,
        icon: {
            id: '',
            class: ''
        }
    },
    {
        index: 2,
        id: 'budget-card-links-expense',
        href: '/expenses/',
        class: 'card-link',
        text: 'Expenses',
        hasIcon: false,
        icon: {
            id: '',
            class: ''
        }
    },
    {
        index: 3,
        id: 'budget-card-links-delete',
        href: '#',
        class: 'card-link',
        text: 'Expenses',
        hasIcon: true,
        icon: {
            id: 'budget-delete-icon',
            class: 'bi bi-trash3-fill'
        }
    }
]

const cardIds = {
    headerId: 'budget-card-header'
}

const cardClassNames = {
    container: 'col-sm-3',
    card: 'card text-white bg-primary bg-gradient bg-opacity-50 shadow-sm mb-3',
    cardHeader: 'card-header',
    cardBody: 'card-body',
    cardTitle: 'card-title',
    cardText: 'card-text',
    linksContainer: 'd-md-flex justify-content-md-end'
}

const checkValidSession = (auth, navigate) => {
    if (!auth) {
       navigate('/');
    }
}

const Budget = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate();
    const { auth, budgets, getUserBudgets, budgetsPages, deleteUserBudget } = useGlobalContext();
    checkValidSession(auth, navigate);
    const deleteBudget = (id) => {
        console.log('Deleting budget: ', id)
        deleteUserBudget(id)
    }

    useEffect(() => {
        getUserBudgets()
    }, [auth])

    const checkBudgetsPerPage = (page, sort) => {
        getUserBudgets(page, sort)
    }

    return (
        <div className='col-md-11 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                <div className='col-md-12 mx-auto center-block'>
                    <div className='budget-list-logo'>
                        <i id='budget-title-icon' className="bi bi-wallet-fill me-3 fs-5"></i>
                        <span id='budget-title-tag' className="brand-name fs-4">My Budgets</span>
                        <hr />

                    </div>
                    {auth ? <CreateBudgetModal /> : <div></div>}

                    {auth ?   <div className="row mb-3">
                        {
                            budgets.map(el => (<BudgetCard
                                cardClassNames={cardClassNames}
                                cardIds={cardIds}
                                header={el.name}
                                title={`Current Balance: ${el.balance}$`}
                                text={el.description}
                                cardId={cardIds}
                                links={cardsLinks}
                                budgetId={el.id}
                                onDelete={deleteBudget}
                                updateCards={<UpdateBudgetModal 
                                    name={el.name} 
                                    balance={el.balance} 
                                    description={el.description} 
                                    id={el.id} />}
                            />))
                        }

                    </div> : <div/>}
                   {auth ?  <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} nPages={budgetsPages} checkBudgetsPerPage={checkBudgetsPerPage} sort={4}/> : <div></div>}
                </div>
            </div>
        </div>
    )
}

export default Budget