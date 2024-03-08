import './firebase'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/Login/LoginPage'
import React, { useState } from 'react'
import { AuthProvider } from './AuthContext'
import { auth } from './firebase'
import { User } from 'firebase/auth'

import './app.scss';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] =  useState<string>('themeLight')

  const handleThemeChange = (themeSelect: string) => {
    console.log(themeSelect)
    setTheme(themeSelect)
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`app ${theme}`}>
      {isLoading 
      ? <h1>loading</h1>
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
