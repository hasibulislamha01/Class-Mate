import useFormateDate from "../../../../../CustomHooks/useFormateDate";
// import useTodaysDate from "../../../../../CustomHooks/useTodaysDate";
import PropTypes from 'prop-types'
import Info from "../../../../../Components/UI/TabCard/Info";
import { MdAutorenew } from "react-icons/md";
import { Button, Tooltip } from "antd";
import ShowModal from "../../../../../Components/UI/ShowModal/ShowModal";
import { useEffect, useState } from "react";
// import dayjs from "dayjs";


const SessionInfoTab = ({
    registrationFee,
    duration,
    regEnds,
    classEnds,
    status,
    handleRenewSession,
    sessionId }) => {

    // console.log(handleRenewSession);
    const formattedClassEndingDate = useFormateDate(classEnds)
    const [isExpired, setIsExpired] = useState(false)
    console.log(isExpired, 'expirty', formattedClassEndingDate)
    
    useEffect(() => {
        const todaysDate = new Date();
        const regEndDate = new Date(regEnds)
        console.log('todays date',todaysDate, 'reg ends date', regEndDate)
        if (todaysDate > regEndDate) {
            () => { return setIsExpired(true)}
        }
    }, [regEnds])

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
                <h3 className={`font-semibold ${isExpired || status === 'rejected' ? 'text-red-500' : 'text-green-500 text-sm'} `}>
                    {isExpired ?
                        <div className="flex items-center gap-5">
                            <h6 className="font-semibold ">Expired</h6>
                            <Tooltip title='Request Renew'>
                                <ShowModal controlButton={
                                    <Button shape="circle">
                                        <MdAutorenew size={15} className="hover:rotate-180 transition-transform duration-700" />
                                    </Button>
                                }
                                    modalContent={
                                        <section className="space-y-5">
                                            <h1 className="text-red-500 text-lg">Session Expired</h1>
                                            <p>
                                                The registration deadline is finished. The students are no longer able to enroll the session. By renewing it the students can enroll the session again.
                                            </p>

                                            <Button
                                                type="primary"
                                                icon={<MdAutorenew size={20} />}
                                                onClick={() => handleRenewSession(sessionId)}
                                            >Renew</Button>
                                        </section>
                                    }
                                />
                            </Tooltip>

                        </div> :
                        status !== 'rejected' ? 'Currenly Enrolling' :
                            'Pending'
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
    status: PropTypes.string,
    sessionId: PropTypes.string,
    handleRenewSession: PropTypes.func
}

export default SessionInfoTab;