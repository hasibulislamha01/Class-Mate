import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { MdVpnKey } from "react-icons/md";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import useUserRole from "../../CustomHooks/useUserRole";



const Login = () => {

    const location = useLocation()
    const userRole = useUserRole()
    const axiosPublic = useAxiosPublic()
    const { loginUser, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    console.log(location.state)

    useEffect(() => {
        userRole === 'unknown' ? setShowModal(true) : setShowModal(false)
    }, [userRole])

    const createUser = (userInfo) => {
        axiosPublic.post(`/users`, userInfo)
            .then(response => {
                console.log(response);
                toast.success(response?.data?.message || 'WTF USER')
                setShowModal(true)

                // if (location?.state) {
                //     navigate(location.state)
                // } else {
                //     navigate('/')
                // }
            })
            .catch(error => {
                console.error(error?.message)
                toast.error('Failed to save data')
            })
    }


    const handleLogin = (email, password) => {
        loginUser(email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                toast.success('Login Successful')
                if (location?.state) {
                    navigate(location?.state)
                }
                else {
                    navigate('/')
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode)
                toast.error(errorMessage)
            });
    }

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required'
        }
        if (!values.password) {
            errors.password = "Password is required"
        }
        return errors
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));
            const email = values.email
            const password = values.password
            console.log(email, password);

            handleLogin(email, password)

        }
    })

    const googleProvider = new GoogleAuthProvider()
    const handleGoogleLogin = async () => {


        loginWithGoogle(googleProvider)
            .then(result => {

                const user = result?.user
                // toast.success('Login Successful')
                const userEmail = user.email
                const userName = user.displayName
                const userPhoto = user.photoURL
                const role = 'unknown'
                const gender = 'unknown'
                const phone = 'unknown'
                const userInfo = { userEmail, userName, userPhoto, role, gender, phone }
                console.log(userInfo);
                // creating user...
                userInfo && createUser(userInfo)

            }).catch(error => {
                console.error(error.message)
                toast.error(error.message)
            })
    }


    return (
        <div className="min-h-screen py-24 space-y-6">
            <Toaster></Toaster>
            <div>
                {
                    location?.state ?
                        <p className="text-warning text-center text-xl"> You have to login first to proceed </p>
                        : <></>
                }
            </div>

            {
                showModal && <LoginModal email />
            }
            {/* content container */}
            <div className={`w-[95%] md:w-[80%] lg:w-[70%] mx-auto py-5 md:py-8 lg:py-10 px-0 md:px-2 lg:px-8 flex flex-col-reverse md:flex-row items-center rounded-lg shadow-lg border-none ${showModal ? 'bg-accent dark:bg-dark-accent/30' : 'bg-accent dark:bg-dark-accent'}`}>

                {/* svg or image container */}
                <div className="text-3xl font-bold flex-1 bg-primary/50 h-full w-full border border-red-300">
                    <div className="h-full">Login SVG</div>
                </div>

                {/* form container */}
                <div className="flex-1">
                    <h1 className="text-center text-xl font-bold mb-5">Login Here</h1>

                    <form onSubmit={formik.handleSubmit} className="max-w-72 mx-auto flex flex-col justify-center gap-6 px-3">

                        <div>
                            <div className="flex items-center border border-primary">
                                <label htmlFor="email"><FaRegEnvelope /></label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className="input-box w-full bg-background"
                                />
                            </div>
                            {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                        </div>

                        <div>
                            <div className="border border-primary px-2 flex items-center rounded-lg">
                                <label htmlFor="password"><MdVpnKey /></label>
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className="px-3 py-2 w-full outline-none"
                                />


                            </div>
                            {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                        </div>


                        <button type="submit" className="btn w-1/2 mx-auto bg-sky-200">Login</button>
                    </form>
                    <h5 className="text-center my-6 text-text dark:text-dark-text">
                        New to ClassMate?
                        <Link to='/register' className="ml-3 text-primary font-bold">Sign Up</Link>
                    </h5>

                    <div
                        onClick={handleGoogleLogin}
                        className="w-full max-w-56 mx-auto flex items-center justify-center gap-4 bg-primary/10 rounded-lg py-1 text-md font-semibold border-2 border-primary/50 cursor-pointer hover:border-primary/90  hover:scale-[101%] active:scale-[98%] transition-all duration-250">
                        <p className="text-text dark:text-dark-text">Proceed with</p>
                        <FcGoogle
                            size={30}

                            className=""
                        />

                    </div>
                </div>

            </div>


            {/* <input type="text" className=' 
            input-box ml-60' placeholder='type here' /> */}

        </div>

    );
};

export default Login;