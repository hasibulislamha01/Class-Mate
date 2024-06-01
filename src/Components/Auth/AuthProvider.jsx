import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebase.config";


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)

    // user observer
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                console.log("user in auth status : ", user)
            } else {
                setUser(null)
                console.log("user in auth status : ", user)
            }
        });
    }, [auth, user])

    // Register user
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login users
    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user profile
    const updateProfile = (userName, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: userName, 
            photoURL: photo,
        }).then(() => {
            console.log('user has been updated', userName, photo)
        }).catch((error) => {
            console.error(error.message)
        });
    }


    // logout
    const logoutUser = () => {
        return signOut(auth)
    }

    const authUtilities = {
        registerUser,
        loginUser,
        updateProfile,
        logoutUser,
        user,
    }
    return (
        <AuthContext.Provider value={authUtilities}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;