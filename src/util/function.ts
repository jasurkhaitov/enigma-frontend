export function convertLanguage(language: string): string {
	if (language === 'English') return 'en'
	else if (language === 'Russian') return 'ru'
	else if (language === 'Uzbek') return 'uz'
	return 'oz'
}