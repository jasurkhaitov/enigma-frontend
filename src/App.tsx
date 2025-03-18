import { Route, Routes } from 'react-router-dom'
import MainPage from './page/browse/MainPage'
import HistoryPage from './page/browse/HistoryPage'
import NotFoundPage from './page/browse/NotFoundPage'
import PrivacyPolicyPage from './page/terms-agreement/PrivacyPolicyPage'
import ConsumerTermsPage from './page/terms-agreement/ConsumerTermsPage'
import UsagePolicyPage from './page/terms-agreement/UsagePolicyPage'
import LoginPage from './page/auth-flow/LoginPage'
import ProtectedRoute from './hooks/ProtectedRoute'
import SettingsPage from './page/browse/SettingsPage'
import RegisterPage from './page/auth-flow/RegisterPage'
import VerifyPage from './page/auth-flow/VerifyPage'
import ResestPasswordPage from './page/auth-flow/ResestPasswordPage'

export default function App() {
	return (
		<div className='font-onest'>
			<Routes>
				<Route path='*' element={<NotFoundPage />} />

				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/verify' element={<VerifyPage />} />
				<Route path='/reset-password' element={<ResestPasswordPage />} />

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
	)
}
