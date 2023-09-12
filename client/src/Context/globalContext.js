import React, { useContext, useState } from "react"
import axios from 'axios'
import jwt_decode from "jwt-decode";

// NOTE: Add url to react env
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [auth, setAuth] = useState('')
    const [budgets, setBudgets] = useState([])
    const [budgetsPages, setBudgetsPages] = useState(1)

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
        console.log('auth check ', token)
        const response = await axios.get(`${BASE_URL}/auth/checkAuth`, {
            headers: {
                Authorization: `Bearer ${token}`
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

    // Handler Budget Events

    const getUserBudgets = async (pages, sort) => {
        const token = localStorage.getItem('token');
        console.log(`Retrieving budgets for ${userProfile.username} ...`);
        const response = await axios.get(`${BASE_URL}/budget/getBudgets`, {
            params: { user: userProfile.username, pages, sort }, headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }

        ).catch(err => {
            console.error(`There was an error retrieving ${userProfile.username} budgets: `, err)
            setBudgets([])
        })

        if (response) {
            console.log('Budgets retrieved: ', response.data)
            const nPages = response.data.pages < 4 ? 1 : Math.ceil(response.data.pages / 4)
            setBudgets(response.data.data)
            setBudgetsPages(nPages)
        }

    }

    const createNewBudget = async (name, balance, description) => {
        console.log(`Creating budget for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/budget/createBudget`, { name, balance, description, user: userProfile.username }, {
            headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error creating ${userProfile.username} budget: `, err)

        })

        if (response) {
            console.log('Budgets retrieved: ', response.data)
            if (response.data.code === 200) {
                getUserBudgets()
            }

        }
    }

    const updateCurrentBudget = async (name, balance, description, id) => {
        console.log(`Updating current budget for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.put(`${BASE_URL}/budget/updateBudget`, { name, balance, description, user: userProfile.username, budgetId: id }, {
            headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error updating ${userProfile.username} budget: `, err)
        })

        if (response) {
            console.log('Budgets updated retrieved: ', response.data)
            if (response.data.code === 200) {
                getUserBudgets()
            }

        }
    }

    const deleteUserBudget = async (id) => {
        console.log(`Deleting current budget for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/budget/deleteBudget`, {
            data: { budgetId: id }, headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error deleting ${userProfile.username} budget: `, err)
        })
        if (response) {
            console.log('Budget deleted!!', response.data)
            if (response.data.code === 200) {
                getUserBudgets()
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
            signUp,
            budgets,
            setBudgets,
            getUserBudgets,
            budgetsPages,
            setBudgetsPages,
            createNewBudget,
            updateCurrentBudget,
            deleteUserBudget
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}