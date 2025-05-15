import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  name: string
  username: string
  email: string
  password: string
  showPassword: boolean
  isNameFocused: boolean
  isUsernameFocused: boolean
  isEmailFocused: boolean
  isPasswordFocused: boolean
  nameError: string
  usernameError: string
  emailError: string
  passwordError: string
  accessToken: string | null
}

const initialState: AuthState = {
  name: '',
  username: '',
  email: '',
  password: '',
  showPassword: false,
  isNameFocused: false,
  isUsernameFocused: false,
  isEmailFocused: false,
  isPasswordFocused: false,
  nameError: '',
  usernameError: '',
  emailError: '',
  passwordError: '',
  accessToken: null,
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
      state.nameError = validateName(state.name)
      state.usernameError = validateUsername(state.username)
      state.emailError = validateEmail(state.email)
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
  toggleShowPassword,
  setEmailFocused,
  setPasswordFocused,
  validateForm,
  setAccessToken,
  resetForm,
  logout,
  setName,
  setUsername,
  setNameFocused,
  setUsernameFocused,
} = authSlice.actions

export default authSlice.reducer