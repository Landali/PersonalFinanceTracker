import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardLoader } from "./Containers/Dashboard";
import Login from "./Containers/Login";
import Error from "./Containers/Error";
import { useGlobalContext } from './Context/globalContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error/>,
    data: {}
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
//    loader: dashboardLoader
  },
  {
    path: '/about',
    element: <h1>About</h1>,
  }
]);



function App() {
  const global = useGlobalContext()
  console.log('context',global)

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
