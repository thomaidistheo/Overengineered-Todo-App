import { useState } from 'react'

import LoginForm from "../../components/LoginForm/LoginForm"
import SignUpForm from '../../components/LoginForm/SignupForm'

import styles from './loginPage.module.scss'

export default function LoginPage() {
    const [form, setForm] = useState('signin')

    return (
        <div className={styles.loginPageCont}>
            {form == 'signup'
                ? (<>
                    <SignUpForm />
                    <div className={styles.switchPage}>
                        Already have an account? 
                        <button onClick={()=>setForm('signin')}>
                            Sign In
                        </button>
                    </div>
                </> )
                : (<>
                    <LoginForm />
                    <div className={styles.switchPage}>
                        Don't have an account? 
                        <button onClick={()=>setForm('signup')}>
                            Sign Up
                        </button>
                    </div>
                </>)
            }
            
        </div>
    )
}
