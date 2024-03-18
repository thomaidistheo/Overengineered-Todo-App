import './firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/Login/LoginPage'
import React, { useState } from 'react'
import { AuthProvider } from './AuthContext'
import { db} from './firebase'
import { User, getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

import { changeTheme } from './dbOperations'

import './app.scss';
import Loader from './components/Loader/Loader'
function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] =  useState<string>('themeLight')
  
  const auth = getAuth()

  const handleThemeChange = async (themeSelect: string) => {
    console.log(themeSelect)
    
    if (!user) {
      console.log('User is not authenticated')
      return
    }

    try {
        await changeTheme(db, user, themeSelect)
        setTheme(themeSelect)
    } catch (error) {
        console.log('Error changing theme: ', error)
    }
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      setIsLoading(true)

      if (currentUser) {
        const userDocRef = doc(db, 'Users', currentUser.uid)

        try {
          const docSnap = await getDoc(userDocRef)

          if (docSnap.exists()) {
            const userData = docSnap.data()
            setTheme(userData.theme || 'themeLight')
          } else {
            console.log('user does not exist')
          }
        } catch (error) {
          console.log('Error fetching user data: ', error)
        }
      } else {
        setTheme('themeLight')
      }
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className={`app ${theme}`}>
      {isLoading 
      ? <Loader />
      : <AuthProvider> 
          <Router>
            <Routes>
              <Route path="/" element={user ? <Homepage handleThemeChange={handleThemeChange} /> : <LoginPage />} />
              <Route path="/login" element={!user ? <LoginPage /> : <Homepage handleThemeChange={handleThemeChange}/>} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      }
    </div>
  );
}

export default App;
