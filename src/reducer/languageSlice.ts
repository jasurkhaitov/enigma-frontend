import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LanguageState {
	sourceLanguage: string
	targetLanguage: string
}

const initialState: LanguageState = {
	sourceLanguage: 'English',
	targetLanguage: 'Uzbek',
}

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setSourceLanguage: (state, action: PayloadAction<string>) => {
			if (action.payload === state.targetLanguage) {
				const temp = state.sourceLanguage
				state.sourceLanguage = state.targetLanguage
				state.targetLanguage = temp
			} else {
				state.sourceLanguage = action.payload
			}
		},
		setTargetLanguage: (state, action: PayloadAction<string>) => {
			if (action.payload === state.sourceLanguage) {
				const temp = state.targetLanguage
				state.targetLanguage = state.sourceLanguage
				state.sourceLanguage = temp
			} else {
				state.targetLanguage = action.payload
			}
		},
		swapLanguages: state => {
			const temp = state.sourceLanguage
			state.sourceLanguage = state.targetLanguage
			state.targetLanguage = temp
		},
	},
})

export const { setSourceLanguage, setTargetLanguage, swapLanguages } =
	languageSlice.actions
export default languageSlice.reducer