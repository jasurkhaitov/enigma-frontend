import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
	email: string
	password: string
	showPassword: boolean
	isEmailFocused: boolean
	isPasswordFocused: boolean
	emailError: string
	passwordError: string
	accessToken: string | null
}

const initialState: AuthState = {
	email: '',
	password: '',
	showPassword: false,
	isEmailFocused: false,
	isPasswordFocused: false,
	emailError: '',
	passwordError: '',
	accessToken: null,
}

const validateUsername = (username: string): string => {
	if (!username) {
		return 'Username is required'
	}

	if (username.length < 4) {
		return 'Username must be at least 4 characters'
	}

	if (!/^[a-zA-Z0-9._]+$/.test(username)) {
		return 'Username can only contain letters, numbers, dots, and underscores'
	}

	return ''
}

const validatePassword = (password: string): string => {
	if (!password) {
		return 'Password is required'
	}

	if (password.length < 8) {
		return 'Password must be at least 8 characters'
	}

	if (!/[a-z]/.test(password)) {
		return 'Password must contain at least one lowercase letter'
	}

	if (!/[0-9]/.test(password)) {
		return 'Password must contain at least one number'
	}

	return ''
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload
			state.emailError = validateUsername(action.payload)
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
			state.passwordError = validatePassword(action.payload)
		},
		toggleShowPassword: state => {
			state.showPassword = !state.showPassword
		},
		setEmailFocused: (state, action: PayloadAction<boolean>) => {
			state.isEmailFocused = action.payload
		},
		setPasswordFocused: (state, action: PayloadAction<boolean>) => {
			state.isPasswordFocused = action.payload
		},
		validateForm: state => {
			state.emailError = validateUsername(state.email)
			state.passwordError = validatePassword(state.password)
		},
		resetForm: () => {
			return initialState
		},
		setAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload
		},
		logout: state => {
			state.accessToken = null
		},
	},
})

export const {
	setEmail,
	setPassword,
	toggleShowPassword,
	setEmailFocused,
	setPasswordFocused,
	validateForm,
	setAccessToken,
	resetForm,
	logout,
} = authSlice.actions

export default authSlice.reducer
