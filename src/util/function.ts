export function convertLanguage(language: string): string {
	if (language === 'English') return 'en'
	else if (language === 'Russian') return 'ru'
	else if (language === 'Uzbek') return 'uz'
	return 'oz'
}

export function formatTimestamp(isoString: string) {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}