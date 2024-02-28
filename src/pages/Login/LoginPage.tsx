import { useState } from 'react'

import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from '../../components/SignupForm/SignupForm'

export default function LoginPage() {
    const [form, setForm] = useState('signin')

    return (
        <div>
            {form == 'signup'
                ? (<>
                    <SignUpForm />
                    <p>Already have an account? <button onClick={()=>setForm('signin')}>Sign In</button></p>
                </> )
                : (<>
                    <LoginForm />
                    <p>Don't have an account? <button onClick={()=>setForm('signup')}>Sign Up</button></p>
                </>)
            }
            
        </div>
    )
}
