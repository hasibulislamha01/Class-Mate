import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import CardSkeleton from "../../Components/Skeletons/CardSkeleton";
import ListSkeleton from "../../Components/Skeletons/ListSkeleton";
import GridView from "./GridView";
import { CiSearch } from "react-icons/ci";

const AllSessionsPage = () => {

    const axiosPublic = useAxiosPublic()
    const [isGridView, setIsGridView] = useState(true)
    const [sessions, setSessions] = useState([])
    const [loading, setLoading] = useState(true)
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

    return (
        <div className="min-h-screen py-16 md:py-24 container mx-auto">

            {/* page heading */}
            <h1 className="text-center font-bold text-xl lg:text-3xl">All sessions</h1>

            {/* controls */}
            <div className="my-10 flex items-center justify-center gap-32">

                <div>
                    sort & filter
                </div>


                {/* search field */}
                <div className="relative">
                    <input
                        className="input border border-primary focus:border-none focus:outline-primary rounded-full w-[300px]"
                        type="text"
                        placeholder="Search Sessions"
                    />
                    <CiSearch size={30} type="submit" className="absolute top-[20%] left-[85%]" />
                </div>

                <div>
                    <button className="btn" onClick={() => setIsGridView(true)}>Grid</button>
                    <button className="btn" onClick={() => setIsGridView(false)}>List</button>
                </div>
            </div>


            {/* grid contents */}
            {/* grid container */}
            <div className={isGridView ? 'block' : 'hidden'}>
                {
                    loading ?
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
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
                        <div>
                            listview
                        </div>
                }
            </div>

        </div>
    );
};

export default AllSessionsPage;