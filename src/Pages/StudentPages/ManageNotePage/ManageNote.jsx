import useAuth from "../../../CustomHooks/useAuth";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import ManageNoteCard from "./ManageNoteCard";

const ManageNote = () => {

    const {user} = useAuth()
    const studentEmail = user?.email
    const query = useGetLatestData('getNotes', `/notes/${studentEmail}`)
    const notes = query[0]
    console.log(notes)
    console.log(query)

    return (
        <div>
            <h1 className="text-center text-xl text-primary font-bold my-6 ">Manage Notes</h1>
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