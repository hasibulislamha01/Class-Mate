
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                    />
                    <label className="label">Last Name</label>
                </div>
                <div className="input-container">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                    />
                    <label className="label">Last Name</label>
                </div>
                <div className="input-container">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                    />
                    <label className="label">Last Name</label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default Login;