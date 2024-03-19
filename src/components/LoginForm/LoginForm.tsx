import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth'
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
        if (!validateEmail(email)) {
            setError('A valid email must be entered')
        }  else {
            setError('')
        }

        fetchSignInMethodsForEmail(auth, email)
            .then(() => {
                setError('Account does not exist.')
            })
            .catch((error) => {
                console.error("There was an error while trying to sign in: ", error)
                setError("There was an error while trying to sign in")
            })
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignInWithEmail}>
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
                        onClick={handleSignInWithEmail}
                        disabled={false}
                    />
                    <button className={styles.googleBtn} onClick={handleSignInWithGoogle}>
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