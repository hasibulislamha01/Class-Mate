import { Button, Card, message } from "antd";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useFormateDate from "../../CustomHooks/useFormateDate";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import Review from "../StudentPages/ReviewSection/Review";
import useUserRole from "../../CustomHooks/useUserRole";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";
import Rating from "./Rating";

const SessionDetails = () => {
    const session = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    const todaysDateString = useTodaysDate()
    // console.log(session)
    const { role } = useUserRole()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const [bookingValidator, setBookingValidator] = useState({ state: true, message: '' })
    const [loading, setLoading] = useState(false);
    const [paymentPageLink, setPaymentPageLink] = useState('');
    const [studentEmail, setStudentEmail] = useState('')
    console.log(bookingValidator)

    const sessionId = session?._id
    const sessionTitle = session?.sessionTitle
    const sessionImg = session?.sessionImage
    const description = session?.description
    const tutorImg = session?.tutorPhoto
    const tutorEmail = session?.tutorEmail
    const tutorName = session?.tutorName
    const regStarts = useFormateDate(session?.registrationStarts)
    const regEnds = useFormateDate(session?.registrationEnds)
    const classStarts = useFormateDate(session?.classStarts)
    const classEnds = useFormateDate(session?.classEnds)
    const regFee = session?.registrationFee
    const duration = session?.duration
    const status = session?.status

    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEnds)



    useEffect(() => {
        if (role === 'student') setStudentEmail(user?.email)
        validateBooking(studentEmail);
    }, []);

    const validateBooking = async () => {
        try {
            setLoading(true);
            const { data } = await axiosSecure.get(`/bookedSessions?studentEmail=${studentEmail}&sessionId=${sessionId}`);
            setLoading(false);

            if (data.length > 0) {
                setBookingValidator({ status: false, message: 'You cannot book a session twice' });
                return false;
            }

            if (role !== 'student') {
                setBookingValidator({ status: false, message: 'Only students can book sessions' });
                return false;
            }

            if (regEndDate < todaysDate && status === 'approved') {
                setBookingValidator({ status: false, message: 'Registration deadline expired' });
                return false;
            }

            if (location.state === '/dashboard/student/bookedSessions') {
                setBookingValidator({ status: false, message: 'Session already booked' });
                return false;
            }

            setBookingValidator({ status: true, message: '' });
            setPaymentPageLink(`/payment/${sessionId}`);
            return true;
        } catch (error) {
            setLoading(false);
            console.error('Error validating booking:', error);
            setBookingValidator({ status: false, message: 'Something went wrong. Please try again.' });
        }
    };

    const bookeSession = () => {
        if (!studentEmail) return
        console.log(sessionId, studentEmail, regFee)
        const bookedSessionInfo = {
            ...session,
            sessionId,
            studentEmail
        }


        Swal.fire({
            title: `Book ${sessionTitle} session?`,
            text: `You will need ${regFee}$ to book the session`,
            imageUrl: sessionImg,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: '#16a34a',
            customClass: {
                confirmButton: 'w-[100px]'
            }

        }).then((result) => {
            if (result.isConfirmed) {
                validateBooking(studentEmail)
                if (regFee !== '0') {
                    console.log('redirecting to payment gateway')
                    console.log(bookedSessionInfo)
                    navigate(paymentPageLink)
                } else {
                    console.log(bookedSessionInfo)
                    axiosSecure.post('/bookedSessions', bookedSessionInfo)
                        .then(response => {
                            console.log(response.data)
                            if (response.data.insertedId) {
                                Swal.fire({
                                    title: "Congratulations!",
                                    text: "You booked the session",
                                    icon: "success"
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error.message)
                        })
                }
            }
        });
    }

    const handleBookSession = async () => {
        const bookingStatus = await validateBooking()
        console.log(bookingStatus)
        if (bookingStatus) {
            bookeSession()
        }
        else {
            message.error(bookingValidator?.message)
        }
    }

    return (
        <div className="w-[95%] xl:w-[85%] mx-auto pt-20">
            {
                !session ?
                    <div className="h-screen flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                    :
                    <section className="flex flex-col gap-2 lg:gap-3">

                        {/* title card */}
                        <Card
                            styles={{
                                body: { padding: 10 }
                            }}
                            className="sticky tracking-wider text-xl shadow-sm shadow-primary/20"
                        >

                            <h1 className="text-center text-primary font-bold">{sessionTitle}</h1>
                        </Card>

                        {/* hero cards */}
                        <div className="h-full flex flex-col lg:flex-row gap-3">
                            {/* image card */}
                            <div className="flex flex-col gap-2 justify-between items-center">
                                <Card
                                    styles={{
                                        body: {
                                            padding: 15
                                        }
                                    }}
                                    className="shadow-sm"
                                >
                                    <div className="h-full flex flex-col md:flex-row lg:flex-col items-center justify-between gap-5">

                                        <div className="w-80 h-48">
                                            <img src={sessionImg} alt="session image" className="w-full h-full object-cover rounded-md" />
                                        </div>

                                        <div className="leading-7 flex flex-col md:flex-col items-start justify-center w-full">
                                            <div className="">
                                                <h1 className="font-bold">{sessionTitle}</h1>
                                                <h3 className="">Fee:  ${regFee}</h3>
                                                <h3>Duration: {duration} hours</h3>
                                            </div>

                                        </div>
                                    </div>

                                </Card>
                                <div className="w-full md:w-[61%] lg:w-full">

                                    <Button
                                        type="primary"
                                        block
                                        size="medium"
                                        className={``}
                                        onClick={() => handleBookSession(sessionId)} > Book Now </Button>
                                </div>
                            </div>


                            {/* details container */}
                            <div className="flex flex-col justify-between items-center gap-4">

                                {/* about card */}
                                <Card className=" shadow-sm">
                                    <div className="space-y-8">
                                        <div>
                                            <h1 className="text-lg font-bold mb-2">About:</h1>
                                            <p>
                                                {description}
                                            </p>
                                        </div>

                                        <Rating sessionId={sessionId} />

                                    </div>
                                </Card>

                                {/* date card */}
                                <Card className="shadow-sm w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch gap-10">
                                        <div className="pr-2 border-r-2 border-primary">
                                            <h1 className="text-lg font-bold">{regStarts}</h1>
                                            <p>Registration Starts</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-lg font-bold">{regEnds}</h1>
                                            <p>Registration Ends</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-lg font-bold">{classStarts}</h1>
                                            <p>Class Starts</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-lg font-bold">{classEnds}</h1>
                                            <p>Class Ends</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        </div>


                        <div className="text-center space-y-6">
                            {
                                location.state === '/dashboard/student/bookedSessions' ?
                                    <section className="my-12 lg:my-24 md:w-[80%] lg:w-[60%] mx-auto">
                                        <Review
                                            sessionId={sessionId}
                                        ></Review>
                                    </section>
                                    :
                                    <></>
                            }
                        </div>

                        <Reviews sessionId={sessionId} />

                        <div className="my-24 flex flex-col-reverse lg:flex-row justify-center items-center">
                            <Card
                                className="w-96"
                            >

                                <div className="h-48 w-full">
                                    <img src={tutorImg} alt="" className="h-full w-full object-cover rounded-md" />
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                    <div>
                                        <h1 className="font-bold text-lg">{tutorName}</h1>
                                        <p>Classmate Tutor</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full p-2 bg-primary"><AiOutlineMail size={20} fill="#ffffff" /></div>
                                        <div className="rounded-full p-2 bg-primary"><IoIosCall size={20} fill="#ffffff" /></div>

                                    </div>
                                </div>
                            </Card>

                        </div>
                    </section>
            }

        </div>
    );
};

export default SessionDetails;