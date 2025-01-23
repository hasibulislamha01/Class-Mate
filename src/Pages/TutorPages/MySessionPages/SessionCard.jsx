import { useContext, useState } from 'react';
import PropTypes from 'prop-types'
import {Card} from 'antd'
// import { Link } from 'react-router-dom';
// import { Button, Card, Tooltip } from 'antd';
// import { Button } from 'antd';
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
// import { IoIosArrowDown } from 'react-icons/io';
// import { BsUpload } from 'react-icons/bs';
import SessionInfoTab from './SessionInfoTab';
import { AuthContext } from '../../../Components/Auth/AuthProvider';
import MaterialTab from './MaterialTab';


const tabListNoTitle = [
    {
        key: 'session',
        label: 'Session Info',
    },
    {
        key: 'materials',
        label: 'Materials',
    },
    {
        key: 'notes',
        label: 'Notes',
    },
];



const SessionCards = ({ mySession, refetch, setModalOpen, setSessionId }) => {


    // console.log(mySession)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { theme } = useContext(AuthContext)

    // antD card controlling logics
    const [activeTabKey2, setActiveTabKey2] = useState('session');
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };

    const sessionId = mySession?._id
    // const tutorPhoto = user?.photoURL
    // const tutorName = mySession?.tutorName
    // const sessionTitle = mySession?.sessionTitle
    // const status = mySession?.status
    const sessionImage = mySession?.sessionImage
    sessionId && setSessionId(sessionId)

    const renderTabContent = (content) => (
        <div className="flex flex-col md:flex-row items-center gap-4">
            {sessionImage && (
                <img
                    src={sessionImage}
                    alt="Session"
                    className="h-32 w-48 object-cover rounded-md mb-4"
                />
            )}
            {content}
        </div>
    );



    // let badgeBg = 'white'
    // if (status === 'pending') {
    //     badgeBg = 'bg-warning'
    // }
    // else if (status === 'approved') {
    //     badgeBg = 'bg-[#15803d] text-[#dcfce7]'
    // }
    // else if (status === 'rejected') {
    //     badgeBg = 'bg-[#dc2626] text-[#fef2f2]'
    // }






    const handleRequestforApproval = (id, info) => {
        console.log('requesting', id)
        return axiosSecure.patch(`/sessions/request/${id}`, info)
        // .then(res => {
        //     console.log(res.data)
        //     if (res.data.modifiedCount) {
        //         toast.success('Request sent to Administrator')
        //         refetch()
        //     }
        // })
        // .catch(error => {
        //     console.error(error.message)
        // })
    }

    // const wrapper = (id, newStatus) => {
    //     const defaultAmount = 0
    //     const info = { newStatus, defaultAmount }
    //     toast.promise(
    //         handleRequestforApproval(id, info)
    //             .then(res => {
    //                 console.log(res.data)
    //                 if (res.data.modifiedCount) {
    //                     refetch()

    //                 }
    //             })
    //             .catch(error => {
    //                 console.error(error.message)
    //             }),

    //         {
    //             loading: 'Saving...',
    //             success: <b>Request Sent to Administrator</b>,
    //             error: <b>Could not sent Request</b>,
    //         }

    //     )
    // }



    const contentListNoTitle = {
        session: renderTabContent(<SessionInfoTab mySession={mySession} />),
        materials: renderTabContent(<MaterialTab setModalOpen={setModalOpen} />),
        notes: renderTabContent(<p>Notes content</p>),
    };

    return (
        <>

            <Toaster />

            <Card
                // title={
                    // <div className='my-2 flex items-center justify-between'>
                    //     <div className='flex items-center gap-4'>
                    //         <img src={tutorPhoto} alt="tutor photo" className='h-8 w-8 object-cover rounded-full' />
                    //         <Link to={`/sessions/${sessionId}`}>
                    //             <h1 className='font-bold text-primary hover:underline hover:underline-offset-4'>{sessionTitle}</h1>
                    //         </Link>
                    //         <h3 className='ml-2 font-md text-xs'>Star</h3>
                    //     </div>
                    //     <div className='flex items-center gap-1 text-text dark:text-dark-text'>
                    //         {
                    //             status === 'rejected' &&
                    //             <Tooltip title='Request For Approval'>
                    //                 <Button
                    //                     shape='circle'
                    //                     icon={<RiSendPlane2Line />}
                    //                     className='mx-2'
                    //                     onClick={() => wrapper(sessionId, 'pending')}
                    //                 ></Button>
                    //             </Tooltip>
                    //         }
                    //         <div className={`${badgeBg} h-3 w-3 rounded-full`}></div>
                    //         <h5 className='text-xs'>{status}</h5>
                    //     </div>
                    // </div>
                // }
                style={{
                    width: '100%',
                }}
                styles={{
                    header: {
                        borderBottom: `1px solid ${theme === 'dark' ? "#333333" : "#D1D5DB"}`,
                    },
                    body: {
                        padding: 10
                    }
                }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey2}
                tabBarExtraContent={<a href="#">More</a>}
                onTabChange={onTab2Change}
                tabProps={{
                    size: 'middle',
                }}

                className='dark:bg-dark-accent dark:border-dark-accent shadow-lg text-text dark:text-dark-text'
            >
                {contentListNoTitle[activeTabKey2]}
            </Card>

        </>
    );
};

SessionCards.propTypes = {
    mySession: PropTypes.object,
    refetch: PropTypes.func,
    modalOpen: PropTypes.bool,
    setModalOpen: PropTypes.func,
    setSessionId: PropTypes.func
}

export default SessionCards;