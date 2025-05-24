import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  name: string
  username: string
  email: string
  password: string
  regPassword: string
  showPassword: boolean
  showRegPassword: boolean
  isNameFocused: boolean
  isUsernameFocused: boolean
  isEmailFocused: boolean
  isPasswordFocused: boolean
  isRegPasswordFocused: boolean
  nameError: string
  usernameError: string
  emailError: string
  passwordError: string
  regPasswordError: string
  accessToken: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  name: '',
  username: '',
  email: '',
  password: '',
  regPassword: '',
  showPassword: false,
  showRegPassword: false,
  isNameFocused: false,
  isUsernameFocused: false,
  isEmailFocused: false,
  isPasswordFocused: false,
  isRegPasswordFocused: false,
  nameError: '',
  usernameError: '',
  emailError: '',
  passwordError: '',
  regPasswordError: '',
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: false,
}

const validateName = (name: string): string => {
  if (!name) return 'Name is required'
  if (name.length < 3) return 'Name must be at least 3 characters'
  return ''
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

const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email is required'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address'
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
      state.emailError = validateEmail(action.payload)
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
      state.passwordError = validatePassword(action.payload)
    },
    setRegPassword: (state, action: PayloadAction<string>) => {
      state.regPassword = action.payload
      state.regPasswordError = validatePassword(action.payload)
    },
    toggleShowPassword: state => {
      state.showPassword = !state.showPassword
    },
    toggleShowRegPassword: state => {
      state.showRegPassword = !state.showRegPassword
    },
    setEmailFocused: (state, action: PayloadAction<boolean>) => {
      state.isEmailFocused = action.payload
    },
    setPasswordFocused: (state, action: PayloadAction<boolean>) => {
      state.isPasswordFocused = action.payload
    },
    setRegPasswordFocused: (state, action: PayloadAction<boolean>) => {
      state.isRegPasswordFocused = action.payload
    },
    validateForm: state => {
      state.nameError = validateName(state.name)
      state.usernameError = validateUsername(state.username)
      state.emailError = validateEmail(state.email)
      state.passwordError = validatePassword(state.password)
      state.regPasswordError = validatePassword(state.regPassword)
    },
    resetForm: () => {
      return {
        ...initialState,
        accessToken: localStorage.getItem('accessToken'),
        isAuthenticated: initialState.isAuthenticated
      }
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem('accessToken', action.payload)
      state.accessToken = action.payload
      state.isAuthenticated = true
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    logout: state => {
      localStorage.removeItem('accessToken')
      state.accessToken = null
      state.isAuthenticated = false
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
      state.nameError = validateName(action.payload)
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      state.usernameError = validateUsername(action.payload)
    },
    setNameFocused: (state, action: PayloadAction<boolean>) => {
      state.isNameFocused = action.payload
    },
    setUsernameFocused: (state, action: PayloadAction<boolean>) => {
      state.isUsernameFocused = action.payload
    },
  },
})

export const {
  setEmail,
  setPassword,
  setRegPassword,
  toggleShowPassword,
  toggleShowRegPassword,
  setEmailFocused,
  setPasswordFocused,
  setRegPasswordFocused,
  validateForm,
  setAccessToken,
  setAuthenticated,
  resetForm,
  logout,
  setName,
  setUsername,
  setNameFocused,
  setUsernameFocused,
} = authSlice.actions

export default authSlice.reducer