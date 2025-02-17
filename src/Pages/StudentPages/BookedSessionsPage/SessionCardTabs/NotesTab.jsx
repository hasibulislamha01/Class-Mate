import { Button } from "antd";
import { RiStickyNoteAddLine } from "react-icons/ri";
import Info from "../../../../Components/UI/TabCard/Info";
import useGetLatestData from "../../../../CustomHooks/useGetLatestData";
import PropTypes from "prop-types";
import ShowModal from "../../../../Components/UI/ShowModal/ShowModal";
import CreateNoteForm from "../../CreateNotePage/CreateNoteForm";


const NotesTab = ({ email, sessionId }) => {
    const [data] = useGetLatestData(`/notes/counts?studentEmail=${email}&bookedSessionId=${sessionId}`)
    console.log(data)
    return (
        <section className="grid grid-cols-2 gap-x-8 gap-y-5">

            <Info itemName={'Notes Created'} itemValue={data?.count || 0}></Info>

            <div className="flex flex-col items-start gap-2">
                <h3>Create a Note</h3>
                <ShowModal
                    controlButton={
                        <Button shape="circle" icon={<RiStickyNoteAddLine />} size="small"></Button>
                    }
                    modalContent={
                        <CreateNoteForm studentEmail={email} sessionId={sessionId}/>
                    }
                />
            </div>
        </section>
    )
}

NotesTab.propTypes = {
    email: PropTypes.string,
    sessionId: PropTypes.string
}

export default NotesTab
