import { useFormik } from "formik";
import SelectItems from "../../Components/SelectItems/SelectItems";
import { Link } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";





const Registration = () => {

    const { registerUser, updateProfile, loginUser } = useAuth()

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        } else if (values.name.length > 20) {
            errors.name = 'Name must be 15 characters or less';
        }
        if (!values.photo) {
            errors.photo = 'Photo is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password has to be at least 6 characters long';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            photo: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {

            console.log(JSON.stringify(values, null, 2));
            const email = values.email
            const password = values.password
            const photo = values.photo
            const userName = values.name

            // signing up
            registerUser(email, password)
                .then(response => {
                    console.log(response?.user)
                    
                    // updating profile
                    updateProfile(userName, photo)

                    // signing in
                    loginUser(email, password)
                        .then((userCredential) => {
                            console.log(userCredential.user)
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.error(errorMessage, errorCode)
                        });
                    toast.success('You have successfully registered')
                })
                .catch(error => {
                    console.error(error.message)
                    toast.error(error.message)
                })
        },
    })

    const userCategories = [
        { value: 'Student', label: 'Student' },
        { value: 'Tutor', label: 'Tutor' },
        { value: 'Administrator', label: 'Administrator' },
    ]

    return (
        <div className="py-12 min-h-screen">
            <Toaster></Toaster>
            <h1 className="mb-8 text-3xl text-[#A0D6B4] text-center">Register Here</h1>
            <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto space-y-12">
                <div className="flex items-center gap-2 w-full">
                    <div className="input-container ">
                        <label className="label">Your Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {/* <label className="label">Your Name</label> */}
                        {formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
                    </div>
                    <div className="input-container">
                        <label className="label">Photo</label>
                        <input
                            id="photo"
                            name="photo"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.photo}
                        />
                        {/* <label className="label">Photo</label> */}
                        {formik.errors.photo ? <div className="text-red-500">{formik.errors.photo}</div> : null}
                    </div>
                </div>
                <div className="flex items-center gap-2 ">
                    <div className="input-container">
                        <label className="label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {/* <label className="label">Email</label> */}
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
                        {/* <label className="label">Password</label> */}
                        {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                    </div>
                </div>
                <div>
                    <SelectItems options={userCategories} title={'Register as ...'}></SelectItems>
                </div>
                <button className="btn " type="submit">submit</button>
            </form>
            <h4 className="text-center w-full">
                Already have an account ?
                <Link to='/login' className="text-center w-full ml-3">Sign in</Link>
            </h4>
        </div>
    );
};

export default Registration;