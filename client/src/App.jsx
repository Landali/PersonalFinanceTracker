import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardLoader } from "./Containers/Dashboard";
import Login from "./Containers/Login";
import Error from "./Containers/Error";
import { useGlobalContext } from './Context/globalContext';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Sidebar from "./Components/Sidebar";
import Nav from './Components/Nav';
import { useState } from "react";
import Profile from "./Containers/Profile";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
    data: {}
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
    path: '/about',
    element: <h1>About</h1>,
  }
]);



function App() {
  const global = useGlobalContext()
  console.log('context', global)

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
