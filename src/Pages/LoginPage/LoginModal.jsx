
const LoginModal = () => {
    return (
        <div className="bg-accent dark:bg-dark-accent rounded-lg shadow-lg p-3 md:p-6 lg:p-10">

            <h1 className="text-lg font-bold">Please Fill up</h1>
            <p>Why I need to fill up the form</p>

            <form>

                <input
                    id="role"
                    name="role"
                    type="text"
                    placeholder="Enter your role in classMate"
                />
            </form>
        </div>
    );
};

export default LoginModal;