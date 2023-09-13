import '../Styles/registration.css'
import React, { useState, useEffect } from "react"
import { useGlobalContext } from '../Context/globalContext';
import { useNavigate } from 'react-router-dom';


const checkValidSession = (auth, navigate) => {
    if (auth && auth !== '') {
        navigate('/profile');
    }
}

const inputKeys = {
    inputUsername: 'username',
    inputPassword: 'password',
    inputFirstName: 'firstname',
    inputLastName: 'lastname',
    inputEmailAddress: 'email'
}

const Registration = () => {
    const navigate = useNavigate();
    const { auth, userProfile, signUp } = useGlobalContext();
    checkValidSession(auth, navigate)
    const [state, setState] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        isPasswordVisible: false
    })

    useEffect(() => {
        setState({
            ...state
        })
    }, [userProfile, auth])

    const handleChange = evt => {
        console.log('Event on change: ', evt)
        const key = inputKeys[evt.target.id]
        setState({
            ...state,
            [key]: evt.target.value
        })
    }

    const showPassword = () => {
        setState({ ...state, isPasswordVisible: !state.isPasswordVisible })
    }

    const updateSignUpUser = (event, data) => {
        // NOTE: Encrypt password to send to backend
        console.log('updating profile', data)
        event.preventDefault();
        const profile = {
            username: data.username,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email
        }
        signUp(profile)
    }

    const clearSignUpChanges = () => {
        setState({ username: '', email: '', firstname: '', lastname: '', password: '' })
    }

    const returnToSignIn = () => {
        navigate(-1)
    }

    return (
        <div className='col-md-6 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                {/* Starts profile edit form*/}

                <form onSubmit={(e) => updateSignUpUser(e, state)}>

                    <div className='signup-logo'>
                        <i id='signup-icon' className="bi bi-person-plus-fill me-3 fs-4"></i>
                        <span id='signup-title-tag' className="brand-name fs-4">Sign Up</span>
                        <span id='signup-return-icon' className='' onClick={returnToSignIn}><i className="bi bi-arrow-right-circle"></i> Back to Sign In</span>
                        <hr />
                    </div>

                    <div className="mb-3">
                        <label id='signup-label' className="small mb-1" htmlFor="inputUsername">Username<span id='signup-lbl-description'> (how your name will appear to other users on the site)</span> </label>
                        <input className="form-control" id="inputUsername" type="text" minLength="8" maxLength="15" placeholder="Enter your username" onChange={(e) => handleChange(e)} value={state.username} />
                    </div>
                    <div className="mb-3">
                        <label id='signup-label' className="small mb-1" htmlFor="inputPassword">Password</label>
                        <div className='container--icon-textbox'>
                            <input className="form-control" id="inputPassword" type={state.isPasswordVisible ? "text" : "password"} minLength="8" maxLength="15" placeholder="Enter your password" onChange={(e) => handleChange(e)} value={state.password} />
                            <i id='toggle-password' className={state.isPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => showPassword()}></i>
                        </div>
                    </div>

                    <div className="row gx-3 mb-3">

                        <div className="col-md-6">
                            <label id='signup-label' className="small mb-1" htmlFor="inputFirstName">First name</label>
                            <input className="form-control" id="inputFirstName" type="text" minLength="5" maxLength="20" placeholder="Enter your first name" onChange={(e) => handleChange(e)} value={state.firstname} />
                        </div>


                        <div className="col-md-6">
                            <label id='signup-label' className="small mb-1" htmlFor="inputLastName">Last name</label>
                            <input className="form-control" id="inputLastName" type="text" minLength="5" maxLength="20" placeholder="Enter your last name" onChange={(e) => handleChange(e)} value={state.lastname} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label id='signup-label' className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                        <input className="form-control" id="inputEmailAddress" type="email" minLength="10" maxLength="15" placeholder="Enter your email address" onChange={(e) => handleChange(e)} value={state.email} />
                    </div>
                    <br />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-outline-success overflow-auto" type="submit">
                            <i className="bi bi-check2-circle"></i>
                            <span id='signup-save-btn'>SignUp</span></button>
                        <button className="btn btn-outline-secondary overflow-auto" type="button" onClick={clearSignUpChanges}><i className="bi bi-x-circle"></i><span id='signup-clear-btn'>Clear</span></button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Registration