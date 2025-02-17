import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const CreateNoteForm = ({studentEmail}) => {

    const axiosSecure = useAxiosSecure()
    const [form] = Form.useForm();
    const handleSaveNote = (data) => {
            axiosSecure.post(`/notes?sessionId=${data?.sessionId}`, data)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Created",
                            text: "You created a note!",
                            icon: "success"
                        });
                    }
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    
        const onFinish = (values) => {
            // console.log('Success:', values);
            const noteDetails = {...values, studentEmail}
            handleSaveNote(noteDetails)
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


    return (
        <div
            className="bg-accent px-10 py-8 rounded-md shadow-lg hover:shadow-primary/30 w-[90%] md:w-[80%] lg:w-[45%] mx-auto space-y-4"
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
                    <Button className="mt-2" type="primary" block htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

CreateNoteForm.propTypes = {
    studentEmail: PropTypes.string
}
export default CreateNoteForm
