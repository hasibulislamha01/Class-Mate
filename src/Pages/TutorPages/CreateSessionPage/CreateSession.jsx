import 'react-datepicker/dist/react-datepicker.css'
import Datefield from "../../../Components/Datefield/Datefield";
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTodaysDate from '../../../CustomHooks/useTodaysDate';
import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from '../../../Components/SharedComponents/UploadImage/UploadImage';
import DashboardHeading from '../../../Components/SharedComponents/DashboardComponents/DashboardHeading';

const CreateSession = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const tutorName = user?.displayName;
    const tutorEmail = user?.email
    const tutorPhoto = user?.photoURL
    const applyingDate = useTodaysDate()
    const [loading, setLoading] = useState(false)
    const [sessionTitle, setSessionTitle] = useState('')
    const [duration, setDuration] = useState(null)
    const [description, setDescription] = useState('')
    const [registrationStarts, setRegStart] = useState(null)
    const [registrationEnds, setRegEnd] = useState(null)
    const [classStarts, setClassStart] = useState(null)
    const [classEnds, setClassEnds] = useState(null)
    const [imageUrl, setImageUrl] = useState(null);
    const [ready, setReady] = useState(false)
    const registrationFee = '0';
    const status = 'pending'

    // Recompute `ready` whenever any required field changes
    useEffect(() => {
        if (
            sessionTitle &&
            duration &&
            description &&
            registrationStarts &&
            registrationEnds &&
            classStarts &&
            classEnds &&
            imageUrl
        ) {
            setReady(true);
        } else {
            setReady(false);
        }
        // console.log('url is',imageUrl);
    }, [
        sessionTitle,
        duration,
        description,
        registrationStarts,
        registrationEnds,
        classStarts,
        classEnds,
        imageUrl,
    ]);


    const handleCreateSession = (event) => {
        event.preventDefault()
        

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
            sessionImage: imageUrl
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
        <div className="min-h-screen flex flex-col justify-start ">
            <DashboardHeading
                title={'Create a Session'}
                subtitle={'Create a session and expand yourself as a ClassMate tutor'} />

            <div className="px-3 md:px-6 lg:px-12 xl:px-32 w-full py-10 bg-accent dark:bg-dark-accent rounded-lg flex items-center gap-12 lg:gap-20 shadow-lg hover:shadow-primary/20">

                <div className='w-72 h-72'>
                    <img src="/scientist.svg" alt="" className='w-full h-full' />
                </div>

                <form onSubmit={handleCreateSession} className="w-full flex flex-col space-y-6 ">


                    <div className='flex flex-col items-center md:flex-row gap-5'>
                        <div className="">
                            <label className="">Session Title</label>
                            <Input
                                className='dark:bg-dark-background dark:text-dark-text dark:border-dark-accent'
                                placeholder='Enter Session Title'
                                type='text'
                                name='title'
                                required='Enter Session Title'
                                onChange={(e) => { setSessionTitle(e.target.value) }}
                            />

                        </div>

                        <div className="">
                            <label htmlFor="">Session Duration in hours</label>
                            <Input
                                className='dark:bg-dark-background dark:text-dark-text dark:border-dark-accent'
                                placeholder='Duration (hours)'
                                type='number'
                                name='duration'
                                required='Enter duration'
                                onChange={(e) => { setDuration(e.target.value) }}
                            />
                        </div>
                    </div>


                    <div className="">
                        <UploadImage
                            formLabel={'Add a cover image of the session'}
                            setImageUrl={setImageUrl}
                        />
                    </div>

                    <div className='flex flex-col md:flex-row gap-5 '>
                        <div className="flex flex-col">
                            <label htmlFor="">Pick Registrtion timeline</label>
                            <Datefield
                                setStart={setRegStart}
                                setEnd={setRegEnd}
                            ></Datefield>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">Pick Class timeline</label>
                            <Datefield
                                setStart={setClassStart}
                                setEnd={setClassEnds}
                            ></Datefield>
                        </div>
                    </div>

                    <div className="">
                        <label className="">Description</label>
                        <TextArea
                            name='description'
                            required
                            placeholder='Describe you session '
                            size={50}
                            onChange={(e) => { setDescription(e.target.value) }}
                        />
                    </div>


                    <Button
                        htmlType='submit'
                        disabled={!ready}
                        style={{
                            border: '0px'
                        }}
                        className="bg-primary text-accent ">
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
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default CreateSession;