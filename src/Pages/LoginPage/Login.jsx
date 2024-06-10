import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

    const location = useLocation()
    const { loginUser } = useAuth()
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
                    if(location?.state){
                        navigate(location?.state)
                    }
                    else{
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
    return (
        <div className="min-h-screen py-24 space-y-6 container mx-auto">
            <Toaster></Toaster>
            <div>
                {
                    location?.state ? 
                    <p className="text-warning text-center text-xl"> You have to login first to proceed </p>
                    : <></>
                }
            </div>
            <h1 className="text-center text-3xl">Login Here</h1>
            <form onSubmit={formik.handleSubmit} className="lg:w-1/2 mx-auto flex flex-col gap-14 ">
                <div className="input-container mx-auto">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <label className="label">Email</label>
                    {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                </div>

                <div className="input-container mx-auto">
                    <input
                        id="password"
                        name="password"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <label className="label">Password</label>
                    {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}

                </div>
                <button type="submit" className="btn w-1/2 mx-auto bg-sky-200">login</button>
            </form>
            <h5 className="text-center my-6">
                New to ClassMate?
                <Link to='/register' className="ml-3">Sign Up</Link>
            </h5>
        </div>
    );
};

export default Login;