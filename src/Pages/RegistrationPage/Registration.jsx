import { Link } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import SelectItems from "../../Components/SelectItems/SelectItems";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import RegisterAnimation from "../../Components/AnimationComponents/RegisterAnimation";





const Registration = () => {
    const axiosPublic = useAxiosPublic()
    const { registerUser, updateUserProfile } = useAuth()

    const [registrationError, setRegistrationError] = useState(null)

    const userCategories = [
        { value: 'Student', label: 'Student' },
        { value: 'Tutor', label: 'Tutor' },
        { value: 'Administrator', label: 'Administrator' },
    ]



    const handleRegister = (event) => {
        event.preventDefault()
        setRegistrationError(null)
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const userName = firstName + " " + lastName;
        const role = form.role.value
        console.log(role)
        // console.log(userName)
        const userPhoto = form.photo.value;
        const userEmail = form.email.value;
        const password = form.password.value;



        // validation
        if (password.length < 6) {
            setRegistrationError('Password must have at least 6 characters')
            return;
        }
        else if (! /[A-Z]/.test(password)) {
            setRegistrationError("PassWord must have at least one uppercase letter")
            return;
        }
        else if (! /[a-z]/.test(password)) {
            setRegistrationError("PassWord must contain at least one lowercase letter")
            return;
        }

        else {

            const userInfo = {
                userName,
                userEmail,
                userPhoto,
                role,
            }

            // signing up
            registerUser(userEmail, password)
                .then(response => {
                    console.log(response?.user)
                    // toast.success('Registration Successfull')

                    // updating profile
                    updateUserProfile(userName, userPhoto)
                        .then(() => {
                            console.log('user has been updated', userName, userPhoto)
                        }).catch((error) => {
                            console.error(error.message)
                        });


                    toast.success('You have successfully registered')

                    // sending user data to database
                    axiosPublic.post('/users', userInfo)
                        .then(response => {
                            console.log(response.data)
                        })
                        .catch(error => {
                            const errorMessage = error.message
                            const errorCode = error
                            console.error(errorCode, errorMessage)
                        })
                })
                .catch(error => {
                    console.error(error.message)
                    // toast.error(error.message)
                })
        }
    }





    // showing error message if registration was not successfull
    if (registrationError) {
        toast.error(registrationError)
    }




    // toggle Password type 
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="py-12 min-h-screen container mx-auto">
            <Toaster></Toaster>
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="lg:w-1/2 mx-auto">
                    <RegisterAnimation></RegisterAnimation>
                </div>
                <div className="">
                    <h1 className="mb-8 text-3xl text-[#A0D6B4] text-center">Register Here</h1>

                    <form onSubmit={handleRegister} className="w-full px-8 lg:px-0 mx-auto space-y-12 ">

                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                            <div className="input-container mx-auto">
                                <input
                                    className=""
                                    type="text"
                                    name="firstName"
                                    required="required"
                                />
                                <label className="label">First Name</label>
                            </div>
                            <div className="input-container mx-auto">
                                <input
                                    className=""
                                    type="text"
                                    name="lastName"
                                    required="required"
                                />
                                <label className="label">Last Name</label>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                            <div className="mx-auto input-container w-1/2">
                                <input
                                    className="w-full"
                                    type="text"
                                    name="photo"
                                    required="required"
                                />
                                <label className="label">Your Photo</label>
                            </div>
                            <div className="flex-1">
                                <SelectItems
                                    name={'role'}
                                    options={userCategories}
                                    title={"Register as"}
                                ></SelectItems>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between gap-4">
                            <div className="w-full input-container mx-auto">
                                <input
                                    className=""
                                    type="email"
                                    name="email"
                                    required="required"
                                />
                                <label className="label">Email</label>
                            </div>
                            <div className="w-full relative input-container mx-auto">
                                <input
                                    className=""
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required="required"
                                />
                                <label className="label">Password</label>
                                <span
                                    onClick={toggleShowPassword}
                                    className="absolute right-5 bottom-[15px] text-base-300"
                                >
                                    {
                                        !showPassword ?
                                            <BsEye />
                                            : <BsEyeSlash />
                                    }
                                </span>
                            </div>
                        </div>


                        <button className="btn btn-block" type="submit">Regsiter</button>
                    </form>
                    <h4 className="text-center text-lg w-full mt-12">
                        Already have an account ?
                        <Link to='/login' className="w-full ml-3 text-red-400">Sign in</Link>
                    </h4>
                </div>
            </div>


        </div>
    );
};

export default Registration;