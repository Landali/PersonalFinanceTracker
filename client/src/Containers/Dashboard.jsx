
import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context/globalContext';


const Dashboard = () => {

  const { dashboard, dashBoardTable, auth } = useGlobalContext()
  useEffect(() => {
    dashBoardTable()
  }, [])
  // if (!auth) {
  //     return <h1>Denied</h1>
  // }
  console.log('Dashboard data retrieved: ', dashboard)
  return (
    <div className='col-md-10 mx-auto center-block' >
      <div id='dashboard-table-container' className="p-3 bg-white shadow-sm  d-flex justify-content-around align-items-center rounded">

      </div>

    </div>

  )
}

export default Dashboard