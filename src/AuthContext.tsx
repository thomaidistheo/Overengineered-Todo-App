import React, { useContext, useEffect, useState, createContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

// Create a context with a default value of null for the user state
const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user: currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
