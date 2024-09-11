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
import UpdateSession from './Pages/AdminPages/AllSessions/UpdateSession';
import SessionDetails from './Pages/SessionDetailsPage/SessionDetails';
import UploadMaterial from './Pages/TutorPages/UploadMaterialPage/UploadMaterial';
import UploadMaterialMain from './Pages/TutorPages/UploadMaterialPage/UploadMaterialMain';
import MyMaterials from './Pages/TutorPages/MyMaterialsPage/MyMaterials';
import StudentHome from './Pages/StudentPages/StudentHomePage/StudentHome';
import LoginValidator from './Components/LoginValidator/LoginValidator';
import Payment from './Pages/StudentPages/PaymentPage/Payment';
import BookedSessions from './Pages/StudentPages/BookedSessionsPage/BookedSessions';
import CreateNote from './Pages/StudentPages/CreateNotePage/CreateNote';
import ManageNote from './Pages/StudentPages/ManageNotePage/ManageNote';
import AllMaterials from './Pages/AdminPages/AllMaterialsPage/AllMaterials';
import StundentAllMaterials from './Pages/StudentPages/StudentAllMaterialsPage/StundentAllMaterials';
import CourseMaterial from './Pages/StudentPages/StudentAllMaterialsPage/CourseMaterial';
import AllSessionsPage from './Pages/AllSessionsPage/AllSessionsPage';

// Create a client
const queryClient = new QueryClient()

const baseURL = import.meta.env.VITE_BASE_URL
console.log(baseURL)

const router = createBrowserRouter(

  [
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
          path: "/all-sessions",
          element: <AllSessionsPage/>
        },
        {
          path: "/sessionDetails/:id",
          loader: ({ params }) => fetch(`${baseURL}/sessions/${params.id}`),
          element: <LoginValidator> <SessionDetails></SessionDetails> </LoginValidator>
        },
        {
          path: "/payment/:id",
          loader: ({ params }) => fetch(`${baseURL}/sessions/${params.id}`),
          element: <Payment></Payment>
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
              path: "/dashboard/admin/students",
              element: <AllUsers></AllUsers>
            },
            {
              path: "/dashboard/admin/allSessions",
              element: <AllSessions></AllSessions>
            },
            {
              path: "/dashboard/admin/allSessions/update/:id",
              element: <UpdateSession></UpdateSession>
            },
            {
              path: "/dashboard/admin/allMaterials",
              element: <AllMaterials></AllMaterials>
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
              path: "/dashboard/tutor/uploadMaterials/",
              element: <UploadMaterialMain></UploadMaterialMain>
            },
            {
              path: "/dashboard/tutor/uploadMaterials/:id",
              element: <UploadMaterial></UploadMaterial>
            },
            {
              path: "/dashboard/tutor/myMaterials",
              element: <MyMaterials></MyMaterials>
            },
            {
              path: "/dashboard/tutor/allNotes",
              element: <TutorHome></TutorHome>
            },


            // student routes
            {
              path: "/dashboard/student",
              element: <StudentHome></StudentHome>
            },
            {
              path: "/dashboard/student/bookedSessions",
              element: <BookedSessions></BookedSessions>
            },
            {
              path: "/dashboard/student/createNote",
              element: <CreateNote></CreateNote>
            },
            {
              path: "/dashboard/student/manageNotes",
              element: <ManageNote></ManageNote>
            },
            {
              path: "/dashboard/student/allMaterials",
              element: <StundentAllMaterials></StundentAllMaterials>
            },
            {
              path: "/dashboard/student/allMaterials/:id",
              element: <CourseMaterial></CourseMaterial>
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
