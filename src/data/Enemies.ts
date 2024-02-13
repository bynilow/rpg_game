import { IEnemy } from "../models/IEnemy";

export const Enemies: IEnemy[] = [
    {
        "id": "bandit",
        "idInArea": "",
        "title": "Разбойник с кинжалом",
        "description": "Разбойники с кинжалами обладают высокой скоростью и подвижностью, что позволяет им быстро перемещаться и избегать вражеских атак. Они также обладают отличным чувством равновесия и мастерством в уклонении, что помогает им избегать ловушек и неожиданных атак.",
        "avatar": "icons/enemies/bandit.png",
        "baseCountXP": 15,
        "level": 1,
        "stats": {
            "attackSpeed": 8,
            "damage": 3,
            "critDamageMultiplier": 1.3,
            "critChance": 4,
            "baseHealth": 70,
            "dodgeChance": 4,
            "blockingChancePercent": 5,
            "blockingMultiplier": 2.5,
            "missChance": 7,
        },
        "type": "enemy",
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 3,
                "countMax": 12,
                "dropChance": 100
            },
            {
                "id": "bottle",
                "countMin": 1,
                "countMax": 3,
                "dropChance": 70
            },
            {
                "id": "wool",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 30
            },
            {
                "id": "bone",
                "countMin": 1,
                "countMax": 3,
                "dropChance": 35
            },
            {
                "id": "dagger_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "dagger_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 3
            },
            {
                "id": "dagger_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.5
            },
            {
                "id": "dagger_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.1
            },
            {
                "id": "dagger_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.01
            }
        ],
        "actionText": {
            "communicationText": [
                "Твое сознание рассеется, как туман перед солнцем!",
                "Извини, но сейчас нет времени для сожалений. Ты погибнешь!",
                "Настигнет тебя огненный удар!"
            ],
            "combatText": [
                "Ловким ударом кинжала пронзает #name нанося #damage урона.",
                "Молниеносный удар кинжала по телу #name наносит #damage урона.",
                "С коварным уколом кинжала насаживает #name и наносит #damage урона.",
                "Скользящий удар кинжалом находит слабое место в защите #name и причиняет #damage урона."
            ],
            "critDamageText": "Собирает все силы и пронзает #name своим кинжалом, нанося критические #damage урона!",
            "successBlockingText": "Совершенное владение щитом оказывает эффект! #name получает всего #damage урона!",
            "successBlockingCritText": "Совершенное владение щитом оказывает эффект! #name блокирует критический урон и получает всего #damage урона!",
            "failedBlockingText": "Блок не удался, и удар #name наносит #damage! Это было больно...",
            "dodgeText": "#name применяет уловку и уклоняется от удара.",
            "missText": "Запутавшись в собственных ногах падает и не наносит никакого урона."
        }
    },
    {
        "id": "garold",
        "idInArea": "",
        "title": "Торговец Гарольд",
        "description": "Седые волосы и прекрасная борода добавляют ему мудрости и опыта, а добрый взгляд говорит о его заботе о своих клиентах. Гарольд продает все подряд, от обычных товаров до редких предметов, и всегда старается предложить своим клиентам наилучшие условия.",
        "avatar": "icons/enemies/traders/garold_trader.png",
        "baseCountXP": 0,
        "level": 1,
        "stats": {
            "attackSpeed": 0,
            "damage": 0,
            "critDamageMultiplier": 0,
            "critChance": 0,
            "baseHealth": 0,
            "dodgeChance": 0,
            "blockingChancePercent": 0,
            "blockingMultiplier": 0,
            "missChance": 0,
        },
        "type": "trader",
        "possibleLoot": [
            {
                "id": "bottle",
                "countMin": 4,
                "countMax": 18,
                "dropChance": 80
            },
            {
                "id": "wool",
                "countMin": 8,
                "countMax": 46,
                "dropChance": 70
            },
            {
                "id": "bone",
                "countMin": 9,
                "countMax": 30,
                "dropChance": 95
            },
            {
                "id": "glue",
                "countMin": 3,
                "countMax": 13,
                "dropChance": 75
            },
            {
                "id": "birch_plank",
                "countMin": 3,
                "countMax": 15,
                "dropChance": 75
            },
            {
                "id": "oak_plank",
                "countMin": 4,
                "countMax": 13,
                "dropChance": 60
            },
            {
                "id": "willow_plank",
                "countMin": 2,
                "countMax": 11,
                "dropChance": 45
            },
            {
                "id": "cedar_plank",
                "countMin": 2,
                "countMax": 7,
                "dropChance": 30
            },
            {
                "id": "teak_plank",
                "countMin": 1,
                "countMax": 5,
                "dropChance": 10
            },
            {
                "id": "iron_ingot",
                "countMin": 3,
                "countMax": 15,
                "dropChance": 75
            },
            {
                "id": "tungsten_ingot",
                "countMin": 3,
                "countMax": 13,
                "dropChance": 60
            },
            {
                "id": "platinum_ingot",
                "countMin": 3,
                "countMax": 11,
                "dropChance": 45
            },
            {
                "id": "titanium_ingot",
                "countMin": 2,
                "countMax": 7,
                "dropChance": 30
            },
            {
                "id": "adamantite_ingot",
                "countMin": 1,
                "countMax": 5,
                "dropChance": 15
            },
            
        ],
        "traderStats": {
            "extraPriceMultiplier": 1.4,
            "updateTimeInMinutes": 120,
            "tradingItems": []
        },
        "actionText": {
            "communicationText": [],
            "combatText": [],
            "critDamageText": "",
            "successBlockingText": "",
            "successBlockingCritText": "",
            "failedBlockingText": "",
            "dodgeText": "",
            "missText": ""
        }
    },
    {
        "id": "bear",
        "idInArea": "",
        "title": "Медведь",
        "avatar": "icons/enemies/bear.png",
        "description": "Огромное и свирепое существо, обитающее в глубине лесов. Его массивное тело покрыто густым мехом.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 18,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 4,
                "countMax": 14,
                "dropChance": 100
            },
            {
                "id": "leather",
                "countMin": 2,
                "countMax": 4,
                "dropChance": 65
            },
            {
                "id": "bone",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 35
            },
            {
                "id": "longsword_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "longsword_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 6
            },
            {
                "id": "longsword_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 2
            },
            {
                "id": "longsword_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.5
            },
            {
                "id": "longsword_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.05
            }
        ],
        "stats": {
            "baseHealth": 120,
            "damage": 5.5,
            "attackSpeed": 14,
            "blockingChancePercent": 2,
            "blockingMultiplier": 1.3,
            "critChance": 7,
            "critDamageMultiplier": 1.4,
            "dodgeChance": 2,
            "missChance": 1,
        },
        "actionText": {
            "communicationText": ["Гррр", "Гхррррр", "Рррр"],
            "combatText": [
                "Задел лапой #name нанося #damage урона.",
                "Острымими когтями царапает #name нанося #damage урона.",
                "Прорычав ударил #name нанеся #damage урона."
            ],
            "critDamageText": "Выждав время, разрывает тело #name своими когтями, нанося критические #damage урона!",
            "dodgeText": "#name удалось отпрыгнуть от удара.",
            "failedBlockingText": "",
            "missText": "Толстое, тяжелое тело не играет на руку. Не удалось нанести никакого урона.",
            "successBlockingCritText": "Плотное тело имеет свои плюсы! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Плотное тело имеет свои плюсы! #name получает всего #damage урона!"
        }
    },
    {
        "id": "chicken",
        "idInArea": "",
        "title": "Курица",
        "avatar": "icons/enemies/chicken.png",
        "description": "Птица, которая является одомашненным видом птицы. Она имеет перья, крылья, хвост и ноги, как и другие птицы.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 4,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 1,
                "countMax": 6,
                "dropChance": 100
            },
            {
                "id": "bone",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 20
            },
            {
                "id": "medium_helmet_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "medium_helmet_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 8
            },
            {
                "id": "medium_helmet_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 5
            },
            {
                "id": "medium_helmet_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 2.5
            },
            {
                "id": "medium_helmet_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.5
            }
        ],
        "stats": {
            "baseHealth": 15,
            "damage": 0.5,
            "attackSpeed": 3,
            "blockingChancePercent": 1,
            "blockingMultiplier": 1.1,
            "critChance": 10,
            "critDamageMultiplier": 10,
            "dodgeChance": 10,
            "missChance": 7,
        },
        "actionText": {
            "communicationText": ["Ко-ко-ко!", "Кудах тах-тах"],
            "combatText": [
                "Клюнул #name за палец, нанеся #damage урона.",
                "Без остановки клюет #name, нанося #damage урона."
            ],
            "critDamageText": "Откусывает #name палец на ноге, нанося критические #damage урона!",
            "dodgeText": "#name кудахтнув отпрыгивает от удара.",
            "failedBlockingText": "",
            "missText": "Клюнул за одежду, не нанеся никакого урона.",
            "successBlockingCritText": "Каким-то образом получается заблокировать атаку! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Каким-то образом получается заблокировать атаку! #name получает всего #damage урона!"
        }
    },
    {
        "id": "crab",
        "idInArea": "",
        "title": "Краб",
        "avatar": "icons/enemies/crab.png",
        "description": "Маленькое ракообразное, которое обитает в морях и океанах. У него есть твердый панцирь, который защищает его тело, и длинные клешни, которые он использует для защиты и нападения.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 6,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 3,
                "countMax": 8,
                "dropChance": 100
            },
            {
                "id": "crab_claw",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 80
            },
            {
                "id": "medium_chest_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "medium_chest_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 7
            },
            {
                "id": "medium_chest_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 4
            },
            {
                "id": "medium_chest_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 1.5
            },
            {
                "id": "medium_chest_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.5
            }
        ],
        "stats": {
            "baseHealth": 40,
            "damage": 1.5,
            "attackSpeed": 5.5,
            "blockingChancePercent": 11,
            "blockingMultiplier": 2.2,
            "critChance": 6,
            "critDamageMultiplier": 1.7,
            "dodgeChance": 2,
            "missChance": 1,
        },
        "actionText": {
            "communicationText": ["Цыц.", "Цоц."],
            "combatText": [
                "Резким сжатием клешней наносит #name небольшие #damage урона.",
                "Клешни сжимают кожу #name нанося #damage урона.",
            ],
            "critDamageText": "Огромным сжатием клешней отрывает с #name кусок мяса, нанося критические #damage урона!",
            "dodgeText": "#name бегая влево-вправо удается избежать атаки.",
            "failedBlockingText": "",
            "missText": "Попытался побежать вперед на врага, но ничего не вышло.",
            "successBlockingCritText": "Крепкий панцирь позволяет заблокировать урон! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Крепкий панцирь позволяет заблокировать урон! #name получает всего #damage урона!"
        }
    },
    {
        "id": "goblin",
        "idInArea": "",
        "title": "Гоблин",
        "avatar": "icons/enemies/goblin.png",
        "description": "Маленькие существа с острыми зубами и когтями, которые живут в пещерах или лесных чащах. Они известны своим проказливым характером и любовью к шалостям над путниками.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 12,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 4,
                "countMax": 12,
                "dropChance": 100
            },
            {
                "id": "bone",
                "countMin": 1,
                "countMax": 4,
                "dropChance": 70
            },
            {
                "id": "leather",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 30
            },
            {
                "id": "axe_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "axe_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 7
            },
            {
                "id": "axe_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 5
            },
            {
                "id": "axe_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 3
            },
            {
                "id": "axe_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 1
            }
        ],
        "stats": {
            "baseHealth": 55,
            "damage": 2,
            "attackSpeed": 4.5,
            "blockingChancePercent": 5,
            "blockingMultiplier": 2.5,
            "critChance": 4,
            "critDamageMultiplier": 1.3,
            "dodgeChance": 6,
            "missChance": 8.5,
        },
        "actionText": {
            "communicationText": [
                "Огненый удар моего топора, покажет кто тут победитель!",
                "Тебе лучше не приближаться к этому месту более.",
                "Зря ты потревожил меня."
            ],
            "combatText": [
                "Ловким ударом топора пронзает #name нанося #damage урона.",
                "Молниеносный удар топора по телу #name наносит #damage урона.",
                "С коварным ударом топора по #name наносит #damage урона.",
                "Скользящий удар топором находит слабое место в защите #name и причиняет #damage урона."
            ],
            "critDamageText": "Собирает все силы и рубит #name своим топором, нанося критические #damage урона!",
            "dodgeText": "#name имеет небольшое тело и быструю скорость, что позволяет уклониться от удара.",
            "failedBlockingText": "",
            "missText": "Запутавшись в собственных ногах падает и не наносит никакого урона.",
            "successBlockingCritText": "Совершенное владение щитом оказывает эффект! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Совершенное владение щитом оказывает эффект! #name получает всего #damage урона!"
        }
    },
    {
        "id": "sheep",
        "idInArea": "",
        "title": "Овца",
        "avatar": "icons/enemies/sheep.png",
        "description": "Животное, которое разводят для получения шерсти и мяса.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 6,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 2,
                "countMax": 7,
                "dropChance": 100
            },
            {
                "id": "wool",
                "countMin": 1,
                "countMax": 5,
                "dropChance": 100
            },
            {
                "id": "leather",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 25
            },
            {
                "id": "medium_greaves_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "medium_greaves_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 7
            },
            {
                "id": "medium_greaves_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 4
            },
            {
                "id": "medium_greaves_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 2
            },
            {
                "id": "medium_greaves_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 0.7
            }
        ],
        "stats": {
            "baseHealth": 25,
            "damage": 1.2,
            "attackSpeed": 6.5,
            "blockingChancePercent": 4,
            "blockingMultiplier": 1.2,
            "critChance": 11,
            "critDamageMultiplier": 2.7,
            "dodgeChance": 2,
            "missChance": 3,
        },
        "actionText": {
            "communicationText": [
                "Бееее.",
                "Беее-Беее.",
                "Беее-Беее-Беее."
            ],
            "combatText": [
                "Ударяет крепким лбом #name нанося #damage урона.",
                "Набрав скорость врезается в #name нанеся #damage урона.",
                "Крикнув \"Беее\" влетает в #name нанеся #damage урона.",
            ],
            "critDamageText": "Набрав скорость и подрыгнув, попал #name по лбу, нанеся критические #damage урона!",
            "dodgeText": "#name отпрыгивает от удара и не получает урона.",
            "failedBlockingText": "",
            "missText": "Врезается в дерево и не наносит никакого урона.",
            "successBlockingCritText": "Получается заблокировать удар! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Получается заблокировать удар! #name получает всего #damage урона!"
        }
    },
    {
        "id": "wolf",
        "idInArea": "",
        "title": "Волк",
        "avatar": "icons/enemies/wolf.png",
        "description": "Хищное млекопитающее из семейства псовых.",
        "type": "enemy",
        "level": 1,
        "baseCountXP": 13,
        "possibleLoot": [
            {
                "id": "coin",
                "countMin": 5,
                "countMax": 12,
                "dropChance": 100
            },
            {
                "id": "leather",
                "countMin": 2,
                "countMax": 5,
                "dropChance": 85
            },
            {
                "id": "wolf_fang",
                "countMin": 1,
                "countMax": 2,
                "dropChance": 75
            },
            {
                "id": "mace_common",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 10
            },
            {
                "id": "mace_uncommon",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 7
            },
            {
                "id": "mace_rare",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 5
            },
            {
                "id": "mace_mythical",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 3
            },
            {
                "id": "mace_legendary",
                "countMin": 1,
                "countMax": 1,
                "dropChance": 1.5
            }
        ],
        "stats": {
            "baseHealth": 45,
            "damage": 1.2,
            "attackSpeed": 3.7,
            "blockingChancePercent": 3,
            "blockingMultiplier": 1.3,
            "critChance": 6,
            "critDamageMultiplier": 2.7,
            "dodgeChance": 13,
            "missChance": 3.5,
        },
        "actionText": {
            "communicationText": [
                "Рррарр!", "Ррыыаарр!", "Хррр.", "Гррыааар!"
            ],
            "combatText": [
                "Скалясь кидается на #name нанося #damage урона.",
                "Укусил #name за руку, нанеся #damage урона.",
                "Поцарапал острыми когтями тело #name, нанеся #damage урона.",
            ],
            "critDamageText": "Вцепившись в ногу #name разорвал ее, нанося критические #damage урона!",
            "dodgeText": "#name прорычав отпрыгнул от удара.",
            "failedBlockingText": "",
            "missText": "Прошлый удар прошелся по морде, дизориентация сделала свое дело. Урона не нанесено.",
            "successBlockingCritText": "Заблокировал удар! #name блокирует критический урон и получает всего #damage урона!",
            "successBlockingText": "Заблокировал удар! #name получает всего #damage урона!"
        }
    }
]