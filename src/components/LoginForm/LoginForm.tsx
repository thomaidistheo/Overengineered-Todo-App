import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth'

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = getAuth();

    const validateEmail = (email: string) => {
        const regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexPattern.test(email);
    };

    const handleSignInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                console.error("There was an error while trying to sign in: ", error);
                setError("There was an error while trying to sign in")
            });
    }

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider() 

        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            console.log('Logged in user: ', user)
        } catch (error) {
            console.log('Error signing in with Google: ', error)
        }
    }

    return (
        <div>
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignInWithEmail}>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign In with Email</button>
            </form>
            <button onClick={handleSignInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export default LoginForm