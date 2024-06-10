import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "./firebase.config";


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    const [loading, setLoading] = useState(false)
    

    // user observer
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
                console.log("user in auth status : ", user)
            } else {
                setUser(null)
                setLoading(false)
                console.log("user in auth status : ", user)
            }
        });
    }, [auth, user])

    // Register user
    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login users
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user profile
    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }


    // logout
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const authUtilities = {
        registerUser,
        loginUser,
        updateUserProfile,
        logoutUser,
        user,
        loading
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