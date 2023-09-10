
import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context/globalContext';


const Dashboard = () => {

    const {dashboard, dashBoardTable, auth } = useGlobalContext()
    useEffect(() => {
        dashBoardTable()
    }, [auth])
    if (!auth) {
        return <h1>Denied</h1>
        
    }
    console.log('Dashboard data retrieved: ', dashboard)
    return (
        <div>

            Dashboard
        </div>
    )
}

export default Dashboard