import useFormateDate from "../../../CustomHooks/useFormateDate";
import useTodaysDate from "../../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'
import Info from "./Info";

const SessionInfoTab = ({ registrationFee, duration, regEnds, classEnds }) => {

    // const sessionImage = mySession?.sessionImage
    // const registrationFee = mySession?.registrationFee
    // const duration = mySession?.duration
    const todaysDate = new Date(useTodaysDate())
    const regEndDate = new Date(regEnds)
    // const formattedRegistrationStartingDate = useFormateDate(mySession?.registrationStarts)
    // const formattedRegistrationEndingDate = useFormateDate(mySession?.registrationEnds)
    // const formattedClassStartingDate = useFormateDate(mySession?.classStarts)
    const formattedClassEndingDate = useFormateDate(classEnds)
    const isExpired = todaysDate > regEndDate

    const iterableItems = [
        { keyName: 'Duration', keyValue: duration, unit: 'hours' },
        { keyName: 'Fee', keyValue: `$ ${registrationFee}` },
        { keyName: 'Class Deadline', keyValue: formattedClassEndingDate },
    ]

    return (
        <div className="grid grid-cols-2 place-items-center justify-items-start gap-y-3 gap-x-4 md:gap-x-6">


            {
                iterableItems?.map(item =>
                    <Info
                        key={item?.keyName}
                        itemName={item.keyName}
                        itemValue={item.keyValue}
                        unit={item.unit || ''}
                    />
                )
            }

            <div className="flex flex-col justify-start">
                <p>Registration Status</p>
                <h3 className={`font-bold ${isExpired || status === 'rejected' ? 'text-red-500' : 'text-green-500'} `}>
                    {isExpired ? 'Expired' :
                        status === 'rejected' ? 'Pending' :
                            'Currenly Enrolling'
                    }
                </h3>
            </div>

        </div>
    );
};

SessionInfoTab.propTypes = {
    registrationFee: PropTypes.string,
    duration: PropTypes.string,
    regEnds: PropTypes.string,
    classEnds: PropTypes.string,
}

export default SessionInfoTab;