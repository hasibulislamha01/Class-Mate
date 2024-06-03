
import 'react-datepicker/dist/react-datepicker.css'
import ClassAnimation from "../../../Components/AnimationComponents/ClassAnimation";
import Datefield from "../../../Components/Datefield/Datefield";

const CreateSession = () => {

    return (
        <div className="flex flex-col-reverse lg:flex-row justify-evenly items-center">
            <div>
                <ClassAnimation></ClassAnimation>
            </div>
            <div className="">
                <h1 className="text-center text-3xl my-6"> Create Session </h1>
                <form className="w-full flex flex-col items-center justify-center space-y-6">

                    <div className="w-full flex items-center gap-4">
                        <div className="input-container mx-auto">
                            <input
                                className=""
                                type="text"
                                name="sessionTitle"
                                required="required"
                            />
                            <label className="label">Session Title</label>
                        </div>

                        <div className="input-container mx-auto">
                            <input
                                className=""
                                type="number"
                                name="duration"
                                required="required"
                            />
                            <label className="label">Duration in hours</label>
                        </div>
                    </div>

                    <div className="w-full mx-auto big-input-container">
                        <textarea
                            name='description'
                            className=''
                            required
                        ></textarea>
                        <label className="label">Session Description</label>
                    </div>

                    <div className="flex items-center gap-4">
                        
                        <Datefield
                            name={'regStarts'}
                            label={'Registration Starts'}
                        ></Datefield>

                        <Datefield
                            name={'regEnds'}
                            label={'Registration Ends'}
                        ></Datefield>
                        
                    </div>

                    <div className="flex items-center gap-4">
                        
                        <Datefield
                            name={'classStarts'}
                            label={'Class Starts'}
                        ></Datefield>

                        <Datefield
                            name={'classEnds'}
                            label={'Class Ends'}
                        ></Datefield>

                    </div>




                    <button type="submit" className="btn btn-block">Create Session</button>
                </form>

            </div>
        </div>
    );
};

export default CreateSession;