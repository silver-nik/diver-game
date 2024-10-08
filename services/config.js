const gameConfig = {

    npcImages: ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png'],
    npcImages2: ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png',  './assets/npc-bottle.png'],


    increaseHpIcon: './assets/heart-icon.svg',
    decreaseHpIcon: './assets/heart-icon-lse.svg',

    enemies: [
        {
            img: './assets/enemy-1.png',
            hp: 1,
        },
        // {
        //     img: './assets/shark-mid.png',
        //     hp: 2,
        // },
        // {
        //     img: './assets/shark-big.png',
        //     hp: 3,
        // }
    ],

    enemies2: [
        {
            img: './assets/enemy-2.png',
            hp: 1,
        }
    ],

    enemies3: [
        {
            img: './assets/shark.png',
            hp: 1,
        }
    ],

    questions1: [
        {
            question: "Современные атаки зачастую используют DNS-туннели для организации связи с командными центрами злоумышленников. Умеет ли PT NAD выявлять такие каналы?",
            answers: [
                { text: "Да. В PT NAD реализован механизм выявления DGA-доменов", correct: true },
                { text: "Нет. PT NAD не имеет таких сигнатур", correct: false }
            ]
        },
        {
            question: "Умеет ли PT NAD отправлять отчеты на почту?",
            answers: [
                { text: "Да", correct: true },
                { text: "Нет", correct: false }
            ]
        },
        {
            question: "Назовите, какой из методов обнаружения угроз НЕ используется в PT NAD?",
            answers: [
                { text: "сигнатурный", correct: false },
                { text: "ML", correct: false },
                { text: "AI", correct: true }
            ]
        },
        {
            question: "Каким образом в PT NAD реализована проверка файлов?",
            answers: [
                { text: "на основе индикаторов компрометации", correct: false },
                { text: "при помощи интеграции с Sandbox", correct: false },
                { text: "оба варианта верны", correct: true }
            ]
        },
        {
            question: "Какой тип хэша используется в качестве индикатора компрометации?",
            answers: [
                { text: "md5", correct: true },
                { text: "sha1", correct: false },
                { text: "sha256", correct: false },
                { text: "sha512", correct: false }
            ]
        },
        {
            question: "Укажите, умеет ли PT NAD выявлять нестойкие пароли?",
            answers: [
                { text: "Да, только для нешифрованного трафика", correct: true },
                { text: "Да, во всем трафике", correct: false },
                { text: "Нет", correct: false }
            ]
        },
        {
            question: "Можно ли скачать дамп трафика, в котором обнаружена атака?",
            answers: [
                { text: "Да", correct: true },
                { text: "Нет", correct: false }
            ]
        },
        {
            question: "Умеет ли PT NAD расшифровывать трафик?",
            answers: [
                { text: "Нет", correct: true },
                { text: "Да", correct: false }
            ]
        },
        {
            question: "Умеет PT NAD находить атаки в шифрованном трафике?",
            answers: [
                { text: "Да, при помощи поиска аномалий и сигнатур", correct: true },
                { text: "Нет, т.к. PT NAD не умеет расшифровывать трафик", correct: false }
            ]
        },
        {
            question: "Можно ли сохранять поисковые фильтры?",
            answers: [
                { text: "Да", correct: true },
                { text: "Нет", correct: false }
            ]
        }
    ],

    questions2: [
        {
            question: "Сколько антивирусов доступно «из коробки» в PT Sandbox?",
            answers: [
                { text: "2", correct: false },
                { text: "3", correct: true },
                { text: "4", correct: false }
            ]
        },
        {
            question: "Как называются техники, которые противодействуют обнаружению виртуальной среды?",
            answers: [
                { text: "Anti-gravitation", correct: false },
                { text: "Anti-evasion", correct: true },
                { text: "Anti-DDoS", correct: false },
                { text: "Anti-APT", correct: false }
            ]
        },
        {
            question: "Как называется вредоносная программа, которая умеет «возрождаться» как феникс после удаления и перезагрузки ОС (такое ВПО умеет ловить PT Sandbox)?",
            answers: [
                { text: "Буткит", correct: false },
                { text: "Шифровальщик", correct: false },
                { text: "Руткит", correct: true },
                { text: "Вайпер", correct: false }
            ]
        },
        {
            question: "Сколько виртуальных машин на одной ноде будет доступно в PT Sandbox версии 5.15?",
            answers: [
                { text: "15", correct: false },
                { text: "20", correct: false },
                { text: "30", correct: true },
                { text: "40", correct: false }
            ]
        },
        {
            question: "На каких уровнях умеет ловить ВПО PT Sandbox?",
            answers: [
                { text: "Уровень гипервизора", correct: false },
                { text: "Уровень виртуальной машины", correct: false },
                { text: "Уровень ядра ОС", correct: false },
                { text: "На всех перечисленных", correct: true }
            ]
        },
        {
            question: "По каким протоколам умеет интегрироваться PT Sandbox с другими IT и ИБ системами?",
            answers: [
                { text: "API", correct: false },
                { text: "ICAP", correct: false },
                { text: "Оба", correct: true }
            ]
        },
        {
            question: "Как часто выходят обновления PT Sandbox?",
            answers: [
                { text: "Раз в месяц", correct: true },
                { text: "Раз в квартал", correct: false },
                { text: "Раз в полгода", correct: false },
                { text: "Раз в год", correct: false }
            ]
        },
        {
            question: "Какие возможности по снижению нагрузки на поведенческий анализ есть в PT Sandbox?",
            answers: [
                { text: "Дополнительный антивирус", correct: false },
                { text: "Настройки предварительной фильтрации", correct: true },
                { text: "Ручная проверка файлов", correct: false }
            ]
        },
        {
            question: "Для каких целей используются машинные технологии в PT Sandbox?",
            answers: [
                { text: "Для улучшения качества детекта", correct: true },
                { text: "Для проверки по хэш-суммам", correct: false },
                { text: "Для «галочки»", correct: false }
            ]
        },
        {
            question: "Какое ограничение имеет инсталляция PT Sandbox по объему принимаемых объектов?",
            answers: [
                { text: "Не более 10,000 в час", correct: false },
                { text: "Не более 100,000 в час", correct: false },
                { text: "Нет ограничения ввиду возможности горизонтального масштабирования", correct: true }
            ]
        }
    ],

    questions3: [
        {
            question: "При помощи какого механизма осуществляется интеграция PT NAD и PT Sandbox?",
            answers: [
                { text: "API", correct: false },
                { text: "ICAP", correct: true }
            ]
        },
        {
            question: "Как можно отслеживать вердикты, получаемые от PT Sandbox?",
            answers: [
                { text: "При помощи построения дашбордов", correct: false },
                { text: "При помощи поиска по ключевому слову rpt.verdict", correct: false },
                { text: "Оба варианта верны", correct: true }
            ]
        },
        {
            question: "Умеет ли PT Anti-APT анализировать шифрованный трафик?",
            answers: [
                { text: "Нет", correct: false },
                { text: "Да, весь трафик", correct: false },
                { text: "Да, только тот, который генерирует ВПО в процессе анализа в Sandbox", correct: true }
            ]
        },
        {
            question: "Назовите основные задачи PT AntiAPT",
            answers: [
                { text: "Сокращение времени скрытого присутствия злоумышленника в сети", correct: false },
                { text: "Выявление атаки по большому числу признаков", correct: false },
                { text: "Защита от новейших угроз", correct: false },
                { text: "Все перечисленное", correct: true }
            ]
        },
        {
            question: "Из каких основных компонентов состоит PT AntiAPT решение?",
            answers: [
                { text: "PT SIEM, PT NAD, PT Sandbox", correct: false },
                { text: "PT NAD, PT Sandbox", correct: true },
                { text: "PT NAD, PT Sandbox, TA", correct: false },
                { text: "PT NAD, PT SIEM", correct: false }
            ]
        },
        {
            question: "Как часто выходят обновления PT Sandbox?",
            answers: [
                { text: "Раз в месяц", correct: true },
                { text: "Раз в квартал", correct: false },
                { text: "Раз в полгода", correct: false },
                { text: "Раз в год", correct: false }
            ]
        },
        {
            question: "Какие возможности по снижению нагрузки на поведенческий анализ есть в PT Sandbox?",
            answers: [
                { text: "Дополнительный антивирус", correct: false },
                { text: "Настройки предварительной фильтрации", correct: true },
                { text: "Ручная проверка файлов", correct: false }
            ]
        },
        {
            question: "Современные атаки зачастую используют DNS-туннели для организации связи с командными центрами злоумышленников. Умеет ли PT NAD выявлять такие каналы?",
            answers: [
                { text: "Да. В PT NAD реализован механизм выявления DGA-доменов", correct: true },
                { text: "Нет. PT NAD не имеет таких сигнатур", correct: false }
            ]
        }
    ],
    
};


export { gameConfig };