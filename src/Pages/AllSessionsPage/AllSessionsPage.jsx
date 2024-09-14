import { useEffect, useState } from "react";
import dataCollection from '../../assets/fakeData.json'
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

const AllSessionsPage = () => {

    const axiosPublic = useAxiosPublic()
    const [isGridView, setIsGridView] = useState(true)
    console.log(isGridView);
    console.log(dataCollection);

    // collecting data from database
    // useEffect(()=> {
    //     const baseUrl = import.meta.env.
    //     axiosPublic.get()
    // }, [])

    return (
        <div className="min-h-screen py-16 md:py-24 container mx-auto">

            {/* page heading */}
            <h1 className="text-center font-bold text-xl lg:text-3xl">All sessions</h1>

            {/* controls */}
            <div className="my-10 flex items-center justify-between">

                <div>
                    sort & filter
                </div>

                <div>
                    search
                </div>

                <div>
                    <button className="btn" onClick={()=> setIsGridView(true)}>Grid</button>
                    <button className="btn" onClick={()=> setIsGridView(false)}>List</button>
                </div>
            </div>


            {/* grid contents */}
            {/* grid container */}
            <div className={isGridView ? 'grid' : 'hidden'}>
                grid contents
            </div>


            {/* list contents */}
            <div className={isGridView ? 'hidden': 'block'}>
                list contents
            </div>

        </div>
    );
};

export default AllSessionsPage;