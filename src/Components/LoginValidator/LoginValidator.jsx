import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import PropTypes from "prop-types"

const LoginValidator = ({children}) => {

    const location = useLocation()
    const {user, loading} = useAuth()
    console.log(user, location)

    
    if (loading) {
        return (
            <div className="mt-12 md:mt-20 flex justify-center items-center">
                <div className="w-40 mx-auto loading loading-spinner text-warning"></div>
            </div>
        )
    }

    
    if(user){
        return children
    }

    return (
        <Navigate to='/login' state={location.pathname}></Navigate>
    );
};

LoginValidator.propTypes = {
    children: PropTypes.node
}

export default LoginValidator;