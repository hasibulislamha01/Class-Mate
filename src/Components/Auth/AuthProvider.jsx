import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "./firebase.config";


export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const localTheme = localStorage.getItem('theme') || 'light'
    const auth = getAuth(app)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [theme, setTheme] = useState(localTheme)


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

    // login user with google
    const loginWithGoogle = async (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // login with github
    const loginWithGithub = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }


    // logout
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    // ------------------ theme toggler ---------------------------//
    const toggleTheme = () => {
        if (theme === 'light') { setTheme('dark') }
        if (theme === 'dark') { setTheme('light') }
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const authUtilities = {
        registerUser,
        loginUser,
        updateUserProfile,
        logoutUser,
        user,
        loading,
        loginWithGithub,
        loginWithGoogle,
        toggleTheme
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