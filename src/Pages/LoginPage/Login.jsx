
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import useUserRole from "../../CustomHooks/useUserRole";
import { Form, Button, Input, Spin } from "antd";



const Login = () => {

    const [loginLoading, setLoginLoading] = useState(false)
    const location = useLocation()
    const userRole = useUserRole()
    const axiosPublic = useAxiosPublic()
    const { loginUser, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    // console.log(location.state)

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
                setLoginLoading(false)
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
                setLoginLoading(false)
                toast.error(errorMessage)
            });
    }

    // const validate = (values) => {
    //     const errors = {};
    //     if (!values.email) {
    //         errors.email = 'Email is required'
    //     }
    //     if (!values.password) {
    //         errors.password = "Password is required"
    //     }
    //     return errors
    // }
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //     },
    //     validate,
    //     onSubmit: (values) => {
    //         console.log(JSON.stringify(values, null, 2));
    //         const email = values.email
    //         const password = values.password
    //         console.log(email, password);

    //         handleLogin(email, password)

    //     }
    // })

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

    const onFinish = (values) => {
        setLoginLoading(true)
        console.log('Form values:', values);
        handleLogin(values?.email, values?.password)
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Validation failed:', errorInfo);
        toast.error('Failed to login. Try again.')
    };

    return (
        <div className="min-h-screen py-24 space-y-6 ">
            <Toaster></Toaster>
            <div>
                {
                    location?.state ?
                        <p className="text-warning text-center text-sm md:text-lg"> You have to login first to proceed </p>
                        : <></>
                }
            </div>

            {
                showModal && <LoginModal email />
            }
            {/* content container */}
            <div className={`w-[85%] md:w-[80%] lg:w-[70%] mx-auto py-20 md:py-8 lg:py-10 px-0 md:px-2 lg:px-8 flex flex-col-reverse md:flex-row items-center rounded-lg shadow-lg border-none ${showModal ? 'bg-accent dark:bg-dark-accent/30' : 'bg-accent dark:bg-dark-accent'}`}>

                {/* svg or image container */}
                <div className="hidden md:block flex-1 h-full w-full">
                    <div className="h-full">
                        <img src="/privacy.svg" alt="" className="h-3/5 w-3/5 mx-auto" />
                    </div>
                </div>

                {/* form container */}
                <div className="flex-1 flex flex-col items-center">
                    <h1 className="text-center text-lg lg:text-xl font-semibold mb-5">Login Here</h1>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="w-60 md:w-60 xl:w-72"
                    >

                        {/* Input for Email */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Input for password */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter a strong password' },
                                { min: 6, message: 'password must be at least 6 characters' },
                            ]}
                            className=""
                        >
                            <Input className="" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item className="">
                            <Button loading={loginLoading} type="primary" htmlType="submit" className="w-full mx-auto">
                                {loginLoading ?
                                    <div className="flex items-center gap-5">
                                        <p>Logging in</p>
                                        <Spin size="small" className="custom-spin" />
                                    </div>
                                    : "Login"
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                    <h5 className="font-medium text-sm text-center my-6 text-text dark:text-dark-text">
                        New to ClassMate?
                        <Link to='/register' className="ml-3 text-primary font-semibold ">Sign Up</Link>
                    </h5>

                    <div
                        onClick={handleGoogleLogin}
                        className="w-full max-w-56 mx-auto flex items-center justify-center gap-4 bg-background dark:bg-dark-background rounded-lg py-1 text-md font-semibold border-1 border-slate-500 cursor-pointer  active:scale-[98%] hover:scale-[102%] ease-in-out transition-all duration-500">
                        <p className="text-text dark:text-dark-text hover:tracking-wider transition-all duration-500 font-medium">Proceed with</p>
                        <FcGoogle
                            size={25}

                            className=""
                        />

                    </div>
                </div>

            </div>

        </div>

    );
};

export default Login;