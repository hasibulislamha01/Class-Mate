import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import ManageNoteCard from "./ManageNoteCard";

const ManageNote = () => {

    const {user} = useAuth()
    const studentEmail = user?.email
    const query = useGetLatestData(`/notes/${studentEmail}`)
    const notes = query[0]
    console.log(notes)
    console.log(query)

    return (
        <div>
            <DashboardHeading title={'Manage Notes'} subtitle={'The notes that you have created appear here'} />
            <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center">
                {
                    notes?.map(note => 
                        <ManageNoteCard
                            key={note._id}
                            note={note}
                        ></ManageNoteCard>
                    )
                }
            </div>
        </div>
    );
};

export default ManageNote;