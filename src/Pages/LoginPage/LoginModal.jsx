import SelectItems from '../../Components/SelectItems/SelectItems';
import useAuth from '../../CustomHooks/useAuth';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';


const roleOptions = [
    { value: 'Student', label: 'Student' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Administrator', label: 'Administrator' },
]

const sexOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
]

const LoginModal = () => {

    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const gender = form.sex.value;
        const role = form.role.value;
        const phone = form.phone.value;
        const userEmail = user?.email;
        const userData = {gender, role, phone, userEmail}
        console.log(userData);

        axiosPublic.put(`/users/${userEmail}`, userData)
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] md:w-[60%] lg:w-[40%] p-3 md:p-6 lg:p-10 mx-auto bg-primary dark:bg-dark-accent rounded-lg shadow-lg ">

            <h1 className="text-accent text-lg font-bold text-center">You are missing out</h1>
            <p className="text-center text-text dark:text-dark-text/50">Fill up the form</p>

            <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-3 max-w-60 mx-auto py-4'>

                <SelectItems
                    title={'Select Your Role'}
                    options={roleOptions}
                    name={'role'}
                />

                <SelectItems
                    title={'Select Your Sex'}
                    options={sexOptions}
                    name={'sex'}
                />

                <input
                    id="phone"
                    name="phone"
                    type="number"
                    placeholder="Enter Phone Number"
                />

                <button className='btn'>Submit</button>

            </form>
        </div>
    );
};


export default LoginModal;