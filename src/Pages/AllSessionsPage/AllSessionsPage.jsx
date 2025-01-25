import { useEffect, useState } from "react";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ListSkeleton from "../../Components/Skeletons/ListSkeleton";
import GridView from "./GridView";
import TableView from "./TableView";
import { useNavigate } from "react-router-dom";
import ShowPagination from "./ShowPagination";
import useGetLatestData from "../../CustomHooks/useGetLatestData";
import { AppstoreOutlined, BarsOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Segmented, Select } from 'antd';



const filterOptions = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Currently Enrolling',
        value: 'active'
    },
]



const AllSessionsPage = () => {

    const [data] = useGetLatestData('sessions', '/sessions?status=approved')
    const [sessions, setSessions] = useState([])
    const [isGridView, setIsGridView] = useState(true)
    const [loading, setLoading] = useState(true)
    // console.log(data);

    const handleViewChange = () => {
        setIsGridView((prevState) => !prevState)
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // const [showLatest, setShowLatest] = useState(false)
    // const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRedirect = (link) => {
        console.log('hitttted');
        // setLoading(true)
        navigate(link)
    }
    // console.log(isGridView);
    // console.log(sessions);

    // collecting data from database
    useEffect(() => {
        if (data) {
            setSessions(data)
            setLoading(false)
        }
    }, [data])


    // sorting logics
    const handleSort = (value) => {
        console.log(value);
        if (value === 'active') {
            // setShowLatest(true)
        } else {
            // setShowLatest(false)
        }
    }

    return (
        <div className="min-h-screen container mx-auto py-16 md:py-24 bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-300">

            {/* page heading */}
            <h1 className="text-center font-bold">All sessions</h1>

            {/* controls */}
            <div className="my-5 w-[95%] md:w-[80%] lg:w-[50%] mx-auto flex flex-col md:flex-row items-center justify-between">

                <div>
                    <Select
                        defaultValue="all"
                        style={{
                            width: 180,
                        }}
                        onChange={handleChange}
                        options={filterOptions}
                    />
                </div>


                {/* search field */}
                <div className="relative font-semibold text-primary">
                    <Input size="medium" placeholder="Search Sessions" prefix={<SearchOutlined />} />
                    {/* <CiSearch fill="#1D8BD5" size={30} type="submit" className="absolute top-[20%] left-[85%]" /> */}
                </div>

                {/* view controls */}
                <div className="flex items-center rounded-full">

                    <Segmented
                        vertical
                        options={[
                            {
                                value: 'Kanban',
                                icon: <AppstoreOutlined />,
                            },
                            {
                                value: 'List',
                                icon: <BarsOutlined />,
                            },
                        ]}
                        onChange={handleViewChange}
                    />
                </div>
            </div>


            {/* grid contents */}
            {/* grid container */}
            <div className={isGridView ? 'block mx-auto' : 'hidden'}>
                {
                    loading ?
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            {
                                <div className="hidden xl:block">
                                    <CardSkeleton />
                                </div>
                            }
                        </div>
                        :
                        <GridView sessions={sessions} handleRedirect={handleRedirect} />


                }
            </div>


            {/* list contents */}
            <div className={isGridView ? 'hidden' : 'block'}>
                {
                    loading ?
                        <ListSkeleton />
                        :
                        <TableView
                            sessions={sessions}
                            handleRedirect={handleRedirect}
                        // setLoading={setLoading}
                        />
                }
            </div>

            <div className="my-8 md:my-10 xl:my-12">

                <ShowPagination />
            </div>

        </div>
    );
};

export default AllSessionsPage;