import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/Login/LoginPage'
import React, { useState } from 'react'
import { AuthProvider } from './AuthContext'
import { auth } from './firebase'
import { User } from 'firebase/auth'


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false)
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading 
      ? <h1>loading</h1>
      : <AuthProvider> 
          <Router>
            <Routes>
              <Route path="/" element={user ? <Homepage /> : <LoginPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      }
    </>
  );
}

export default App;
