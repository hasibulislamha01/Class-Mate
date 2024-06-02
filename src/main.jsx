import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';
import Registration from './Pages/RegistrationPage/Registration';
import Login from './Pages/LoginPage/Login';
import AuthProvider from './Components/Auth/AuthProvider';
import AdminHome from './Pages/AdminPages/AdminHome/AdminHome';
import DashLayout from './DashboardLayout/DashLayout';
import AllUsers from './Pages/AdminPages/AllUsers/AllUsers';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Registration></Registration>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/dashboard",
        element: <DashLayout></DashLayout>,
        children: [

          // admin routes
          {
            path: "/dashboard/admin",
            element: <AdminHome></AdminHome>
          },
          {
            path: "/dashboard/admin/allUsers",
            element: <AllUsers></AllUsers>
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
