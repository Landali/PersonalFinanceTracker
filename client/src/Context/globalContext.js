import React, { useContext, useState } from "react"
import axios from 'axios'

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
        const response = await axios.get(`${BASE_URL}/auth/checkAuth`)
        console.log(`Session is valid for user: ${userProfile.user}`, response.data)
        setAuth(response.data)
    }

    // User Login & Registration
    const signIn = async (data = {}) => {
        const response = await axios.get(`${BASE_URL}/user/signin`, { username: data.user, password: data.password })
        console.log(`Sign in successful for user: ${data.user}`, response.data)
        setAuth(response.data)
    }
    const signUp = async (data = {}) => {
        const response = await axios.post(`${BASE_URL}/user/signup`, { username: data.username, email: data.email, password: data.password })
        console.log(`Sign in successful for user: ${data.user}`, response.data)
    }

    // To add budget, dashboard and profile services.

    // Profile Events

    const updateUserPorfile = async (data = {}) => {
        console.log(`Updating ${userProfile.username} profile ...`);
        const response = await axios.post(`${BASE_URL}/user/updateprofile`, { ...data }).catch(err => {
            console.error(`There was an error updating profile for user ${userProfile.username}: `, err)
            return {
            }
        })
        console.log('User profile retrieved: ', response)
        if (response.data.username) {
            setUserProfile(response.data)
        }
    }


    return (
        <GlobalContext.Provider value={{
            auth,
            incomes,
            expenses,
            error,
            dashboard,
            setError,
            dashBoardTable,
            userProfile,
            updateUserPorfile
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}