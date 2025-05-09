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
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import TutorHome from './Pages/TutorPages/TutorHomePage/TutorHome';
import CreateSession from './Pages/TutorPages/CreateSessionPage/CreateSession';
import MySession from './Pages/TutorPages/MySessionPages/MySessions';
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
import ManageNote from './Pages/StudentPages/ManageNotePage/ManageNote';
import AllMaterials from './Pages/AdminPages/AllMaterialsPage/AllMaterials';
import StundentAllMaterials from './Pages/StudentPages/StudentAllMaterialsPage/StundentAllMaterials';
import CourseMaterial from './Pages/StudentPages/StudentAllMaterialsPage/CourseMaterial';
import AllSessionsPage from './Pages/AllSessionsPage/AllSessionsPage';
import AllStudents from './Pages/AdminPages/AllStudents/AllStudents';
import AllTeachers from './Pages/AdminPages/AllTeachers/AllTeachers';
import AllAdmins from './Pages/AdminPages/AllAdminsPage/AllAdmins';
import Unauthorized from './Components/Unauthorized/Unauthorized';
import Unknown from './Pages/UnknownRole/Unknown';
import MyNotes from './Pages/StudentPages/NotesPage/MyNotes';
import NotFound from './Pages/NotFound/NotFound';

// Create a client
const queryClient = new QueryClient()

const baseURL = import.meta.env.VITE_BASE_URL
// console.log(baseURL)

const router = createBrowserRouter(

  [
    {
      element: <Root />,
      errorElement: <NotFound/>
    },
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
          path: "/sessions",
          element: <AllSessionsPage />
        },
        {
          path: "/sessions/:id",
          loader: ({ params }) => fetch(`${baseURL}/sessions/${params.id}`),
          element: <LoginValidator> <SessionDetails></SessionDetails> </LoginValidator>
        },
        {
          path: "/payment/:id",
          loader: ({ params }) => fetch(`${baseURL}/sessions/${params.id}`),
          element: <Payment></Payment>
        },
        {
          path: "/unauthorized",
          element: <Unauthorized />
        },
        {
          path: "/dashboard",
          element: <DashLayout></DashLayout>,
          children: [

            // admin routes
            {
              path: "/dashboard/admin/profile",
              element: <AdminHome></AdminHome>
            },
            {
              path: "/dashboard/admin/students",
              element: <AllStudents />
            },
            {
              path: "/dashboard/admin/tutors",
              element: <AllTeachers />
            },
            {
              path: "/dashboard/admin/administrators",
              element: <AllAdmins />
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
              path: "/dashboard/tutor/profile",
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
              path: "/dashboard/student/profile",
              element: <StudentHome></StudentHome>
            },
            {
              path: "/dashboard/student/bookedSessions",
              element: <BookedSessions></BookedSessions>
            },
            {
              path: "/dashboard/student/notes",
              element: <MyNotes />
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
            {
              path: "/dashboard/user",
              element: <Unknown />
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
