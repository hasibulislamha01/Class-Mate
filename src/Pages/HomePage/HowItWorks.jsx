import { Card } from "antd";
import { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { GoSearch } from "react-icons/go";
import { CiCreditCard2 } from "react-icons/ci";
import { PiCertificateLight } from "react-icons/pi";


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
            description: 'Sign Up with your personal information and get started with ClassMate'
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
            title: 'Enroll',
            description: 'Get any course in our platform and save 20% with tutor support'
        },
        {
            id: 4,
            icon: <PiCertificateLight size={30}/>,
            title: 'Get Certificate',
            description: 'We offer a certificate of completion and excellence to acknowledge your hard work'
        },
    ]
    const studentHowTo = <div className="grid grid-cols-2 lg:grid-cols-4 place-items-center">
        {
            studentOptions?.map(options => {
                return (
                    <div
                        className="w-56 space-y-3"
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
        tab2: <p>content2</p>,
    };
    return (
        <section className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-center w-[97%] md:w-[85%] lg:w-[75%] mx-auto space-y-5">
                <h1 className="font-bold text-xl xl:text-2xl">How it works</h1>
                <p>
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
            >
                {contentList[activeTabKey1]}
            </Card>
        </section>
    );
};

export default HowItWorks;