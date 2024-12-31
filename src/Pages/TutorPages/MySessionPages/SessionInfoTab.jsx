import useFormateDate from "../../../CustomHooks/useFormateDate";
import useTodaysDate from "../../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'

const SessionInfoTab = ({ mySession }) => {

    const sessionImage = mySession?.sessionImage
    const registrationFee = mySession?.registrationFee
    const duration = mySession?.duration
    const todaysDate = new Date(useTodaysDate())
    const regEndDate = new Date(mySession?.registrationEnds)
    const formattedRegistrationStartingDate = useFormateDate(mySession?.registrationStarts)
    const formattedRegistrationEndingDate = useFormateDate(mySession?.registrationEnds)
    const formattedClassStartingDate = useFormateDate(mySession?.classStarts)
    const formattedClassEndingDate = useFormateDate(mySession?.classEnds)
    const applyingDate = useFormateDate(mySession?.applyingDate)
    const isExpired = todaysDate > regEndDate
    console.log(todaysDate, regEndDate);
    console.log(regEndDate, isExpired);

    return (
        <div className="grid grid-cols-2 place-items-center justify-items-start gap-y-3 gap-x-4 md:gap-x-6">
            {/* <img src={sessionImage}
                alt="session thumbnail"
                className="h-40 w-60 object-cover rounded-md"
            /> */}


            <div className="flex flex-col justify-start">
                <p>Duration</p>
                <h3 className="font-bold">{duration} hours</h3>
            </div>

            <div className="flex flex-col justify-start">
                <p>Fee</p>
                <h3 className="font-bold">$ {registrationFee}</h3>
            </div>

            <div className="flex flex-col justify-start">
                <p>Class Deadline</p>
                <h3 className="font-bold">{formattedClassEndingDate}</h3>
            </div>

            <div className="flex flex-col justify-start">
                <p>Registration Status</p>
                <h3 className={`font-bold ${isExpired ? 'text-red-500' : 'text-green-500'} `}>
                    {isExpired ? 'Expired' : 'Currenly Enrolling'}
                </h3>
            </div>

        </div>
    );
};

SessionInfoTab.propTypes = {
    mySession: PropTypes.object
}

export default SessionInfoTab;