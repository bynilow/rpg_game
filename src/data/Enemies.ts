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
        "attackSpeed": 8,
        "damage": 3,
        "critDamageMultiplier": 1.3,
        "critChance": 4,
        "maxHealth": 70,
        "dodgeChance": 4,
        "blockingChance": 5,
        "blockingMultiplier": 2.5,
        "missChance": 7,
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
    }
]