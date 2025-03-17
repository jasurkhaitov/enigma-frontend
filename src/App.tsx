import { Route, Routes, Navigate } from 'react-router-dom'
import { useState } from 'react'

import MainPage from './page/browse/MainPage'
import HistoryPage from './page/browse/HistoryPage'
import NotFoundPage from './page/browse/NotFoundPage'

import PrivacyPolicyPage from './page/terms-agreement/PrivacyPolicyPage'
import ConsumerTermsPage from './page/terms-agreement/ConsumerTermsPage'
import UsagePolicyPage from './page/terms-agreement/UsagePolicyPage'

import LoginPage from './page/auth-flow/LoginPage'
import ProtectedRoute from './hooks/ProtectedRoute'
import { MyGlobalContext } from './hooks/useContext'
import SettingsPage from './page/browse/SettingsPage'
import RegisterPage from './page/auth-flow/RegisterPage'
import VerifyPage from './page/auth-flow/VerifyPage'
import ResestPasswordPage from './page/auth-flow/ResestPasswordPage'

export default function App() {
  const [login, setLogin] = useState<boolean>(!!localStorage.getItem("refreshToken"))

  return (
    <MyGlobalContext.Provider value={{ login, setLogin }}>
      <div className='font-onest'>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          
          <Route path='/login' element={login ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path='/register' element={login ? <Navigate to="/" replace /> : <RegisterPage />} />
          <Route path='/verify' element={login ? <Navigate to="/" replace /> : <VerifyPage />} />
          <Route path='/reset-password' element={login ? <Navigate to="/" replace /> : <ResestPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/jobs' element={<HistoryPage />} />
            <Route path='/settings' element={<SettingsPage />} />
          </Route>

          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/consumer-terms' element={<ConsumerTermsPage />} />
          <Route path='/usage-policy' element={<UsagePolicyPage />} />
        </Routes>
      </div>
    </MyGlobalContext.Provider>
  )
}