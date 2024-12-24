import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaRegEnvelope } from "react-icons/fa";
import { GoogleAuthProvider } from "firebase/auth";
import { MdVpnKey } from "react-icons/md";


const Login = () => {

    const location = useLocation()
    const { loginUser, loginWithGoogle, loginWithGithub } = useAuth()
    const navigate = useNavigate()
    console.log(location.state)

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

            // signing in
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
    })

    const googleProvider = new GoogleAuthProvider()
    const handleGoogleLogin = () => {
        loginWithGoogle(googleProvider)
            .then(result => {
                console.log(result.user)
                toast.success('Login Successful')
                if (location?.state) {
                    navigate(location.state)
                } else {
                    navigate('/')
                }
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

            {/* content container */}
            <div className="w-[95%] md:w-[80%] lg:w-[70%] mx-auto py-5 md:py-8 lg:py-10 px-0 md:px-2 lg:px-8 bg-accent dark:bg-dark-accent flex flex-col-reverse md:flex-row items-center border rounded-lg shadow-lg">

                {/* svg or image container */}
                <div className="text-3xl font-bold flex-1 bg-primary/50 h-full w-full border border-red-300">
                    <div className="h-full">Login SVG</div>
                </div>

                {/* form container */}
                <div className="flex-1">
                    <h1 className="text-center text-xl font-bold mb-5">Login Here</h1>

                    <form onSubmit={formik.handleSubmit} className="mx-auto flex flex-col gap-6 px-3">

                        <div>
                            <div className="flex items-center rounded-lg px-2 border border-primary bg-primary/10">
                                <label htmlFor="email"><FaRegEnvelope /></label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className="bg-none w-full px-3 py-2 outline-none"
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

                        
                        <button type="submit" className="btn w-1/2 mx-auto bg-sky-200">login</button>
                    </form>
                    <h5 className="text-center my-6">
                        New to ClassMate?
                        <Link to='/register' className="ml-3 text-primary font-bold">Sign Up</Link>
                    </h5>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <h1>Or Login With</h1>
                        <div className="text-xl flex gap-4">
                            <FcGoogle
                                size={30}
                                onClick={handleGoogleLogin}
                                className="cursor-pointer"
                            />
                            <FaGithub
                                size={30}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

            </div>



        </div>

    );
};

export default Login;