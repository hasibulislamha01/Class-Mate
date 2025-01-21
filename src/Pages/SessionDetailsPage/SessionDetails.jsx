import { Button, Card } from "antd";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useFormateDate from "../../CustomHooks/useFormateDate";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import Review from "../StudentPages/ReviewSection/Review";
import useUserRole from "../../CustomHooks/useUserRole";
import useShowMessage from "../../CustomHooks/Alerts/useShowMessage";
import ShowModal from "../../Components/UI/ShowModal/ShowModal";

const SessionDetails = () => {
    const session = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    const todaysDateString = useTodaysDate()
    const showMessage = useShowMessage()
    console.log(session)
    const role = useUserRole()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    console.log(role, location, showMessage)


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

    // console.log(regEndDate > todaysDate)

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
        <div className="container mx-auto py-16 lg:py-24">
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
                        <div className="h-full flex gap-3">
                            {/* image card */}
                            <Card
                                styles={{
                                    body: {
                                        padding: 15
                                    }
                                }}
                                className="shadow-sm"
                            >
                                <div className="h-full flex flex-col justify-between gap-5">

                                    <div className="w-80 h-48">
                                        <img src={sessionImg} alt="session image" className="w-full h-full object-cover rounded-md" />
                                    </div>

                                    <div className="leading-7 flex items-end justify-between">
                                        <div>
                                            <h1 className="font-bold">{sessionTitle}</h1>
                                            <h3 className="">Fee:  ${regFee}</h3>
                                            <h3>Duration: {duration} hours</h3>
                                        </div>
                                        <div className="flex justify-center">
                                            <Button 
                                            onClick={showMessage?.success('done')}
                                            className="bg-primary text-accent">Book Now</Button>
                                        </div>
                                    </div>
                                </div>

                            </Card>
                            {/* details container */}
                            <div className="h-full flex flex-col justify-between gap-5">
                                <Card className="shadow-sm">
                                    <div className="space-y-8">
                                        <div>
                                            <h1 className="text-lg font-bold mb-2">About:</h1>
                                            <p>
                                                {description}
                                            </p>
                                        </div>
                                        <div className="text-lg font-bold ">
                                            Rating:
                                        </div>
                                    </div>
                                </Card>

                                <Card className="shadow-sm">
                                    <div className="grid grid-cols-4 justify-items-stretch gap-10">
                                        <div className="pr-2 border-r-2 border-primary">
                                            <h1 className="text-xl font-bold">{regStarts}</h1>
                                            <p>Registration Starts</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-xl font-bold">{regEnds}</h1>
                                            <p>Registration Ends</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-xl font-bold">{classStarts}</h1>
                                            <p>Class Starts</p>
                                        </div>
                                        <div className="pr-5 border-r-2 border-primary">
                                            <h1 className="text-xl font-bold">{classEnds}</h1>
                                            <p>Class Ends</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        </div>


                        <div className="text-center space-y-6">
                            {
                                location.state === '/dashboard/student/bookedSessions' ?
                                    <Review
                                        sessionId={sessionId}
                                    ></Review>
                                    :
                                    <Button className={`flex justify-center mx-auto`} disabled={disableBookNowButton} onClick={handleBookSession} > Book Now </Button>
                            }
                        </div>


                        <div className="my-24 flex flex-col-reverse lg:flex-row justify-center items-center">
                            <div className="text-center space-y-5">
                                <h1 className="font-bold text-xl">Tutor Details</h1>
                                <img src={tutorImg} alt="" className="h-[200px] w-[200px] object-cover rounded-full " />
                                <div className="space-y-2">
                                    <h1>{tutorName}</h1>
                                    <p>Email: {tutorEmail}</p>
                                </div>
                            </div>

                        </div>
                        <ShowModal buttonText='show' modalContent={
                            <div>
                                heoo...
                            </div>
                        }/>
                    </section>
            }

        </div>
    );
};

export default SessionDetails;