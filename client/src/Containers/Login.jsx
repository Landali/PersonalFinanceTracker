import '../Styles/login.css'
import React, { useState, useEffect } from "react"
import { useGlobalContext } from '../Context/globalContext';
import { useNavigate } from 'react-router-dom';

const inputKeys = {
    inputUsername: 'user',
    inputPassword: 'password',
}

const checkAuth = (auth, navigate) => {
    if (auth.username && auth.username !== '') {
        navigate('/profile');
    }
}

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        user: "",
        password: "",
        isPasswordVisible: false
    })

    const { auth, signIn } = useGlobalContext()
    checkAuth(auth, navigate)
    useEffect(() => {
        setState({
            ...state,
        })
        checkAuth(auth, navigate)
    }, [auth])

    const logIn = (event, data) => {
        event.preventDefault();
        const user_sigin = {
            user: data.user,
            password: data.password,
        }
        signIn(user_sigin)
    }

    const showPassword = () => {
        setState({ ...state, isPasswordVisible: !state.isPasswordVisible })
    }

    const handleChange = evt => {
        const key = inputKeys[evt.target.id]
        setState({
            ...state,
            [key]: evt.target.value
        })
    }

    return (
        <div className='col-md-6 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">

                <div className='col-md-8 mx-auto center-block'>
                <form onSubmit={(e) => logIn(e, state)}>
                    <div className='signin-logo'>
                        <i id='signin-icon' className="bi bi-person-circle me-3 fs-4"></i>
                        <span id='signin-title-tag' className="brand-name fs-4">Sign In</span>
                        <hr />
                    </div>

                    <div className="mb-3">
                        <label id='signin-label' className="small mb-1" htmlFor="inputUsername">User</label>
                        <input className="form-control" id="inputUsername" type="text" minLength="5" maxLength="15" placeholder="Enter your username or email"  onChange={(e) => handleChange(e)}  value={state.user} />
                    </div>

                    <div className="mb-3">
                        <label id='signin-label' className="small mb-1" htmlFor="inputPassword">Password</label>
                        <input className="form-control" id="inputPassword" type={state.isPasswordVisible ? "text" : "password"} minLength="3" maxLength="15" placeholder="Enter your password" onChange={(e) => handleChange(e)} value={state.password} />
                        <i id='toggle-password' className={state.isPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'} onClick={() => showPassword()}></i>
                    </div>
                    <div id='sigign-link-container' className="d-grid gap-2 d-md-flex justify-content-end">
                        <a id='signin-registration-link'><i id='signin-registration-link-icon' className={'bi bi-person-plus-fill me-1 fs-5'} ></i><span>Don't have a user? Sign Up here!</span></a>
                    </div>

                    <br />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button className="btn btn-outline-info overflow-auto" type="submit" >
                            <i id='signin-user-icon' className="bi bi-check2-circle me-1 fs-6"></i>
                            <span id='signin-user-btn'>Sign In</span></button>
                    </div>

                </form>
                </div>
            
            </div>

        </div>
    )
}

export default Login