import { Card } from "antd";
import { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { GoSearch } from "react-icons/go";
import { CiCreditCard2 } from "react-icons/ci";
import { PiCertificateLight, PiCurrencyCircleDollarLight, PiNoteLight } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";




const description = "Classmate is designed to cater to the unique needs of Students and Teachers making online collaboration and learning seamless and efficient."

const tabList = [
    {
        key: 'tab1',
        tab: 'Student',
    },
    {
        key: 'tab2',
        tab: 'Tutor',
    },
];





const HowItWorks = () => {
    const [activeTabKey1, setActiveTabKey1] = useState('tab1');
    const onTab1Change = (key) => {
        setActiveTabKey1(key);
    };
    const studentOptions = [
        {
            id: 1,
            icon: <VscSaveAs size={30}/>,
            title: 'Sign Up',
            description: 'Sign Up with your personal information and get started.'
        },
        {
            id: 2,
            icon: <GoSearch size={30}/>,
            title: 'Find Course',
            description: 'Find your desired course or choose any desired one to start learning'
        },
        {
            id: 3,
            icon: <CiCreditCard2 size={30}/>,
            title: 'Enroll Course',
            description: 'Get any course in our platform and save 20% with tutor support'
        },
        {
            id: 4,
            icon: <PiCertificateLight size={30}/>,
            title: 'Get Certificate',
            description: 'Get a certificate of acknowledgement of your learning.'
        },
    ]
    const tutorOptions = [
        {
            id: 1,
            icon: <VscSaveAs size={30}/>,
            title: 'Sign Up',
            description: 'Sign Up with your personal information and get started.'
        },
        {
            id: 2,
            icon: <IoCreateOutline size={30}/>,
            title: 'Create Course',
            description: 'Create a course for the students on ClassMate.'
        },
        {
            id: 3,
            icon: <PiNoteLight size={30}/>,
            title: 'Mange Materials',
            description: 'Get any course in our platform and save 20% with tutor support.'
        },
        {
            id: 4,
            icon: <PiCurrencyCircleDollarLight size={30}/>,
            title: 'Get Profit',
            description: 'Enrollment of your cours by students earns you money.'
        },
    ]


    const studentHowTo = <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-y-10">
        {
            studentOptions?.map(options => {
                return (
                    <div
                        className="w-48 md:w-56 space-y-3"
                        key={options?.id}
                    >
                        <h1>{options?.icon}</h1>
                        <h1 className="font-semibold">{options.title}</h1>
                        <p className="text-sm">{options.description}</p>
                    </div>
                )
            })
        }
    </div>

    const tutorHowTo = <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-y-10">
        {
            tutorOptions?.map(options => {
                return (
                    <div
                        className="w-48 md:w-56 space-y-3"
                        key={options?.id}
                    >
                        <h1>{options?.icon}</h1>
                        <h1 className="font-semibold">{options.title}</h1>
                        <p className="text-sm">{options.description}</p>
                    </div>
                )
            })
        }
    </div>

    const contentList = {
        tab1: studentHowTo,
        tab2: tutorHowTo,
    };
    return (
        <section className="min-h-screen flex flex-col justify-center gap-10 my-32">
            <div className="text-center w-[95%] md:w-[85%] lg:w-[60%] mx-auto space-y-3">
                <h1 className="font-bold text-xl xl:text-2xl">How it works</h1>
                <hr className="lg:w-3/5 mx-auto border-b" />
                <p className="pt-3">
                    {description}
                </p>
            </div>
            <Card
                style={{
                    width: '100%',
                }}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
                className="shadow-lg shadow-primary/10"
            >
                {contentList[activeTabKey1]}
            </Card>
        </section>
    );
};

export default HowItWorks;