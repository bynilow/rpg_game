import { IArmor } from "../models/IEquipment"

interface IStat {
    [key: string]: {
        name: string;
        type: 'x' | '%' | 's' | '';
    }
}

const Armor: IStat = {
    healthMultiplier: {
        name: 'Множитель ОЗ',
        type: 'x'
    },
    missChance: {
        name: 'Шанс промаха',
        type: '%'
    },
    dodgeChance: {
        name: 'Шанс уклонения',
        type: '%'
    },
    speedMovement: {
        name: 'Скорость передвижения',
        type: 's'
    },
    speedAttack: {
        name: 'Скорость атаки',
        type: 's'
    },
}

const Tool: IStat = {
    miningSpeed: {
        name: 'Скорость добычи',
        type: 's'
    },
    doubleChancePercent: {
        name: 'Шанс дополнительного предмета',
        type: '%'
    },
}

const Weapon: IStat = {
    damage: {
        name: 'Урон',
        type: ''
    },
    missChance: {
        name: 'Шанс промаха',
        type: '%'
    },
    blockingChancePercent: {
        name: 'Шанс блокирования',
        type: '%'
    },
    blockingMultiplier: {
        name: 'Множитель блокирования',
        type: 'x'
    },
    critDamageMultiplier: {
        name: 'Множитель критического урона',
        type: 'x'
    },
    critChance: {
        name: 'Шанс критического урона',
        type: '%'
    },
    speedAttack: {
        name: 'Скорость атаки',
        type: 's'
    },
}

const Player: IStat = {
    baseDamage: {
        name: 'Базовый урон',
        type: ''
    },
    damageMultiplier: {
        name: 'Множитель урона',
        type: 'x'
    },
    critDamageMultiplier: {
        name: 'Множитель критического урона',
        type: 'x'
    },
    critChance: {
        name: 'Шанс критического урона',
        type: '%'
    },
    oreSpeedMining: {
        name: 'Скорость добычи руды',
        type: 's'
    },
    oreDoubleLootPercentChance: {
        name: 'Шанс дополнительной руды',
        type: '%'
    },
    treeSpeedMining: {
        name: 'Скорость добычи дерева',
        type: 's'
    },
    treeDoubleLootPercentChance: {
        name: 'Шанс дополнительного дерева',
        type: '%'
    },
    capacity: {
        name: 'Грузоподъемность',
        type: ''
    },

    blockingChancePercent: {
        name: 'Шанс блокирования',
        type: '%'
    },
    blockingMultiplier: {
        name: 'Множитель блокирования',
        type: 'x'
    },
    dodgePercentChance: {
        name: 'Шанс уклонения',
        type: '%'
    },
    missPercentChance: {
        name: 'Шанс промаха',
        type: '%'
    },
    movementSpeed: {
        name: 'Скорость передвижения',
        type: 's'
    },
    attackSpeed: {
        name: 'Скорость атаки',
        type: 's'
    },
    baseHealth: {
        name: 'Базовое ОЗ',
        type: ''
    },
    maxHealthMultiplier: {
        name: 'Множитель ОЗ',
        type: 'x'
    },
    healthRegenerationScore: {
        name: 'Скорость регенерации',
        type: 's'
    },

    experienceMultiplier: {
        name: 'Множитель опыта',
        type: 'x'
    },
    craftSpeed: {
        name: 'Скорость создания предметов',
        type: 's'
    },
    craftDoubleLootPercentChance: {
        name: 'Шанс дополнительного предмета',
        type: '%'
    },
    buyPricePercent: {
        name: 'Скидка при покупке',
        type: '%'
    },
    sellPricePercent: {
        name: 'Наценка при продаже',
        type: '%'
    },
}

export const EquipmentIStatsLibrary = {
    ...Armor,
    ...Weapon,
    ...Tool,
    ...Player
}

export const findStat = (key: string) => {
    return EquipmentIStatsLibrary[key]
}
    

