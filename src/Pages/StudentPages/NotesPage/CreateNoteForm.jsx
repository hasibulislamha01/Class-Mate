import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import { useState } from "react";
import Swal from "sweetalert2";

const CreateNoteForm = ({ studentEmail, sessionId }) => {

    const axiosSecure = useAxiosSecure()
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const handleSaveNote = (data) => {
        setLoading(true)
        axiosSecure.post(`/notes?sessionId=${data?.sessionId}`, data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    setLoading(false)
                    Swal.fire({
                        title: "Created",
                        text: "You created a note!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error.message)
                setLoading(false)
                Swal.fire({
                    title: "Failed",
                    text: "Failed to save the note",
                    icon: "error"
                });
            })
    }

    const onFinish = (values) => {
        // console.log('Success:', values);
        let noteDetails = {}
        if (!sessionId) noteDetails = { ...values, studentEmail }
        if (sessionId) noteDetails = { ...values, sessionId, studentEmail }
        console.log(noteDetails)
        handleSaveNote(noteDetails)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div
            className="space-y-5"
        >
            <h4 className="font-semibold text-primary text-lg">Create Note</h4>
            <Form
                className="space-y-2"
                layout='vertical'
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    name='noteTitle'
                    label="Enter Note title"
                    rules={[
                        {
                            required: true,
                            message: 'Please Enter title',
                        },
                    ]}
                >
                    <Input placeholder="Note title" />
                </Form.Item>

                {
                    !sessionId &&
                    <Form.Item
                        name='sessionId'
                        label="Enter session id for the note"
                        rules={[
                            {
                                required: true,
                                message: 'Please Enter session id',
                            },
                        ]}
                    >
                        <Input placeholder="Session id" />
                    </Form.Item>
                }

                <Form.Item
                    name='noteDescription'
                    rules={[
                        {
                            required: true,
                            message: 'Please write note',
                        },
                    ]}
                    label="Write your note here"
                >
                    <TextArea placeholder="Write here" />
                </Form.Item>

                <Form.Item>
                    <Button className="mt-2" type="primary" block htmlType="submit" loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

CreateNoteForm.propTypes = {
    studentEmail: PropTypes.string,
    sessionId: PropTypes.string
}
export default CreateNoteForm
