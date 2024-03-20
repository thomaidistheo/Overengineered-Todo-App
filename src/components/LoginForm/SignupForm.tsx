import React, { useState } from 'react'
import { User, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, getAuth } from 'firebase/auth'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import { BaseBtn } from '../Buttons/Button'

import styles from './loginForm.module.scss'
import googleIcon from '../../assets/icons/google.webp'

const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const auth = getAuth()
    const db = getFirestore()
    const provider = new GoogleAuthProvider()

    const validateEmail = (email: string) => {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regexPattern.test(email)
    }

    const validatePassword = (password: string) => {
        const lengthCheck = password.length >= 8
        const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/g.test(password)
        const numberCheck = /[0-9]/g.test(password)
        return lengthCheck && symbolCheck && numberCheck
    }

    const isErrorWithMessage = (error: unknown): error is { message: string } => {
        return typeof error === 'object' && error !== null && 'message' in error
    }

    const handleSignUpWithEmail = async () => {
        if (!validateEmail(email)) {
            setError("A valid email must be entered")
            return
        } else {
            setError("")
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include one symbol and one number")
            return
        } else if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        } else {
            setError("")
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(db, "Users", user.uid), {
                email: email,
                signUpDate: new Date()
            })
            console.log("User signed up with email and password")
        } catch (error: unknown) {
            console.error(error)
            if (isErrorWithMessage(error)) {
                const errorMessage = error.message
                setError(errorMessage)
            } else {
                setError("An unexpected error occurred - Google Signup - 001")
            }
        }
    }

    const handleSignUpWithGoogle = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await signInWithPopup(auth, provider) as any
            const user: User = result.user

            if (result.additionalUserInfo?.isNewUser) {
                const userDocRef = doc(db, 'Users', user.uid)
                await setDoc(userDocRef, {
                    email: user.email,
                    signUpDate: new Date(),
                })
            }

            console.log("User signed up with Google")
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                const errorMessage = error.message
                setError(errorMessage)
            } else {
                setError("An unexpected error occured - Google Signup - 001")
            }
        }
    }

    return (
        <div className={styles.loginCont}>
            <h2>Sign Up</h2>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleSignUpWithEmail() }}>
                <div className={styles.inputs}>
                    <div className={styles.inputCont}>
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.inputCont}>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className={styles.inputCont}>
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.btnCont}>
                    <BaseBtn 
                        buttonType=''
                        buttonText='Sign Up'
                        onClick={handleSignUpWithEmail}
                        disabled={false}
                    />
                    <button className={styles.googleBtn} onClick={handleSignUpWithGoogle}>
                        <span className={styles.googleIconCont}>
                            <img src={googleIcon} alt="google" />
                        </span>
                        Sign Up with Google
                    </button>
                </div>
            </form>
            
        </div>
    )
}

export default SignUpForm
