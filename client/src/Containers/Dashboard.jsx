
import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context/globalContext';


const Dashboard = () => {

    const {dashboard, dashBoardTable, auth } = useGlobalContext()
    useEffect(() => {
        dashBoardTable()
    }, [])
    // if (!auth) {
    //     return <h1>Denied</h1>
    // }
    console.log('Dashboard data retrieved: ', dashboard)
    return (
        <div>
                <div className="row g-3 my-2">
                  <div className="col-md-3">
                  
                    <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    Dashboard
                    </div>
                  </div>
                </div>
            
        </div>
    )
}

export default Dashboard