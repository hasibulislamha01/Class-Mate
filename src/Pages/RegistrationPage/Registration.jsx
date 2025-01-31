import { Link } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { IoCheckmarkDone } from "react-icons/io5";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { Form, Button, Spin, Input, Select, message } from "antd";
import UploadImage from "../../Components/SharedComponents/UploadImage/UploadImage";

const userCategories = [
    { value: 'Student', label: 'Student' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Administrator', label: 'Administrator' },
]

const sexCategories = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
]




const Registration = () => {
    const axiosPublic = useAxiosPublic()
    const { registerUser, updateUserProfile } = useAuth()
    // const navigate = useNavigate()

    const [registrationError, setRegistrationError] = useState(null)
    const [registrationDone, setRegDone] = useState(false)
    const [registerMessage, setRegisterMessage] = useState('')
    const [registerLoading, setRegisterLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState(null)
    const [showPassword, setShowPassword] = useState(false)


    const handleRegister = async (userInfo, password) => {
        try {
            setRegisterMessage("Authenticating user");
            setRegisterLoading(true);

            const response = await registerUser(userInfo.userEmail, password);
            if (!response?.user) throw new Error("User registration failed");

            setRegisterMessage("Updating user information");
            await updateUserProfile(userInfo.userName, userPhoto);

            setRegisterMessage("Saving data to database");
            await axiosPublic.post("/users", userInfo);

            setRegisterMessage("Done");
            setRegDone(true)
            message.success("Registration Successful");
        } catch (error) {
            setRegistrationError(error.message);
            console.error("Registration Error:", error);
        } finally {
            setRegisterLoading(false);
        }
    };


    // showing error message if registration was not successfull
    useEffect(() => {
        if (registrationError) {
            message.error(registrationError);
        }
    }, [registrationError]);

    // toggle Password type 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onFinish = (values) => {
        setRegisterLoading(true)
        const { firstName, lastName, userEmail, role, gender, phone, password } = values
        console.log('finished', values, userPhoto, gender, role);
        const userInfo = {
            userName: (firstName + " " + lastName).trim(),
            userEmail: userEmail.trim(),
            role,
            gender,
            phone: phone.trim(),
            userPhoto,
        };
        handleRegister(userInfo, password)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('failed to finish', errorInfo,);
        setRegisterLoading(false)
    }

    return (
        <div className="w-[90%] md:w-[95%] min-h-screen flex flex-col justify-center container mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center">

                <div className="my-20 w-auto">
                
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="w-full px-5 md:px-12 lg:px-20 pt-5 pb-10 bg-accent dark:bg-dark-accent rounded-lg text-text dark:text-dark-text [&>*]:w-[]"
                    >

                        <h1 className="capitalize text-center font-medium text-lg my-5 text-primary">Create a Classmate account</h1>

                        {/* Input for Names */}
                        <div className="flex gap-3">
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    { required: true, message: 'First name is required!' },
                                    { type: 'string', message: 'Names should include only letters!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    { required: true, message: 'Last name is required!' },
                                    { type: 'string', message: 'Names should include only letters!' },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>


                        {/* sex and role */}
                        <div className="flex justify-between gap-3">

                            {/* Input for sex */}
                            <Form.Item
                                label="Select Your Sex"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    },
                                ]}
                                className="flex-1"
                            >
                                <Select options={sexCategories} />
                            </Form.Item>

                            {/* Input for role */}
                            <Form.Item
                                label="Select Your Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input!',
                                    },
                                ]}
                                className="flex-1"
                            >
                                <Select options={userCategories} />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <UploadImage formLabel={'Upload your image.'} setImageUrl={setUserPhoto} />
                            <p className="text-red-500">{!userPhoto && 'Photo is required'}</p>
                        </Form.Item>

                        <Form.Item
                            label='Your Phone Number'
                            name='phone'
                            rules={[
                                { required: true, message: 'Phone number is required' },
                                { pattern: /^[0-9]+$/, message: "Only numeric values are allowed!" }
                            ]}
                        >
                            <Input type="tel" />
                        </Form.Item>


                        {/* Input for Email */}
                        <Form.Item
                            label="Enter Your Email Address"
                            name="userEmail"
                            rules={[
                                { required: true, message: 'First name is required!' },
                                { type: 'email', message: 'Enter a valid email!' },
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

                        >
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                className=""
                                // suffix={<EyeOutlined />}
                                addonAfter={showPassword ?
                                    <EyeOutlined onClick={toggleShowPassword} /> : <EyeInvisibleOutlined onClick={toggleShowPassword} />}
                            />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item className="">
                            <Button
                                loading={registerLoading}
                                disabled={registrationDone}
                                type="primary"
                                htmlType="submit"
                                className="w-full mx-auto">
                                {registerLoading ?
                                    <div className="flex items-center gap-5">
                                        <p>{registerMessage}</p>
                                        <Spin size="small" className="custom-spin" />
                                    </div>
                                    :
                                    registrationDone ?
                                        <div className="flex items-center gap-3">
                                            <p>Account Created</p>
                                            <IoCheckmarkDone/>
                                        </div> :
                                        "Create Account"
                                }
                            </Button>
                        </Form.Item>
                        {registrationError && <p className="text-red-500 text-center">{registrationError}</p>}
                    </Form>


                    <h4 className="text-center text-sm w-full mt-12">
                        Already have an account ?
                        <Link to='/login' className="w-full ml-3 text-primary font-semibold">Sign in</Link>
                    </h4>
                </div>
            </div>


        </div>
    );
};

export default Registration;