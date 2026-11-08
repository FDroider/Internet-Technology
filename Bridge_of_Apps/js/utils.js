export function validateLabUrl(rawUrl) {
    const trimmed = (rawUrl || '').trim();

    if (!trimmed) {
        return {
            isValid: false,
            message: 'Посилання на застосунок не вказано в data.js!'
        };
    }

    const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*|\.\.?\/[^\s]+)$/i;
    if (!urlPattern.test(trimmed)) {
        return {
            isValid: false,
            message: 'Некоректний формат URL-адреси у файлі data.js!'
        };
    }

    return {
        isValid: true,
        cleanedUrl: trimmed
    };
}
