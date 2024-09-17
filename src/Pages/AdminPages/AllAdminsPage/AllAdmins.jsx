import AnimatedPhotoFrame from "../../../Components/FramerMotion/AnimatedPhotoFrame";
import useGetAllUsersWithSameAttribute from "../../../CustomHooks/useGetAllUsersWithSameAttribute";

const AllAdmins = () => {

    const admins = useGetAllUsersWithSameAttribute('Administrator', 'all')
    return (
        <div className="min-h-screen border border-red-400">
            <h1 className="text-center text-xl font-bold my-6">ClassMate Admins</h1>

            <div className="relative h-full grid grid-cols-1 place-items-center ">
                {
                    admins?.map(admin =>
                        // 

                        <AnimatedPhotoFrame
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