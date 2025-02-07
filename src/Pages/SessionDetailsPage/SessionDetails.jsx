import { Button, Card, Rate } from "antd";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useFormateDate from "../../CustomHooks/useFormateDate";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import Review from "../StudentPages/ReviewSection/Review";
import useUserRole from "../../CustomHooks/useUserRole";
import useShowMessage from "../../CustomHooks/Alerts/useShowMessage";
import { AiOutlineMail } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import Reviews from "./Reviews";
import { useEffect, useState } from "react";

const SessionDetails = () => {
    const session = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    const todaysDateString = useTodaysDate()
    const showMessage = useShowMessage()
    // console.log(session)
    const role = useUserRole()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    const [rating, setRating] = useState(0)
    // console.log(role, location, showMessage)


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

    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEnds)


    let disableBookNowButton = false
    let paymentPageLink = ''
    if (role === 'Administrator') {
        disableBookNowButton = true
        paymentPageLink = ''
    } else if (role === 'Tutor') {
        disableBookNowButton = true
        paymentPageLink = ''
    } else if (regEndDate < todaysDate) {
        disableBookNowButton = true
        paymentPageLink = ''
    } else if (location.state === '/dashboard/student/bookedSessions') {
        disableBookNowButton = true
        paymentPageLink = ''
    }
    else {
        disableBookNowButton = false
        paymentPageLink = `/payment/${sessionId}`
    }

    useEffect(() => {
        axiosSecure.get(`/reviews?sessionId=${sessionId}`)
            .then(res => setRating(res?.data.rating))
            .catch(error => console.error(error.message))
    })

    const handleBookSession = () => {
        const studentEmail = user?.email
        console.log(sessionId, studentEmail, regFee)
        const bookedSessionInfo = {
            ...session,
            sessionId,
            studentEmail
        }
        delete bookedSessionInfo?._id
        // console.log(sessionImg),

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
                            className="sticky tracking-wider text-xl shadow-sm"
                        >

                            <h1 className="text-center text-primary font-bold">{sessionTitle}</h1>
                        </Card>

                        {/* hero cards */}
                        <div className="h-full flex flex-col lg:flex-row gap-3">
                            {/* image card */}
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
                                        <div className="w-full flex justify-end">
                                            <Button
                                                onClick={showMessage?.success('done')}
                                                className="bg-primary text-accent">Book Now</Button>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                            {/* details container */}
                            <div className="h-full flex flex-col justify-between gap-10">
                                <Card className="shadow-sm">
                                    <div className="space-y-8">
                                        <div>
                                            <h1 className="text-lg font-bold mb-2">About:</h1>
                                            <p>
                                                {description}
                                            </p>
                                        </div>
                                        <div className="text-sm font-semibold flex items-center gap-4">
                                            <h3>Rating:</h3>
                                            {rating ?
                                                <Rate 
                                                style={{
                                                    fontSize: 16,
                                                    color: '#5CBFE9'
                                                }} disabled value={rating} /> :
                                                <p className="font-medium text-xs">no reviews yet</p>
                                            }
                                        </div>
                                    </div>
                                </Card>

                                <Card className="shadow-sm">
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
                                    <Button className={`flex justify-center mx-auto`} disabled={disableBookNowButton} onClick={handleBookSession} > Book Now </Button>
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