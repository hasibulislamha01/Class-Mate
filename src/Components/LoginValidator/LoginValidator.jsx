import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import PropTypes from "prop-types"

const LoginValidator = ({children}) => {

    const location = useLocation()
    const {user} = useAuth()
    console.log(user, location)

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