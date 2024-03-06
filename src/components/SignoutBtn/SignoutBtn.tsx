// src/components/SignOut.tsx
import React from 'react'
import { getAuth, signOut } from 'firebase/auth'

const SignOut: React.FC = () => {
    const auth = getAuth()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log('User signed out')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <div>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default SignOut
