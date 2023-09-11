import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Containers/Dashboard";
import Login from "./Containers/Login";
import Error from "./Containers/Error";
import { useGlobalContext } from './Context/globalContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Sidebar from "./Components/Sidebar";
import Nav from './Components/Nav';
import { useState, useEffect } from "react";
import Profile from "./Containers/Profile";
import Registration from "./Containers/Registration";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    //    loader: dashboardLoader
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/signin',
    element: <Registration />,
  },
  {
    path: '/about',
    element: <h1>About</h1>,
  }
]);



function App() {

  const { auth, setAuth, checkAuth } = useGlobalContext()
  console.log('authState', auth)
  useEffect(() => {
    const token = auth || localStorage.getItem('token') || '';
    checkAuth()
    setAuth(token)
  }, [auth]);
  
  const [toggle, setToggle] = useState(true)
  const Toggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <Sidebar toggle={toggle} />
        <div className="main">
          <Nav Toggle={Toggle}></Nav>
          <div id='components'>
            <RouterProvider router={router} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
