import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const MainPage = lazy(() => import('./page/main/MainPage'))
const HistoryPage = lazy(() => import('./page/main/HistoryPage'))
const NotFoundPage = lazy(() => import('./page/browse/NotFoundPage'))
const PrivacyPolicyPage = lazy(
	() => import('./page/terms-agreement/PrivacyPolicyPage')
)
const ConsumerTermsPage = lazy(
	() => import('./page/terms-agreement/ConsumerTermsPage')
)
const UsagePolicyPage = lazy(
	() => import('./page/terms-agreement/UsagePolicyPage')
)
const LoginPage = lazy(() => import('./page/auth-flow/LoginPage'))
const SettingsPage = lazy(() => import('./page/main/SettingsPage'))
const RegisterPage = lazy(() => import('./page/auth-flow/RegisterPage'))
const VerifyPage = lazy(() => import('./page/auth-flow/VerifyPage'))
const ResestPasswordPage = lazy(
	() => import('./page/auth-flow/ResestPasswordPage')
)
const BrowsePage = lazy(() => import('./page/browse/BrowsePage'))

import ProtectedRoute from './hooks/ProtectedRoute'
import GuestRoute from './hooks/GuestRoute'
import AnimatedLoader from './components/ui/icons/AnimatedLoader'
// const ChatPage = lazy(() => import('./page/browse/ChatPage'));

export default function App() {
	return (
		<div className='font-onest'>
			<Suspense
				fallback={
					<div className='w-full h-screen flex items-center justify-center'>
						<AnimatedLoader />
					</div>
				}
			>
				<Routes>
					<Route path='*' element={<NotFoundPage />} />

					<Route path='/' element={<BrowsePage />} />
					
					<Route element={<GuestRoute />}>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/verify' element={<VerifyPage />} />
						<Route path='/reset-password' element={<ResestPasswordPage />} />
					</Route>

					<Route element={<ProtectedRoute />}>
						<Route path='/dashboard' element={<MainPage />} />
						<Route path='/jobs' element={<HistoryPage />} />
						<Route path='/settings' element={<SettingsPage />} />
						{/* <Route path="/chat" element={<ChatPage />} /> */}
					</Route>

					<Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
					<Route path='/consumer-terms' element={<ConsumerTermsPage />} />
					<Route path='/usage-policy' element={<UsagePolicyPage />} />
				</Routes>
			</Suspense>
		</div>
	)
}
