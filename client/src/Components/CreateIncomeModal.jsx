import React, { useState, useEffect } from 'react'
import '../Styles/incomeModal.css'
import { useGlobalContext } from '../Context/globalContext';

const inputKeys = {
    inputIncomeName: 'name',
    inputIncomeTotal: 'total',
    inputIncomeDescription: 'description',
    inputIncomeDate: 'date'
}


const CreateIncomeModal = ({ budget }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState({
        name: "",
        total: "",
        description: "",
        date: ""
    })

    const { auth, createUserIncome } = useGlobalContext();

    const toggleModal = (isOpen) => {
        setIsOpen(!isOpen)
    }

    const handleChange = evt => {
        console.log('Event on change: ', evt.target.value)
        const key = inputKeys[evt.target.id]
        setState({
            ...state,
            [key]: evt.target.value
        })
    }

    const clearIncomeChanges = () => {
        setState({ name: '', total: '', description: '', date: '' })
    }

    const createIncome = (event, data) => {

        console.log('Creating Income', data)
        event.preventDefault();
        createUserIncome(data.name, data.total, data.description, data.date, budget)
        setState({
            name: "",
            total: "",
            description: "",
            date: ""
        })
    }

    return (
        <div>
            <button type="button" id='income-add-button' className="btn btn-circle" onClick={() => toggleModal(isOpen)} data-toggle="modal" data-target=".bd-example-modal-md">
                <i className="bi bi-plus-square"></i>
                <span id='income-modal-save-icon'>Add Income</span></button>

            <div className={isOpen ? `displayModal modal fade bd-example-modal-md show` : `hideModal modal fade bd-example-modal-md hide`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="text-white bg-dark bg-gradient shadow-sm mb-3 modal-content">
                        <div className="modal-header">
                            <div className='income-logo'>
                                <i id='income-icon' className="bi bi-person-circle me-3 fs-6 "></i>
                                <span id='income-title-tag' className="brand-name fs-6">Create Income</span>
                            </div>
                            <button id='button-income-modal-close' type="button" className="btn btn-circle" data-mdb-dismiss="modal" onClick={() => toggleModal(isOpen)} aria-label="Close"><i className="bi bi-x-circle"></i></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => createIncome(e, state)}>
                                <div className="col-10 mb-3">
                                    <div id='income-input-container' className="form-group">
                                        <label id='income-label' className="small mb-1" htmlFor="inputIncomeName">Income Name:</label>
                                        <input className="form-control" id="inputIncomeName" type="text" minLength="5" maxLength="30" placeholder="Income Name" onChange={(e) => handleChange(e)} value={state.name} />
                                    </div>
                                </div>
                                <div className="col-10 mb-3">
                                    <div id='income-input-container' className="form-group">
                                        <label id='income-label' className="small mb-1" htmlFor="inputIncomeTotal">Total income: </label>
                                        <input className="form-control" id="inputIncomeTotal" type="text" maxLength="10" placeholder="Total income" onChange={(e) => handleChange(e)} value={state.total} />
                                    </div>
                                </div>
                                <div className="col-10 mb-3">
                                    <div id='income-input-container' className="form-group">
                                        <label id='income-label' className="small mb-1" htmlFor="inputIncomeDescription">Description</label>
                                        <textarea className="form-control" placeholder="Income Description" id="inputIncomeDescription" onChange={(e) => handleChange(e)} value={state.description}></textarea>
                                    </div>
                                </div>
                                <div className="col-10 mb-3">
                                    <div id='income-input-container' className="form-group">
                                        <label id='income-label' className="small mb-1" htmlFor="inputIncomeDate">Date</label>
                                        <input type='date' className="form-control" placeholder="dd-mm-yyyy" min="1997-01-01" max="2030-12-31" id="inputIncomeDate" onChange={(e) => handleChange(e)} value={state.date}></input>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <div id='income-buttons-container' className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-outline-success overflow-auto" type="submit" onClick={(e) => createIncome(e, state)}>
                                    <i className="bi bi-check2-circle"></i>
                                    <span id='signup-save-btn'>Create</span></button>
                                <button className="btn btn-outline-secondary overflow-auto" type="button" onClick={clearIncomeChanges} ><i className="bi bi-x-circle"></i><span id='signup-clear-btn'>Clear</span></button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateIncomeModal