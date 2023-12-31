import React, { useState, useEffect } from 'react'
import '../Styles/budgetModal.css'
import { useGlobalContext } from '../Context/globalContext';

const inputKeys = {
    inputBudgetName: 'name',
    inputBudgetBalance: 'balance',
    inputBudgetDescription: 'description'
}

const UpdateBudgetModal = ({ name, balance, description, id}) => {
    const [isOpen, setIsOpen] = useState(false);

    const { auth, updateCurrentBudget } = useGlobalContext();

    const [state, setState] = useState({
        id: "",
        name: "",
        balance: "",
        description: ""
    })

    useEffect(() => {
        setState({
            id: id,
            name: name,
            balance: balance,
            description: description
        })
    }, [auth])



    const toggleModal = (isOpen) => {
        setIsOpen(!isOpen)
    }

    const handleChange = evt => {
        console.log('Event on change: ', evt)
        const key = inputKeys[evt.target.id]
        setState({
            ...state,
            [key]: evt.target.value
        })
    }

    const updateBudget = (event, data) => {
        // NOTE: Encrypt password to send to backend
        console.log('Updating budget', data)
        event.preventDefault();
        updateCurrentBudget(data.name, parseFloat(data.balance, 10), data.description, data.id)
 
    }

    return (
        <div >
            <button type="button" id='budget-update-button' className="btn btn-circle" onClick={() => toggleModal(isOpen)} data-toggle="modal" data-target=".bd-example-modal-md">
                <i  className="bi bi-pencil-square"></i>
            <span id='budget-modal-save-icon'></span></button>

            <div className={isOpen ? `displayModal modal fade bd-example-modal-md show` : `hideModal modal fade bd-example-modal-md hide`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="text-white bg-dark bg-gradient shadow-sm mb-3 modal-content">
                        <div className="modal-header">
                            <div className='budget-logo'>
                                <i id='budget-icon' className="bi bi-person-circle me-3 fs-6 "></i>
                                <span id='budget-title-tag' className="brand-name fs-6">Update Budget</span>
                            </div>
                            <button id='button-budget-modal-close' type="button" className="btn btn-circle" data-mdb-dismiss="modal" onClick={() => toggleModal(isOpen)} aria-label="Close"><i className="bi bi-x-circle"></i></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => updateBudget(e, state)}>
                                <div className="col-10 mb-3">
                                    <div id='budget-input-container' className="form-group">
                                        <label id='budget-label' className="small mb-1" htmlFor="inputBudgetName">Budget Name:</label>
                                        <input className="form-control" id="inputBudgetName" type="text" minLength="5" maxLength="30" placeholder="Budget Name" onChange={(e) => handleChange(e)} value={state.name} />
                                    </div>
                                </div>
                                <div className="col-10 mb-3">
                                    <div id='budget-input-container' className="form-group">
                                        <label id='budget-label' className="small mb-1" htmlFor="inputBudgetBalance">Budget Balance: </label>
                                        <input className="form-control" id="inputBudgetBalance" type="text" maxLength="10" placeholder="Budget Balance" onChange={(e) => handleChange(e)} value={state.balance} />
                                    </div>
                                </div>
                                <div className="col-10 mb-3">
                                    <div id='budget-input-container' className="form-group">
                                        <label id='budget-label' className="small mb-1" htmlFor="inputBudgetDescription">Description</label>
                                        <textarea className="form-control" placeholder="Budget Description" id="inputBudgetDescription" onChange={(e) => handleChange(e)} value={state.description}></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <div id='budget-buttons-container' className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-outline-success overflow-auto" type="submit" onClick={(e) => updateBudget(e, state)}>
                                    <i className="bi bi-check2-circle"></i>
                                    <span id='signup-save-btn'>Update</span></button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default UpdateBudgetModal
