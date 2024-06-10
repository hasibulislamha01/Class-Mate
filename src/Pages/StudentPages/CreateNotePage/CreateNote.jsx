import Swal from "sweetalert2";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const CreateNote = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const studentEmail = user?.email

    const handleSaveNote = (event) => {
        event.preventDefault()
        const form = event.target
        const noteTitle = form.title.value
        const noteDescription = form.description.value
        const note = {
            noteTitle,
            noteDescription,
            studentEmail
        }
        console.log(note)
        axiosSecure.post('/notes', note)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Created",
                        text: "You created a note!",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    return (
        <div>
            <h1 className="text-center text-3xl mb-12">Create Note</h1>
            <form onSubmit={handleSaveNote} className="space-y-4 flex flex-col justify-center items-center">
                <div className="input-container mx-auto">
                    <input
                        className=""
                        type="text"
                        name="title"
                        required="required"
                    />
                    <label className="label">Note Title</label>
                </div>

                <div className="input-container mx-auto">
                    <input
                        className=""
                        type="text"
                        name="description"
                        required="required"
                    />
                    <label className="label">Note Description</label>
                </div>
                <button className="btn mx-auto w-[300px]">Create Note</button>
            </form>
        </div>
    );
};

export default CreateNote;