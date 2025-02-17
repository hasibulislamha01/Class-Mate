import useAuth from "../../../CustomHooks/useAuth";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import useGetLatestData from "../../../CustomHooks/useGetLatestData";
import { Card } from "antd";



const MyNotes = () => {

    const { user } = useAuth()
    const studentEmail = user?.email
    const [data] = useGetLatestData(`/notes?studentEmail=${studentEmail}`)
    console.log(data)



    return (
        <section>
            <DashboardHeading
                title={'My Notes'}
                subtitle={'The notes you have created appear here'}
            />

            <div className="grid grid-cols-1 gap-8">
                {
                    data?.map(note =>
                        <Card
                            key={note._id}
                            title={note.noteTitle}
                            className="shadow-lg hover:shadow-primary/30"
                        >
                            <p className="whitespace-pre-wrap">

                                {note.noteDescription}
                            </p>
                        </Card>
                    )
                }
            </div>

        </section>
    );
};

export default MyNotes;