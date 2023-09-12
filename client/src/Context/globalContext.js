import React, { useContext, useState } from "react"
import axios from 'axios'
import jwt_decode from "jwt-decode";

// NOTE: Add url to react env
const BASE_URL = "http://localhost:3001";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [auth, setAuth] = useState('')
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [userProfile, setUserProfile] = useState({
        username: 'Landali', firstname: 'Allan', lastname: 'Paz', password: '1234', email: 'lan@gmail.com'
    })


    // Mock Up Service

    const dashBoardTable = async () => {
        const response = await axios.get(`${BASE_URL}/user/dash`)
        console.log('Data retrieved for dashboard: ', response.data)
        setDashboard(response.data.data)
        return response.data
    }

    // NOTE: Add to respective service files

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/auth/checkAuth`, {
            headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            localStorage.removeItem('token')
            setAuth('')
        })
        if (response) {
            console.log('Token verified as valid!!')
        }
    }

    // User Login & Registration
    const signIn = async (data = {}) => {
        const response = await axios.post(`${BASE_URL}/auth/signin`, { user: data.user, password: data.password }).catch(err => {
            console.error(`Error to Sign In for user: ${data.user}`, err)
            setAuth(err.response.data.data);
        })
        console.log('Sign in response', response.data.data)
        if (response) {
            const decodedToken = jwt_decode(response.data.data)
            console.log(`Sign in successful for user: ${data.user}`, decodedToken)
            setAuth(response.data.data)
            localStorage.setItem('token', response.data.data)
            const { username, firstname, lastname, email } = decodedToken
            setUserProfile({ username, firstname, lastname, email, password: '1234' })
        }
    }
    const signUp = async (data = {}) => {
        const response = await axios.post(`${BASE_URL}/auth/signup`, { ...data }).catch(err => {
            console.error(`Sign in successful for user: ${data.username}`, err)
        })
        if (response) {
            console.log(`Sign in successful for user: ${data.username}`, response.data.data)
        }
    }

    // To add budget, dashboard and profile services.

    // Profile Events

    const updateUserPorfile = async (data = {}) => {
        console.log(`Updating ${userProfile.username} profile ...`);
        const response = await axios.post(`${BASE_URL}/user/updateprofile`, { ...data }, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        }).catch(err => {
            console.error(`There was an error updating profile for user ${userProfile.username}: `, err)
            return {
            }
        })
        console.log('User profile retrieved: ', response)
        if (response.data) {
            if (response.data.username) {
                setUserProfile(response.data)
            }
        }
    }


    return (
        <GlobalContext.Provider value={{
            auth,
            setAuth,
            checkAuth,
            incomes,
            expenses,
            error,
            dashboard,
            setError,
            dashBoardTable,
            userProfile,
            updateUserPorfile,
            signIn,
            signUp
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}