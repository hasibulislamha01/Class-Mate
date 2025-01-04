
import 'react-datepicker/dist/react-datepicker.css'
import ClassAnimation from "../../../Components/AnimationComponents/ClassAnimation";
import Datefield from "../../../Components/Datefield/Datefield";
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTodaysDate from '../../../CustomHooks/useTodaysDate';
import { useState } from 'react';
import { Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const CreateSession = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const tutorName = user?.displayName;
    const tutorEmail = user?.email
    const tutorPhoto = user?.photoURL
    const applyingDate = useTodaysDate()
    const [loading, setLoading] = useState(false)
    const [sessionTitle, setSessionTitle] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [registrationStarts, setRegStart] = useState('')
    const [registrationEnds, setRegEnd] = useState('')
    const [classStarts, setClassStart] = useState('')
    const [classEnds, setClassEnds] = useState('')
    const [sessionImage, setSessionImage] = useState('')
    const registrationFee = '0';
    const status = 'pending'



    const handleCreateSession = (event) => {
        event.preventDefault()
        setLoading(true)
        const form = event.target
        const sessionTitle = form.sessionTitle.value;
        const duration = form.duration.value;
        const description = form.description.value;
        const registrationStarts = form.regStarts.value;
        const registrationEnds = form.regEnds.value;
        const classStarts = form.classStarts.value;
        const classEnds = form.classEnds.value;
        const sessionImage = form.sessionImage.value;

        const sessionInfo = {
            sessionTitle,
            tutorName,
            tutorEmail,
            tutorPhoto,
            duration,
            description,
            registrationStarts,
            registrationEnds,
            classStarts,
            classEnds,
            registrationFee,
            status,
            applyingDate,
            sessionImage
        }
        console.log(sessionInfo)

        // send data to database
        axiosSecure.post('/sessions', sessionInfo)
            .then(response => {
                console.log(response.data)
                if (response.data.insertedId) {
                    setLoading(false)
                    Swal.fire({
                        title: "Success",
                        text: "You created the session!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    return (
        <div className="min-h-screen flex flex-col-reverse lg:flex-row justify-evenly items-center">
            <div>
                <ClassAnimation></ClassAnimation>
            </div>
            <div className="">
                <h1 className="text-center text-3xl my-6"> Create Session </h1>
                <form onSubmit={handleCreateSession} className="w-full flex flex-col items-center justify-center space-y-6">

                    <div className="w-full flex items-center gap-4">
                        <div className="">
                            <label className="">Session Title</label>
                            <Input
                                placeholder='Enter Session Title'
                                type='text'
                                name='title'
                                required='Enter Session Title'
                                onChange={(e) => { setSessionTitle(e.target.value) }}
                            />

                        </div>

                        <div className="">
                            <Input
                                placeholder='Duration'
                                type='number'
                                name='title'
                                required='Enter Session Title'
                                onChange={(e) => { setSessionTitle(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div className="">
                        <Input
                            type='text'
                            placeholder='Image of the session'
                            name='title'
                            required='Enter Session Title'
                            onChange={(e) => { setSessionTitle(e.target.value) }}
                        />
                        <label className="">Add an image of the session</label>
                    </div>

                    <div className="w">
                        <TextArea
                            name='description'
                            required
                            placeholder='Describe you session '
                            size={50}
                        />
                        <label className="">Session Description</label>
                    </div>

                    <div className="flex items-center gap-4">

                        <Datefield
                            name={'regStarts'}
                            label={'Registration Starts'}
                        ></Datefield>

                        <Datefield
                            name={'regEnds'}
                            label={'Registration Ends'}
                        ></Datefield>

                    </div>

                    <div className="flex items-center gap-4">

                        <Datefield
                            name={'classStarts'}
                            label={'Class Starts'}
                        ></Datefield>

                        <Datefield
                            name={'classEnds'}
                            label={'Class Ends'}
                        ></Datefield>

                    </div>




                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {
                            loading ?
                                <p>
                                    Creating Session
                                    <span className="loading loading-dots loading-sm"></span>
                                </p>
                                :
                                <p>
                                    Create Session
                                </p>
                        }
                    </button>
                </form>

            </div>
        </div>
    );
};

export default CreateSession;