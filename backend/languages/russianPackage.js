const russianPackage = {
    navBar: {
        main: 'Learn Math',
        hints: 'Подсказки',
        topScores: 'Отличники',
        profile: 'Профиль',
        schools: 'Уроки'
    },
    navMenu: {
        trigger: 'Меню',
        userStatus: 'пользователь',
        userStatusLocal: 'Локальный',
        userStatusOnline: 'Облачный',
        userStatusNegative: 'Пользователь не подключен!',
        signUp: 'Записаться',
        signIn: 'Подключиться',
        signOut: 'Отключиться',
        mode: 'Темная Тема',
        languages: {
            trigger: 'Языки',
            en: 'Анг.',
            he: 'Ивр.',
            ru: 'Рус.'
        },
        settings: {
            trigger: 'Настройка Уроков',
        },
        position: {
            trigger: 'Положение Меню',
            top: 'Сверху',
            bottom: 'Снизу',
            right: 'Справа',
            left: 'Слева'
        }
    },
    topScores: {
        topScoresTitle: 'ОТЛИЧНИКИ',
        progressTitle: 'ОЦЕНКИ',
        share: 'Опубликовать мои оценки',
        remove: 'Убрать мои оценки из отличников',
        compare: 'Сравнить оценки',
        empty: 'Ой! Что-то пошло не так, а может никто не опубликовал оценок.'
    },
    schools: {
        schoolsTopicTitle: 'Темы для Урока',
        innerTitle: 'Выбери тему которую хочешь решить!',
        elementarySchool: 'Младший Класс',
        highSchool: 'Старший Класс'
    },
    profile: {
        profileTitle: 'Профиль',
        progressTitle: 'Оценки',
        elementarySchool: 'Младший Класс',
        highSchool: 'Старший Класс',
        share: 'Опубликовать мои оценки',
        remove: 'Удалить мои оценки из отличников',
        convert: 'Конвертировать в онлайн пользователя',
        delete: 'Удалить пользователя',
        edit: 'Редактировать профиль'
    },
    hints: {
        hintsTitle: 'Подсказки',
        schoolsTopicTitle: 'Темы для Урока',
        elementarySchool: 'Младший Класс',
        highSchool: 'Старший Класс',
        teach: 'Обсуди с учителем!',
        placeholder: 'Спроси учителя!',
        limitation: 'Максимум 350 знаков',
        user: 'Пользователь:',
        teacher: 'Учитель:',
        teacherWelcome: 'Это чат с виртуальным учителем! Спрашивай его о математических темах, и о примерах с которыми не справляешься!',
        teacherWait: 'Пожалуйста, подождите ответа учителя...',
    },
    exercise: {
        title: 'Тема',
        explanation: 'Решай примеры, чтобы получить оценку! (Максимум 100 баллов)',
        done: 'Сдать',
    },
    sign: {
        inTitle: 'ПОДКЛЮЧИТЬСЯ',
        upTitle: 'ЗАПИСАТЬСЯ',
        resetTitle: 'СБРОСИТЬ ПАРОЛЬ ',
        send: 'ОТПРАВИТЬ',
        signUp: 'ЗАПИСАТЬСЯ!',
        signUpLabel: 'Нет аккаунта?',
        signIn: 'ПОДКЛЮЧИТЬСЯ!',
        signInLabel: 'Вернутся к подключению!',
        forgotPass: 'СБРОСИТЬ!',
        forgotPassLabel: 'Забыли пароль?',
        offline: 'ЛОКАЛЬНЫЙ ПОЛЬЗОВАТЕЛЬ?',
        offlineExp: ('Чтоб создать локальный аккаунт, почта и пароль не нужны. ' +
            'Пользователь будет сохранен в печеньках вашего браузера, на неделю. ' +
            'Если вы отключитесь от аккаунта или удалите печеньки, то аккаунт' +
            ' удалиться тоже. Если не хотите терять аккаунт, то обдумайте онлайн' +
            ' регистрацию.'
        ),
        secretPlaceholder: 'Здесь ваш секретный вопрос',
    },
    statics: {
        aiNote: 'Изображения сделаны с помощью НС',
        error: {
            noUser: 'Пользователь',
            listMissing: 'Чего-то не хватает... может списка?',
            exerciseMissing: 'Ой... похоже, что-то не так. Проверь интеренет и обнови страницу.',
            shortDescMissing: 'Обьяснение отсутствует',
        },
        confirmation: {
            question: 'Вы уверены?',
            true: 'Да, я уверен/а!',
            false: 'Нет, подождите!'
        },
        user: {
            name: 'Имя',
            email: 'Почта',
            password: 'Пароль',
            newPassword: 'Новый Пароль',
            confPassword: 'Подтвердите пароль',
            status: 'Состояние',
            statusTrue: 'Облачный',
            statusFalse: 'Локальный',
            shared: 'Оценки',
            sharedTrue: 'Опубликованы',
            sharedFalse: 'Скрыты',
            secret: 'Секретный вопрос',
            answer: 'Секретный ответ'
        },
        topics: {
            sum_substract: 'сложение вычитание',
            multiply_divide: 'умножение деление',
            mixed: 'смешанные примеры',
            power_root: 'корень степень',
            fraction_fractionMixed: 'дроби',
            forms_sizes: 'формы',
            exam_basic: 'базовый экз.',
            equasions_basic: 'обычные уровнения',
            equations_two_more: 'двойные уровнения',
            verbal_problems: 'задачи',
            geometry: 'геометрия',
            quadratic_equation: 'кривое уравнение',
            circles: 'круги',
            exam_advanced: 'продвинутый экз.'
        },
        shortDesc: {
            sum_substract: '',
            multiply_divide: '',
            mixed: 'Смешаные примеры включают в себя, сложение и вычитание вместе с умножением и делением.',
            power_root: '',
            fraction_fractionMixed: '',
            forms_sizes: '',
            exam_basic: 'Базовый экзамен, включает в себя все темы из младшей школы.',
            equasions_basic: '',
            equations_two_more: '',
            verbal_problems: '',
            geometry: '',
            quadratic_equation: '',
            circles: '',
            exam_advanced: 'Продвинутый экзамен, включает в себя все темы из старшей школы и так-же несколко тем из младшей школы.'
        },
        longDesc: {
            sum_substract: '',
            multiply_divide: '',
            mixed: '',
            power_root: '',
            fraction_fractionMixed: '',
            forms_sizes: '',
            exam_basic: ('Базовый экзамен, включает в себя все темы из младшей школы такие как, сложение и вычитание, ' +
                'умножение и деление, смешанные примеры, корни и степени, дроби и формы.'),
            equasions_basic: '',
            equations_two_more: '',
            verbal_problems: '',
            geometry: '',
            quadratic_equation: '',
            circles: '',
            exam_advanced: ('Продвинутый экзамен, включает в себя все темы из старшей школы такие как, уровнения, ' +
                'уровнения два и больше, задачи, геометрия, кривое/квадратное уровнение и круги. А так-же, ' +
                'продвинутый экзамен может состоять из тем и примеров для младшей школы тоже.')
        },
        exerciseForms: {
            sum_substract: '',
            multiply_divide: '',
            mixed: '',
            power_root: '',
            fraction_fractionMixed: '',
            forms_sizes: '',
            exam_basic: '',
            equasions_basic: '',
            equations_two_more: '',
            verbal_problems: '',
            geometry: '',
            quadratic_equation: '',
            circles: '',
            exam_advanced: ''
        }
    }
}

export default russianPackage;