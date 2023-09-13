import React, { useState, useEffect } from 'react'
import '../Styles/incomeModal.css'
import { useGlobalContext } from '../Context/globalContext';

const inputKeys = {
    inputIncomeName: 'name',
    inputIncomeTotal: 'total',
    inputIncomeDescription: 'description',
    inputIncomeDate: 'date'
}

const UpdateIncomeModal = ({ budget, name, description, date, total, incomeId }) => {

    const [isOpen, setIsOpen] = useState(false);

    const { auth, updateCurrentIncome } = useGlobalContext();

    const [state, setState] = useState({
        name: "",
        total: "",
        description: "",
        date: ""
    })
    useEffect(() => {
        setState({
            name: name,
            total: total,
            description: description,
            date: date
        })
    }, [auth])

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

    const updateIncome = (event, data) => {

        console.log('Creating Income', data)
        event.preventDefault();
        updateCurrentIncome(data.name, data.total, data.description, data.date, budget, incomeId)
    }

    return (
        <div>
            <i id='update-table-icon' className="bi bi-pencil-square" onClick={() => toggleModal(isOpen)} data-toggle="modal" data-target=".bd-example-modal-md"></i>


            <div className={isOpen ? `displayModal modal fade bd-example-modal-md show` : `hideModal modal fade bd-example-modal-md hide`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="text-white bg-dark bg-gradient shadow-sm mb-3 modal-content">
                        <div className="modal-header">
                            <div className='income-logo'>
                                <i id='income-icon' className="bi bi-person-circle me-3 fs-6 "></i>
                                <span id='income-title-tag' className="brand-name fs-6">Update Income</span>
                            </div>
                            <button id='button-income-modal-close' type="button" className="btn btn-circle" data-mdb-dismiss="modal" onClick={() => toggleModal(isOpen)} aria-label="Close"><i className="bi bi-x-circle"></i></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => updateIncome(e, state)}>
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
                                <button className="btn btn-outline-success overflow-auto" type="submit" onClick={(e) => updateIncome(e, state)}>
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

export default UpdateIncomeModal