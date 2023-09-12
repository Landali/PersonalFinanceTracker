import React, { useState, useEffect } from 'react'

const BudgetCard = ({ cardClassNames = {}, header = '', title = '', text = '', links = [], cardId = {}, onDelete, budgetId, updateCards }) => {
    const { container, card, cardHeader, cardBody, cardTitle, cardText, linksContainer } = cardClassNames
    const { headerId } = cardId

    return (
        <div className={container}>
            <div className={card}>
                <div id={headerId} className={cardHeader}>
                <div className="modal-header">{header}{updateCards}</div>
                   </div>
                <div className={cardBody}>
                    <h5 className={cardTitle}>{title}</h5>
                    <p className={cardText}>{text}</p>
                    <hr/>
                    <div className={linksContainer}>
                      
                        {
                            links.map(el => {
                                if (el.hasIcon) {
                                    return (<a id={el.id} href={`#`} onClick={() => onDelete(budgetId)} className={el.class}>
                                        <i id={el.icon.id} className={el.icon.class}></i>
                                    </a>)
                                } else {
                                    return (<a id={el.id} href={`${el.href}${budgetId}`} className={el.class}>{el.text}</a>)
                                }
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetCard
