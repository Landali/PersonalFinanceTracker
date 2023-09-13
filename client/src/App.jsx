import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Containers/Dashboard";
import Login from "./Containers/Login";
import Error from "./Containers/Error";
import { useGlobalContext } from './Context/globalContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Components/Sidebar";
import Nav from './Components/Nav';
import { useState, useEffect } from "react";
import Profile from "./Containers/Profile";
import Registration from "./Containers/Registration";
import Budget from "./Containers/Budget";
import Incomes from "./Containers/Incomes";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: '/signin',
    element: <Registration />,
    errorElement: <Error />,
  },
  {
    path: '/registration',
    element: <Registration/>,
    errorElement: <Error />,
  },
  {
    path: '/budgets',
    element: <Budget/>,
    errorElement: <Error />,
  },
  {
    path: '/incomes/:id',
    element: <Incomes/>,
    errorElement: <Error />,
  }
]);

function App() {

  const { auth, setAuth, checkAuth, userProfile,updateUserPorfile ,logOut } = useGlobalContext()
  console.log('authState', userProfile)
  useEffect(() => {
    const token = auth || localStorage.getItem('token') || '';
    checkAuth()
    updateUserPorfile(userProfile)
    setAuth(token)
  }, [auth]);

  const [toggle, setToggle] = useState(false)
  const Toggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className="App">
      <div className="wrapper">
        {!auth ? <div></div> : <Sidebar signout={logOut} toggle={toggle} user={userProfile.username} name={`${userProfile.firstname} ${userProfile.lastname}`} />}
        <div className="main">
        {!auth ? <div></div> : <Nav signout={logOut} Toggle={Toggle}></Nav>}
          
          <div id='components'>
            <RouterProvider router={router} />
            <ToastContainer />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
