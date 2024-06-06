import { Button, Card, Col } from "antd";
import { useLoaderData } from "react-router-dom";
import useFormateDate from "../../CustomHooks/useFormateDate";
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useUserRole from "../../CustomHooks/useUserRole";

const SessionDetails = () => {
    const [session] = useLoaderData()
    // console.log(session)
    const todaysDateString = useTodaysDate()
    const role = useUserRole()
    console.log(role)

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

    const todaysDate = new Date(todaysDateString)
    const regEndDate = new Date(regEnds)

    let disableBookNowButton = false
    if(role === 'Administrator'){
        disableBookNowButton = true
    } else if (role === 'Tutor'){
        disableBookNowButton = true
    } else if ( regEndDate > todaysDate ){
        disableBookNowButton = true
    } else {
        disableBookNowButton = false
    }


    return (
        <div className="container mx-auto">
            <h1 className="text-center text-3xl">{sessionTitle}</h1>
            <div className="py-12 flex flex-col lg:flex-row justify-center items-center gap-12">
                <div className="space-y-6 text-center">
                    {/* <h1 className="text-2xl">{sessionTitle}</h1> */}
                    <img src={sessionImg} alt="" />

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
                        <h1 className="">Registration Fee: {session?.registrationFee} </h1>
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
                <Button className="flex justify-center mx-auto" disabled={disableBookNowButton}> Book Now </Button>
            </div>


            <div className="my-24 flex flex-col-reverse lg:flex-row justify-center items-center">
                <div className="text-center space-y-5">
                    <h1 className="font-bold text-xl">Tutor Details</h1>
                    <img src={tutorImg} alt="" className="h-[200px] w-[200px] rounded-full " />
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