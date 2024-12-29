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
        <div className="flex items-center gap-10">
            <img src={sessionImage}
                alt="session thumbnail"
                className="h-40 w-60 object-cover rounded-md"
            />

            <div>
                <div className="flex items-center gap-2">
                    <h3>Duration:</h3>
                    {duration} hours
                </div>
                <div className="flex items-center gap-2">
                    <h3>Fee: </h3>
                    $ {registrationFee}
                </div>
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${isExpired ? 'bg-red-400' : 'bg-green-500'} `}></div>
                    {isExpired ? `Expired` : `Currently Enrolling`}
                </div>
            </div>

            <div>

            </div>
        </div>
    );
};

SessionInfoTab.propTypes = {
    mySession: PropTypes.object
}

export default SessionInfoTab;