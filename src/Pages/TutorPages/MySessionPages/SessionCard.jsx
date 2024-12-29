import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Button } from 'antd';
import useAuth from '../../../CustomHooks/useAuth';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosArrowDown } from 'react-icons/io';
import { BsUpload } from 'react-icons/bs';
import SessionInfoTab from './SessionInfoTab';


// const tabList = [
//     {
//         key: 'tab1',
//         tab: 'tab1',
//     },
//     {
//         key: 'tab2',
//         tab: 'tab2',
//     },
// ];
// const contentList = {
//     tab1: <p>content1</p>,
//     tab2: <p>content2</p>,
// };
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
const contentListNoTitle = {
    session: <p>Session Content</p>,
    materials: <p>materials content</p>,
    notes: <p>Notes content</p>,
};


const SessionCard = ({ mySession, refetch }) => {
    // console.log(mySession)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const sessionId = mySession?._id
    const tutorPhoto = user?.photoURL
    // const tutorName = mySession?.tutorName
    const sessionTitle = mySession?.sessionTitle
    // const registrationStartingDate = mySession?.registrationStarts
    
    
    const status = mySession?.status



    const contentListNoTitle = {
        session: <SessionInfoTab mySession={mySession} />,
        materials: <p>materials content</p>,
        notes: <p>Notes content</p>,
    };

    let badgeBg = 'white'
    if (status === 'pending') {
        badgeBg = 'bg-warning'
    }
    else if (status === 'approved') {
        badgeBg = 'bg-[#15803d] text-[#dcfce7]'
    }
    else if (status === 'rejected') {
        badgeBg = 'bg-[#dc2626] text-[#fef2f2]'
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };




    const handleRequestforApproval = (id, info) => {
        // console.log('requesting', id)
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

    const wrapper = (id, newStatus) => {
        const defaultAmount = 0
        const info = { newStatus, defaultAmount }
        toast.promise(
            handleRequestforApproval(id, info)
                .then(res => {
                    console.log(res.data)
                    if (res.data.modifiedCount) {
                        refetch()

                    }
                })
                .catch(error => {
                    console.error(error.message)
                }),

            {
                loading: 'Saving...',
                success: <b>Request Sent to Administrator</b>,
                error: <b>Could not sent Request</b>,
            }

        )
    }


    // antD card controlling logics
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const [activeTabKey2, setActiveTabKey2] = useState('app');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };

    return (
        <>

            <Card
                title={
                    <div className='my-2 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <img src={tutorPhoto} alt="tutor photo" className='h-8 w-8 object-cover rounded-full' />
                            <h1 className='font-bold text-primary'>{sessionTitle}</h1>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className={`${badgeBg} h-3 w-3 rounded-full`}></div>
                            <h5 className='text-xs'>{status}</h5>
                        </div>
                    </div>
                }
                style={{
                    width: '100%',
                }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey2}
                tabBarExtraContent={<a href="#">More</a>}
                onTabChange={onTab2Change}
                tabProps={{
                    size: 'middle',
                }}

                className='shadow-lg'
            >
                {contentListNoTitle[activeTabKey2]}
            </Card>
        </>
    );
};

SessionCard.propTypes = {
    mySession: PropTypes.object,
    refetch: PropTypes.func
}

export default SessionCard;