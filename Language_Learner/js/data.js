export const WORDS_PER_SESSION = 10;

export const ARABIC_DICTIONARY = [
    { arabic: 'كِتَاب', transcription: 'кітаб', translations: ['книга', 'книжка'] },
    { arabic: 'شَمْس', transcription: 'шамс', translations: ['сонце'] },
    { arabic: 'قَمَر', transcription: 'камар', translations: ['місяць'] },
    { arabic: 'مَاء', transcription: 'маа', translations: ['вода'] },
    { arabic: 'بَيْت', transcription: 'бейт', translations: ['дім', 'будинок'] },
    { arabic: 'صَدِيق', transcription: 'садік', translations: ['друг', 'товариш'] },
    { arabic: 'مَدِينَة', transcription: 'мадіна', translations: ['місто'] },
    { arabic: 'مَدْرَسَة', transcription: 'мадраса', translations: ['школа'] },
    { arabic: 'قَلَم', transcription: 'калам', translations: ['ручка', 'олівець'] },
    { arabic: 'سَلَام', transcription: 'салям', translations: ['мир'] },
    { arabic: 'بَحْر', transcription: 'бахр', translations: ['море'] },
    { arabic: 'نَجْم', transcription: 'наджм', translations: ['зірка', 'зоря'] }
];

export const PROFICIENCY_LEVELS = [
    {
        minRate: 0.9,
        code: 'C1',
        title: 'Просунутий рівень (Advanced)',
        description: 'Бездоганний результат! Ви вільно орієнтуєтеся у базовій арабській лексиці.'
    },
    {
        minRate: 0.7,
        code: 'B2',
        title: 'Вище середнього (Upper-Intermediate)',
        description: 'Чудове знання слів! Лише поодинокі неточності.'
    },
    {
        minRate: 0.5,
        code: 'B1',
        title: 'Середній рівень (Intermediate)',
        description: 'Непогана база, але варто повторити частину слів для закріплення.'
    },
    {
        minRate: 0.3,
        code: 'A2',
        title: 'Елементарний рівень (Elementary)',
        description: 'Ви знаєте окремі базові слова. Рекомендується переглянути словник і пройти тест знову.'
    },
    {
        minRate: 0,
        code: 'A1',
        title: 'Початківець (Beginner)',
        description: 'Ви тільки починаєте знайомство з арабською мовою. Скористайтеся словником-підказкою!'
    }
];