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

            {/* form wrapper */}
            <div className="bg-accent dark:bg-dark-accent rounded-lg lg:w-1/2 mt-12 shadow-lg dark:shadow-dark-accent py-6 md:py-10 lg:py-12 px-6 md:px-8 lg:px-10">
                <h1 className="text-center text-xl my-4">Create Note</h1>
                <form onSubmit={handleSaveNote} className="space-y-4 flex flex-col justify-center items-center">
                    <div className="mx-auto w-full border">
                        <input
                            className="bg-slate-200/70 px-4 py-2 rounded-md outline-none border"
                            type="text"
                            name="title"
                            required="required"
                            placeholder="Enter Note Title"
                        />
                        <label className="label">Note Title</label>
                    </div>

                    <div className=" mx-auto">
                        <textarea
                            id=""
                            className="bg-slate-200/70 px-4 py-2 rounded-md outline-none border"
                            type="text"
                            name="description"
                            required="required"
                            placeholder="Write your Note here..."
                        >

                        </textarea>
                       
                        <label className="label">Note Description</label>
                    </div>
                    <button className="btn mx-auto w-[300px]">Create Note</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;