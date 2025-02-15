import { Button, Form, Input, Select } from 'antd';
import useAuth from '../../CustomHooks/useAuth';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const roleOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Administrator', label: 'Administrator' },
]

const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
]

const LoginModal = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const navigate = useNavigate()
    const userEmail = user?.email
    const [loading, setLoading] = useState(false)




    const handleUpdateUser = async (userData) => {
        try {
            const response = await axiosPublic.put(`/users/${userEmail}`, userData);
            console.log(response.data)
            navigate(`/`)
        } catch (error) {
            console.error("Registration Error:", error);
        } finally {
            setLoading(false)
        }


    }

    const onFinish = (values) => {
        setLoading(true)
        const { gender, role, phone } = values
        console.log('finished', phone, gender, role);
        const userInfo = { gender, role, phone };
        handleUpdateUser(userInfo)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('failed to finish', errorInfo,);
        setLoading(false)
    }

    return (
        <div className=" w-[95%] md:w-[60%] lg:w-[40%] p-3 md:p-6 lg:p-10 mx-auto bg-accent dark:bg-dark-accent rounded-lg shadow-lg space-y-3">

            <h1 className="text-text dark:text-dark-text text-lg font-semibold text-center">You are missing out</h1>
            <p className="text-sm text-center text-text dark:text-dark-text/50">Fill up the form</p>


            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="w-full px-5 md:px-12 lg:px-20 pt-5 pb-10 bg-accent dark:bg-dark-accent rounded-lg text-text dark:text-dark-text [&>*]:w-[]"
            >

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
                    <Select options={sexOptions} />
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
                    <Select options={roleOptions} />
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

                <Form.Item className="">
                    <Button
                        loading={loading}
                        disabled={loading}
                        type="primary"
                        htmlType="submit"
                        className="w-full mx-auto">
                        {loading ? 'Updating' : 'Update'}
                    </Button>
                </Form.Item>

            </Form>





        </div>
    );
};


export default LoginModal;