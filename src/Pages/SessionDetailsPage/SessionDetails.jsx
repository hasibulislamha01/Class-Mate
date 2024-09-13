import { Button, Card, Col } from "antd";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useFormateDate from "../../CustomHooks/useFormateDate";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useUserRole from "../../CustomHooks/useUserRole";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";
import Review from "../StudentPages/ReviewSection/Review";

const SessionDetails = () => {
    const [session] = useLoaderData()
    const { user } = useAuth()
    const navigate = useNavigate()
    // console.log(session)
    const todaysDateString = useTodaysDate()
    const role = useUserRole()
    const axiosSecure = useAxiosSecure()
    const location = useLocation()
    console.log(role, location)


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
        <div className="container mx-auto pt-16">
            <h1 className="text-center text-3xl">{sessionTitle}</h1>
            <div className="py-12 flex flex-col lg:flex-row justify-center items-center gap-12">
                <div className="space-y-6 text-center">
                    <img src={sessionImg} alt="" className="w-[450px] h-[350px] object-cover rounded-[7px]" />
                </div>

                <div className=" text-center space-y-5">

                    <div className="grid grid-cols-2 gap-4">
                        {/* <Row className="flex"> */}
                        <Col>
                            <Card title="Registration Strats" bordered={false}>
                                {regStarts}
                            </Card>
                        </Col>
                        <Col >
                            <Card title="Registration Ends" bordered={false}>
                                {regEnds}
                            </Card>
                        </Col>
                        {/* </Row> */}

                        {/* <Row className="flex"> */}
                        <Col>
                            <Card title="Class Strats" bordered={false}>
                                {classStarts}
                            </Card>
                        </Col>
                        <Col >
                            <Card title="Class Ends" bordered={false}>
                                {classEnds}
                            </Card>
                        </Col>
                        {/* </Row> */}
                    </div>

                    <div className="space-y-2">
                        <h1 className="">Registration Fee: {session?.registrationFee}$ </h1>
                        <p className="">Expected duration: {session?.duration} hours</p>
                        <h3>Rating</h3>
                    </div>

                </div>

            </div>

            <div className="text-center space-y-6">
                <div className="space-y-3">
                    <h1 className="text-xl font-bold">Session Details</h1>
                    <p>
                        {description}
                    </p>
                </div>


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

        </div>
    );
};

export default SessionDetails;