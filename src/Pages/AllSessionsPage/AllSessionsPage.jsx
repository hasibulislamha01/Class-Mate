import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ListSkeleton from "../../Components/Skeletons/ListSkeleton";
import GridView from "./GridView";
import { CiSearch } from "react-icons/ci";
import Select from 'react-select'
import { CiGrid41 } from "react-icons/ci";
import { CiViewTable } from "react-icons/ci";
import TableView from "./TableView";
import { useNavigate } from "react-router-dom";



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

    const axiosPublic = useAxiosPublic()
    const [isGridView, setIsGridView] = useState(true)
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
    // const [showLatest, setShowLatest] = useState(false)
    // const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRedirect = (link) => {
        console.log('hitttted');
        // setLoading(true)
        navigate(link)
    }
    // console.log(isGridView);
    console.log(sessions);

    // collecting data from database
    useEffect(() => {
        axiosPublic.get('/sessions')
            .then(res => {
                setSessions(res?.data)
                setLoading(false)
            })
            .catch(error => console.error(`error loading session data : `, error?.message))
    }, [axiosPublic])


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
            <h1 className="text-center font-bold text-xl lg:text-3xl">All sessions</h1>

            {/* controls */}
            <div className="my-10 flex flex-col md:flex-row items-center justify-center gap-32">

                <div>
                    <Select
                        options={filterOptions}
                        placeholder={'Filter Sessions'}
                        className="w-[200px]"
                        onChange={(e) => handleSort(e.value)}
                    />
                </div>


                {/* search field */}
                <div className="relative font-semibold text-primary">
                    <input
                        className="input border border-primary focus:border-none focus:outline-primary rounded-full w-[300px]"
                        type="text"
                        placeholder="Search Sessions"
                    />
                    <CiSearch fill="#1D8BD5" size={30} type="submit" className="absolute top-[20%] left-[85%]" />
                </div>

                {/* view controls */}
                <div className="flex items-center rounded-full border border-sky-200">

                    <div
                        className={`py-2 px-4 rounded-l-full transition-all duration-500 cursor-pointer ${isGridView ? 'bg-sky-200' : 'bg-base-100'}`}
                        onClick={() => setIsGridView(true)}
                    >
                        <CiGrid41 size={20} />
                    </div>
                    <div
                        className={`py-2 px-4 rounded-r-full transition-all duration-500 cursor-pointer ${!isGridView ? 'bg-sky-200' : 'bg-base-100'}`}
                        onClick={() => setIsGridView(false)}
                    >
                        <CiViewTable size={20} />
                    </div>
                </div>
            </div>


            {/* grid contents */}
            {/* grid container */}
            <div className={isGridView ? 'block mx-auto' : 'hidden'}>
                {
                    loading ?
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
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

            <div className="mt-10 w-full border border-red-400">
                pagination
            </div>

        </div>
    );
};

export default AllSessionsPage;