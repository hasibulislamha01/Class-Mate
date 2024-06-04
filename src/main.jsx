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
import TutorHome from './Pages/TutorPages/TutorHomePage/TutorHome';
import CreateSession from './Pages/TutorPages/CreateSessionPage/CreateSession';
import MySession from './Pages/TutorPages/MySessionPages/MySession';
import AllSessions from './Pages/AdminPages/AllSessions/AllSessions';

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
          {
            path: "/dashboard/admin/allSessions",
            element: <AllSessions></AllSessions>
          },
          
          
          // tutor routes
          {
            path: "/dashboard/tutor",
            element: <TutorHome></TutorHome>
          },
          {
            path: "/dashboard/tutor/createSessions",
            element: <CreateSession></CreateSession>
          },
          {
            path: "/dashboard/tutor/mySessions",
            element: <MySession></MySession>
          },
          {
            path: "/dashboard/tutor/uploadMaterials",
            element: <TutorHome></TutorHome>
          },
          {
            path: "/dashboard/tutor/myMaterials",
            element: <TutorHome></TutorHome>
          },
          {
            path: "/dashboard/tutor/allNotes",
            element: <TutorHome></TutorHome>
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
