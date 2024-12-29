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
            <div className="bg-sky-200 dark:bg-dark-accent rounded-lg w-[95%] md:w-[80%] lg:w-1/2 mx-auto mt-12 shadow-lg shadow-primary/15 dark:shadow-dark-accent py-6 md:py-10 lg:py-12 px-6 md:px-8 lg:px-10">
                <h1 className="text-center text-xl my-4">Create Note</h1>
                <form onSubmit={handleSaveNote} className="flex flex-col justify-center items-center gap-4 w-[75%] mx-auto">
                    
                    <div className="mx-auto form-control gap-1 w-full">
                        <label className="">Note Title</label>
                        <input
                            className="input-box bg-background"
                            type="text"
                            name="title"
                            required="required"
                            placeholder="Enter Note Title"
                        />
                    </div>

                    <div className=" mx-auto form-control gap-1 w-full">
                        <label className="">Note Description</label>
                        <textarea
                            id=""
                            className="textarea-box bg-background"
                            type="text"
                            name="description"
                            required="required"
                            placeholder="Write your Note here..."
                        >

                        </textarea>
                       
                    </div>
                    <button className="mt-6 btn mx-auto w-[300px] bg-primary/70 text-accent border-none">Create Note</button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;