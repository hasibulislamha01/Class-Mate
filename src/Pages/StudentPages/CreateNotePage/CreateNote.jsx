import useAuth from "../../../CustomHooks/useAuth";
import DashboardHeading from "../../../Components/SharedComponents/DashboardComponents/DashboardHeading";
import CreateNoteForm from "./CreateNoteForm";



const CreateNote = () => {

    const { user } = useAuth()
    const studentEmail = user?.email

    

    return (
        <div>
            <DashboardHeading title={'Create Session'} subtitle={'Create a note of a session you have already booked'} />
            {/* form wrapper */}

            <CreateNoteForm studentEmail={studentEmail}/>

            {/* <div className="bg-sky-200 dark:bg-dark-accent rounded-lg w-[95%] md:w-[80%] lg:w-1/2 mx-auto mt-12 shadow-lg shadow-primary/15 dark:shadow-dark-accent py-6 md:py-10 lg:py-12 px-6 md:px-8 lg:px-10">

                <form  className="flex flex-col justify-center items-center gap-4 w-[75%] mx-auto">

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
            </div> */}
        </div>
    );
};

export default CreateNote;