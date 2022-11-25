import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.init';

const auth = getAuth(app);
export const AuthContext = createContext();
const UserContext = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const signup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (name, image) => updateProfile(auth.currentUser, {
        displayName: name, photoURL: image
    })
    const googleJoin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const githubJoin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }
    const logout = () => {
        localStorage.removeItem('token');
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const items = {
        user,
        setUser,
        loading,
        setLoading,
        signup,
        login,
        updateUser,
        googleJoin,
        githubJoin,
        logout
    }
    return (
        <div>
            <AuthContext.Provider value={items}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};
export default UserContext;

