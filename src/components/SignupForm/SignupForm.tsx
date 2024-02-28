import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const SignUpForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();
    const db = getFirestore();

    const validateEmail = (email: string) => {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexPattern.test(email);
    };

    const validatePassword = (password: string) => {
        const lengthCheck = password.length >= 8;
        // Updated regex to include a check for at least one digit (0-9)
        const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/g.test(password);
        const numberCheck = /[0-9]/g.test(password);
        return lengthCheck && symbolCheck && numberCheck;
    };

    const handleSignUpWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("A valid email must be entered");
            return;
        } else {
            setError("");
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters long and include one symbol and one number");
            return;
        } else {
            setError("");
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        } else {
            setError("");
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "Users", user.uid), {
                email: email,
                signUpDate: new Date()
            });

            console.log("User signed up with email and password");
        } catch (error: unknown) {
            setError(error.message);
        }
    };

    const handleSignUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (result.additionalUserInfo?.isNewUser) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    signUpDate: new Date()
                });
            }

            console.log("User signed up with Google");
        } catch (error: unknown) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignUpWithEmail}>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign Up with Email</button>
            </form>
            <button onClick={handleSignUpWithGoogle}>Sign Up with Google</button>
        </div>
    );
};

export default SignUpForm;
