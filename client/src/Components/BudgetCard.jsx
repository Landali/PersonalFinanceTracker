import React, { useState, useEffect } from 'react'

const BudgetCard = ({ cardClassNames = {}, header = '', title = '', text = '', links = [], cardId = {}, onDelete }) => {
    const { container, card, cardHeader, cardBody, cardTitle, cardText, linksContainer } = cardClassNames
    const { headerId } = cardId

    return (
        <div className={container}>
            <div className={card}>
                <div id={headerId} className={cardHeader}>{header}</div>
                <div className={cardBody}>
                    <h5 className={cardTitle}>{title}</h5>
                    <p className={cardText}>{text}</p>
                    <div className={linksContainer}>
                        {
                            links.map(el => {
                                console.log('Has Icon? ', el.hasIcon, el.icon)
                                if (el.hasIcon) {
                                    return (<a id={el.id} href={el.href} onClick={() => onDelete(header)} className={el.class}>
                                        <i id={el.icon.id} className={el.icon.class}></i>
                                    </a>)
                                } else {
                                    return (<a id={el.id} href={el.href} className={el.class}>{el.text}</a>)
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
