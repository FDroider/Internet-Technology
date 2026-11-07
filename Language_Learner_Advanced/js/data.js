export const WORDS_PER_SESSION = 10;

export const DIFFICULTY_LEVELS = {
    beginner: {
        id: 'beginner',
        label: 'Початковий',
        badgeText: 'Початковий рівень',
        description: 'Базова повсякденна лексика'
    },
    intermediate: {
        id: 'intermediate',
        label: 'Середній',
        badgeText: 'Середній рівень',
        description: 'Розширена лексика та основні поняття'
    },
    advanced: {
        id: 'advanced',
        label: 'Високий',
        badgeText: 'Високий рівень',
        description: 'Абстрактні поняття та складна лексика'
    }
};

export const ARABIC_DICTIONARY = [
    { arabic: 'كِتَاب', transcription: 'кітаб', translations: ['книга', 'книжка'], difficulty: 'beginner' },
    { arabic: 'شَمْس', transcription: 'шамс', translations: ['сонце'], difficulty: 'beginner' },
    { arabic: 'قَمَر', transcription: 'камар', translations: ['місяць'], difficulty: 'beginner' },
    { arabic: 'مَاء', transcription: 'маа', translations: ['вода'], difficulty: 'beginner' },
    { arabic: 'بَيْت', transcription: 'бейт', translations: ['дім', 'будинок'], difficulty: 'beginner' },
    { arabic: 'صَدِيق', transcription: 'садік', translations: ['друг', 'товариш'], difficulty: 'beginner' },
    { arabic: 'مَدِينَة', transcription: 'мадіна', translations: ['місто'], difficulty: 'beginner' },
    { arabic: 'مَدْرَسَة', transcription: 'мадраса', translations: ['школа'], difficulty: 'beginner' },
    { arabic: 'قَلَم', transcription: 'калам', translations: ['ручка', 'олівець'], difficulty: 'beginner' },
    { arabic: 'سَلَام', transcription: 'салям', translations: ['мир'], difficulty: 'beginner' },
    { arabic: 'بَحْر', transcription: 'бахр', translations: ['море'], difficulty: 'beginner' },
    { arabic: 'نَجْم', transcription: 'наджм', translations: ['зірка', 'зоря'], difficulty: 'beginner' },

    { arabic: 'عِلْم', transcription: 'ільм', translations: ['знання', 'наука'], difficulty: 'intermediate' },
    { arabic: 'حُرِّيَّة', transcription: 'хуррійя', translations: ['свобода', 'воля'], difficulty: 'intermediate' },
    { arabic: 'مُسْتَقْبَل', transcription: 'мустакбаль', translations: ['майбутнє'], difficulty: 'intermediate' },
    { arabic: 'سَفَر', transcription: 'сафар', translations: ['подорож', 'мандрівка'], difficulty: 'intermediate' },
    { arabic: 'سَعَادَة', transcription: 'саада', translations: ['щастя'], difficulty: 'intermediate' },
    { arabic: 'عَمَل', transcription: 'амаль', translations: ['робота', 'праця'], difficulty: 'intermediate' },
    { arabic: 'عَائِلَة', transcription: 'аіля', translations: ['сім\'я', 'родина'], difficulty: 'intermediate' },
    { arabic: 'صِحَّة', transcription: 'сіхха', translations: ['здоров\'я'], difficulty: 'intermediate' },
    { arabic: 'ثَقَافَة', transcription: 'сакафа', translations: ['культура'], difficulty: 'intermediate' },
    { arabic: 'تَارِيخ', transcription: 'таріх', translations: ['історія'], difficulty: 'intermediate' },
    { arabic: 'حَقِيقَة', transcription: 'хакіка', translations: ['правда', 'істина'], difficulty: 'intermediate' },
    { arabic: 'وَقْت', transcription: 'вакт', translations: ['час'], difficulty: 'intermediate' },

    { arabic: 'فَلْسَفَة', transcription: 'фальсафа', translations: ['філософія'], difficulty: 'advanced' },
    { arabic: 'عَدَالَة', transcription: 'адаля', translations: ['справедливість'], difficulty: 'advanced' },
    { arabic: 'اِسْتِقْلَال', transcription: 'істікляль', translations: ['незалежність'], difficulty: 'advanced' },
    { arabic: 'مَسْؤُولِيَّة', transcription: 'масулійя', translations: ['відповідальність'], difficulty: 'advanced' },
    { arabic: 'حَضَارَة', transcription: 'хадара', translations: ['цивілізація'], difficulty: 'advanced' },
    { arabic: 'إِبْدَاع', transcription: 'ібда', translations: ['творчість', 'креативність'], difficulty: 'advanced' },
    { arabic: 'إِنْجَاز', transcription: 'інджаз', translations: ['досягнення', 'здобуток'], difficulty: 'advanced' },
    { arabic: 'إِلْهَام', transcription: 'ільхам', translations: ['натхнення'], difficulty: 'advanced' },
    { arabic: 'وَعْي', transcription: 'вай', translations: ['свідомість'], difficulty: 'advanced' },
    { arabic: 'حِكْمَة', transcription: 'хікма', translations: ['мудрість'], difficulty: 'advanced' },
    { arabic: 'تَعَاوُن', transcription: 'таавун', translations: ['співпраця'], difficulty: 'advanced' },
    { arabic: 'تَطَوُّر', transcription: 'татаввур', translations: ['розвиток', 'еволюція'], difficulty: 'advanced' }
];

export const PROFICIENCY_LEVELS = [
    {
        minRate: 0.9,
        code: 'C1',
        title: 'Просунутий рівень (Advanced)',
        description: 'Бездоганний результат! Ви вільно орієнтуєтеся у вибраній арабській лексиці.'
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
        description: 'Ви знаєте окремі слова цього рівня. Рекомендується переглянути словник і пройти тест знову.'
    },
    {
        minRate: 0,
        code: 'A1',
        title: 'Початківець (Beginner)',
        description: 'Варто приділити більше уваги вивченню слів. Скористайтеся словником-підказкою!'
    }
];
