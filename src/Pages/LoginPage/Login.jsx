import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
    const validate = (values) => {
        const errors = {};
        if(!values.email){
            errors.email = 'Email is required'
        }
        if(!values.password){
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
        onSubmit: (values)=> {
            console.log(JSON.stringify(values, null, 2));
        }
    })
    return (
        <div className="min-h-screen py-24">
            <h1 className="text-center text-3xl">Login Here</h1>
            <form onSubmit={formik.handleSubmit} className="w-1/4 mx-auto flex flex-col gap-14">
                <div className="input-container">
                    <label className="label">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"                            
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                </div>
                
                <div className="input-container">
                    <label className="label">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="text"                        
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}

                </div>
                <button type="submit" className="btn btn-block">login</button>
            </form>
            <h5 className="text-center my-6">
                New to ClassMate?  
                <Link to='/register' className="ml-3">Sign Up</Link>
            </h5>
        </div>
    );
};

export default Login;