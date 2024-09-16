import OrbitingPhotoFrame from "../../../Components/FramerMotion/OrbitingPhotoFrame";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";

const AllAdmins = () => {

    const admins = useGetAllUsersWithSameAttribute('Administrator', 'all')
    return (
        <div className="min-h-screen border border-red-400">
            <h1 className="text-center text-xl font-bold my-6">ClassMate Admins</h1>

            <div className="relative h-full grid grid-cols-1 place-items-center border border-fuchsia-500">
                {
                    admins?.map(admin =>
                        // 

                        <OrbitingPhotoFrame
                            key={admin._id}
                            src={admin.userPhoto}
                            alt={'admin image'}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default AllAdmins;