import React, { useState, useEffect } from 'react'

import BudgetCard from '../Components/BudgetCard'
import Pagination from '../Components/Pagination'
import '../Styles/budget.css'

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

const MockData = [
    {
        name: 'Mock Budget 1',
        balance: 100,
        description: 'Mock Budget 1 Description. Here should be a brief description of the budget.',
    },
    {
        name: 'Mock Budget 2',
        balance: 200,
        description: 'Mock Budget 2 Description. Here should be a brief description of the budget.',
    },
    {
        name: 'Mock Budget 3',
        balance: 300,
        description: 'Mock Budget 3 Description. Here should be a brief description of the budget.',
    },
    {
        name: 'Mock Budget 4',
        balance: 400,
        description: 'Mock Budget 4 Description. Here should be a brief description of the budget.',
    }
]

const Budget = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const deleteBudget = (name) => {
        console.log('Deleting budget: ', name)
    }

    return (
        <div className='col-md-11 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                <div className='col-md-12 mx-auto center-block'>
                    <div className='budget-list-logo'>
                        <i id='budget-title-icon' className="bi bi-wallet-fill me-3 fs-5"></i>
                        <span id='budget-title-tag' className="brand-name fs-4">My Budgets</span>
                    </div>
                    <div class="row mb-3">
                        {
                            MockData.map(el => (<BudgetCard
                                cardClassNames={cardClassNames}
                                cardIds={cardIds}
                                header={el.name}
                                title={`Current Balance: ${el.balance}$`}
                                text={el.description}
                                cardId={cardIds}
                                links={cardsLinks}
                                onDelete={deleteBudget}
                            />))
                        }
         
                    </div>

                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} nPages={5} />
                </div>
            </div>
        </div>
    )
}

export default Budget