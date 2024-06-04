
import 'react-datepicker/dist/react-datepicker.css'
import ClassAnimation from "../../../Components/AnimationComponents/ClassAnimation";
import Datefield from "../../../Components/Datefield/Datefield";
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useTodaysDate from '../../../CustomHooks/useTodaysDate';

const CreateSession = () => {

    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const tutorName = user?.displayName;
    const tutorEmail = user?.email
    const tutorPhoto = user?.photoURL
    const applyingDate = useTodaysDate()


    const handleCreateSession = (event) => {
        event.preventDefault()
        const form = event.target
        const sessionTitle = form.sessionTitle.value;
        const duration = form.duration.value;
        const description = form.description.value;
        const registrationStarts = form.regStarts.value;
        const registrationEnds = form.regEnds.value;
        const classStarts = form.classStarts.value;
        const classEnds = form.classEnds.value;
        const sessionImage = form.sessionImage.value;
        const registrationFee = '0';
        const status = 'pending'

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
        <div className="flex flex-col-reverse lg:flex-row justify-evenly items-center">
            <div>
                <ClassAnimation></ClassAnimation>
            </div>
            <div className="">
                <h1 className="text-center text-3xl my-6"> Create Session </h1>
                <form onSubmit={handleCreateSession} className="w-full flex flex-col items-center justify-center space-y-6">

                    <div className="w-full flex items-center gap-4">
                        <div className="input-container mx-auto">
                            <input
                                className=""
                                type="text"
                                name="sessionTitle"
                                required="required"
                            />
                            <label className="label">Session Title</label>
                        </div>

                        <div className="input-container mx-auto">
                            <input
                                className=""
                                type="number"
                                name="duration"
                                required="required"
                            />
                            <label className="label">Duration in hours</label>
                        </div>
                    </div>

                    <div className="input-container mx-auto">
                        <input
                            className=""
                            type="text"
                            name="sessionImage"
                            required="required"
                        />
                        <label className="label">Add an image of the session</label>
                    </div>

                    <div className="w-full mx-auto big-input-container">
                        <textarea
                            name='description'
                            className=''
                            required
                        ></textarea>
                        <label className="label">Session Description</label>
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




                    <button type="submit" className="btn btn-block">Create Session</button>
                </form>

            </div>
        </div>
    );
};

export default CreateSession;