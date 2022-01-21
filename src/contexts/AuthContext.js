import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) { 
                setCurrentUser(null)
            } else {
                setTimeout(() => {
                    axios.get(`${process.env.REACT_APP_BASE_URL}/profiles/email?email=${user.email}`)
                    .then(res => setCurrentUser(res.data))
                }, 1000)
                setLoading(false)
            }
        })

        return unsubscribe
    }, [])

    const value ={
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
