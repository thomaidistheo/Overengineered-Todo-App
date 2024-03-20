import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"
import { db } from '../../firebase'
import { BaseBtn } from '../Buttons/Button'

import styles from './loginForm.module.scss'
import googleIcon from '../../assets/icons/google.webp'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const auth = getAuth()

    const validateEmail = (email: string) => {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regexPattern.test(email)
    }

    const handleSignInWithEmail = async () => {

        if (!validateEmail(email) || (email == '')) {
            setError('A valid email must be entered')
            return
        }
            
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setError('')
        } catch (error) {
            if (error instanceof Error) {
                console.error('There was an error while trying to sign in: ', error.message);
                setError('Failed to sign in. Please check your email and password.');
            }
        }
    }

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider() 

        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const userDocRef = doc(db, "Users", user.uid)
            const docSnap = await getDoc(userDocRef)
            
            if (!docSnap.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    name: user.displayName,
                    signUpDate: new Date(),
                    usage: 1,
                })
            } else {
                await updateDoc(userDocRef, {
                    lastLogin: new Date(),
                    usage: docSnap.data().usage + 1
                })
            }
        } catch (error) {
            console.log('Error signing in with Google: ', error)
        }
    }

    return (
        <div className={styles.loginCont}>
            <h2>Sign In</h2>
            {error && <p className={styles.errorMsg}>{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleSignInWithEmail() }}>
                <div className={styles.inputs}>
                    <div className={styles.inputCont}>
                        <label>Email</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.inputCont}>
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.btnCont}>
                    <BaseBtn 
                        buttonType=''
                        buttonText='Sign In'
                        onClick={() => handleSignInWithEmail}
                        disabled={false}
                    />
                    <button type="button" className={styles.googleBtn} onClick={handleSignInWithGoogle}>
                        <span className={styles.googleIconCont}>
                            <img src={googleIcon} alt="google" />
                        </span>
                        Sign In with Google
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm