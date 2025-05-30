import { useEffect, useState } from "react";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ListSkeleton from "../../Components/Skeletons/ListSkeleton";
import GridView from "./GridView";
import TableView from "./TableView";
import ShowPagination from "./ShowPagination";
import useGetLatestData from "../../CustomHooks/useGetLatestData";
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Input, Segmented, Select } from 'antd';
import useTodaysDate from "../../CustomHooks/useTodaysDate";
import useFormateDate from "../../CustomHooks/useFormateDate";
import { findSessions } from "./allSessions";

const { Search } = Input

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

    const [data] = useGetLatestData(`/sessions/bookable`)
    const [sessions, setSessions] = useState([])
    const [isGridView, setIsGridView] = useState(true)
    const [loading, setLoading] = useState(true)
    const todaysDate = useFormateDate(useTodaysDate())
    // console.log(data);

    const handleViewChange = () => {
        setIsGridView((prevState) => !prevState)
    }

    // collecting data from database
    useEffect(() => {
        if (data) {
            setSessions(data)
            setLoading(false)
        }
    }, [data])


    // filtering sessions according to their status
    const filterSessions = (query) => {
        console.log(`${query}`);
        if (query === 'active') {
            const displayableSessions = data?.filter(session => {
                const deadline = new Date(session.registrationEnds)
                const currentDate = new Date (todaysDate)
                // console.log(todaysDate, deadline, currentDate, currentDate <= deadline)
                return (currentDate <= deadline)
            })
            setSessions(displayableSessions)
        }
        else {
            setSessions(data)
        }
    }

    // searchSesions
    const searchSessions = (value) => {
        console.log("searching for", value)
        findSessions(value, sessions, setSessions)
    }


    return (
        <div className="min-h-screen container mx-auto py-16 md:py-24 bg-background dark:bg-dark-background text-text dark:text-dark-text transition-colors duration-300">

            {/* page heading */}
            <div className="text-center">
                <h1 className="font-semibold text-lg">All sessions</h1>
                <p className="text-sm">Find your desired session with manual search or browse yourself.</p>
            </div>

            {/* controls */}
            <div className="my-5 w-[95%] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

                {/* search field */}
                <Search
                    placeholder="Search here"
                    allowClear
                    enterButton='Search'
                    size="middle"
                    onSearch={searchSessions}
                />
                {/* <div className="font-semibold text-primary">
                    <Input size="medium" placeholder="Search Sessions" prefix={<SearchOutlined />} className="w-72" />
                    <button onClick={searchSessions()}>Search</button>
                </div> */}

                <div className="flex items-center gap-5">

                    <Select
                        defaultValue="all"
                        style={{
                            width: 180,
                        }}
                        onChange={filterSessions}
                        options={filterOptions}
                    />



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
                        <GridView sessions={sessions} />


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