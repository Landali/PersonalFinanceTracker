import React, { useContext, useState } from "react"
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

// NOTE: Add url to react env
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [auth, setAuth] = useState('')
    const [budgets, setBudgets] = useState([])
    const [budgetsPages, setBudgetsPages] = useState(1)

    const [incomes, setIncomes] = useState([])
    const [incomesPages, setIncomesPages] = useState(1)


    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)
    const [dashboard, setDashboard] = useState(null)
    const [userProfile, setUserProfile] = useState({
        username: '', firstname: '', lastname: '', password: '', email: ''
    })



    const logOut = () => {
        toast.error(`Sign out Sucessful. We hope to see you soon.`)
        setAuth('')
        setBudgets([])
        setBudgetsPages(1)
        setIncomes([])
        setIncomesPages(1)
        setUserProfile({ })
        localStorage.removeItem('token')
   
    }

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
            const decodedToken = jwt_decode(token)

            const { username, firstname, lastname, email } = decodedToken
            console.log('decoded token', decodedToken.username)
            setUserProfile({
                username: decodedToken.username,
                firstname: decodedToken.firstname,
                lastname: decodedToken.lastname,
                email: decodedToken.email, password: ''
            })
        }
    }

    // User Login & Registration
    const signIn = async (data = {}) => {
        const response = await axios.post(`${BASE_URL}/auth/signin`, { user: data.user, password: data.password }).catch(err => {
            console.error(`Error to Sign In for user: ${data.user}`, err)
            setAuth(err.response.data.data);
        })
        console.log('Sign in response', response)
        if (response) {
            const decodedToken = jwt_decode(response.data.data)
            console.log(`Sign in successful for user: ${data.user}`, decodedToken)
            
            setAuth(response.data.data)
            localStorage.setItem('token', response.data.data)
            const { username, firstname, lastname, email } = decodedToken
            console.log('decoded token', decodedToken.username)
            toast.success(`Welcome ${username}`)
            setUserProfile({
                username: decodedToken.username,
                firstname: decodedToken.firstname,
                lastname: decodedToken.lastname,
                email: decodedToken.email, 
                password: ''
            })
        }
    }
    const signUp = async (data = {}) => {
        const response = await axios.post(`${BASE_URL}/auth/signup`, { ...data }).catch(err => {
            console.error(`Sign in successful for user: ${data.username}`, err)
        })
        if (response) {
            toast.success(`Personal Fin Tracker user created: ${data.username}`)
            console.log(`Sign in successful for user: ${data.username}`, response.data.data)
        }
    }

    // To add budget, dashboard and profile services.

    // Profile Events

    const updateUserPorfile = async (data = {}) => {
        console.log(`Updating ${userProfile.username} profile ...`);
        const response = await axios.put(`${BASE_URL}/user/updateprofile`, { ...data }, {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        }).catch(err => {
            console.error(`There was an error updating profile for user ${userProfile.username}: `, err)
        })
       
        if (response) {
            console.log('User profile retrieved: ', response)
            if (response.data) {
                toast.success(`Your profile was updating sucessfully  ${userProfile.username}`)
                setUserProfile(response.data)
            }
        }
    }

    // Handler Budget Events

    const getUserBudgets = async (user, pages, sort) => {
        const token = localStorage.getItem('token');
        console.log(`Retrieving budgets for ${userProfile.username} ...`);
        const response = await axios.get(`${BASE_URL}/budget/getBudgets`, {
            params: { user: userProfile.username || user, pages, sort }, headers: {
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
                toast.success(`Budgets created`)
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
                toast.success(`Budget Updated`)
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
                toast.success(`Budgets Deleted`)
            }
        }
    }

    // Incomes Handlers

    const getUserIncomes = async (user, budget, pages, sort) => {
        const token = localStorage.getItem('token');
        console.log(`Retrieving Incomes for ${userProfile.username || user} ...`);
        const response = await axios.get(`${BASE_URL}/income/getIncomes`, {
            params: { user: userProfile.username || user, budget, pages, sort }, headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }

        ).catch(err => {
            console.error(`There was an error retrieving ${userProfile.username} incomes: `, err)
            setIncomes([])
        })

        if (response) {
            console.log('Budgets retrieved: ', response.data)
            const nPages = response.data.pages < 4 ? 1 : Math.ceil(response.data.pages / 4)
            setIncomes(response.data.data)
            setIncomesPages(nPages)
        }

    }

    const createUserIncome = async (name, total, description, date, budget) => {
        console.log(`Creating budget for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.post(`${BASE_URL}/income/createIncomes`, { date, budget, name, total, description, user: userProfile.username }, {
            headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error creating ${userProfile.username} budget: `, err)

        })

        if (response) {
            console.log('Budgets retrieved: ', response.data)
            if (response.data.code === 200) {
                getUserIncomes(userProfile.username, budget)
                toast.success(`Income created`)
            }
        }
    }

    const updateCurrentIncome = async (name, total, description, date, budget, incomeId) => {
        console.log(`Updating current budget for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.put(`${BASE_URL}/income/updateIncomes`, { total, name, description, user: userProfile.username, budget, incomeId, date }, {
            headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error updating ${userProfile.username} Income: `, err)
        })

        if (response) {
            console.log('Income updated retrieved: ', response.data)
            if (response.data.code === 200) {
                getUserIncomes(userProfile.username, budget)
                toast.success(`Income updated`)
            }

        }
    }

    const deleteUserIncome = async (income, budget, total) => {
        console.log(`Deleting current Income for ${userProfile.username} ...`);
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${BASE_URL}/income/deleteIncomes`, {
            data: { income, budget, user: userProfile.username, total }, headers: {
                Authorization: `Bearer ${auth || token}`
            }
        }).catch(err => {
            console.error(`There was an error deleting ${userProfile.username} Income: `, err)
        })
        if (response) {
            console.log('Income deleted!!', response.data)
            if (response.data.code === 200) {
                getUserIncomes(userProfile.user, budget)
                toast.success(`Income delete`)
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
            deleteUserBudget,
            incomesPages,
            setIncomesPages,
            getUserIncomes,
            createUserIncome,
            updateCurrentIncome,
            deleteUserIncome,
            logOut
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}