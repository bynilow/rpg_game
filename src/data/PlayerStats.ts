import { IPlayerBaseStats } from "../models/IPlayer";

export const PlayerBaseStats: IPlayerBaseStats = {
    damage: {
        baseCount: 5,
        currentScores: 5,
        givesScores: 5,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '',
        title: 'Урон'
    },
    critDamageMultiplier: {
        baseCount: 1.5,
        givesScores: 0.2,
        currentScores: 1.5,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 'x',
        title: 'Множитель критического урона'
    },
    critChance: {
        baseCount: 3,
        currentScores: 3,
        givesScores: 0.5,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс критического урона'
    },
    oreSpeedMining: {
        baseCount: 0,
        currentScores: 0,
        givesScores: -0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость добычи руды'
    },
    oreDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        givesScores: 3,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс дополнительного предмета - Шахтерство'
    },
    treeSpeedMining: {
        baseCount: 0,
        currentScores: 0,
        givesScores: -0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость рубки дерева'
    },
    treeDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        givesScores: 3,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс дополнительного предмета - Лесорубство'
    },
    capacity: {
        baseCount: 150,
        currentScores: 150,
        givesScores: 20,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 'kg',
        title: 'Грузоподъемность'
    },

    blockingChancePercent: {
        baseCount: 3,
        currentScores: 3,
        givesScores: 0.25,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс блокирования'
    },
    blockingMultiplier: {
        baseCount: 1.5,
        currentScores: 1.5,
        givesScores: 0.25,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 'x',
        title: 'Множитель блокирования'
    },
    dodgePercentChance: {
        baseCount: 3,
        currentScores: 3,
        givesScores: 0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс уклонения'
    },
    missPercentChance: {
        baseCount: 5,
        currentScores: 5,
        givesScores: 0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс промаха'
    },
    movementSpeed: {
        baseCount: 0,
        currentScores: 0,
        givesScores: -0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость передвижения'
    },
    attackSpeed: {
        baseCount: 6,
        currentScores: 6,
        givesScores: -0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость атаки'
    },
    health: {
        baseCount: 100,
        currentScores: 100,
        givesScores: 10,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '',
        title: 'Максимальное ОЗ'
    },
    healthRegenerationScore: {
        baseCount: 1,
        currentScores: 1,
        givesScores: 1.5,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость регенерации ОЗ'
    },

    experienceMultiplier: {
        baseCount: 1,
        currentScores: 1,
        givesScores: 0.15,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 'x',
        title: 'Множитель получения опыта'
    },
    craftSpeed: {
        baseCount: 0,
        currentScores: 0,
        givesScores: -0.1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: 's',
        title: 'Скорость создания предметов'
    },
    craftDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        givesScores: 3,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Шанс дополнительного предмета - Создание'
    },
    buyPricePercent: {
        baseCount: 0,
        currentScores: 0,
        givesScores: 0.5,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Скидка при покупке'
    },
    sellPricePercent: {
        baseCount: 0,
        currentScores: 0,
        givesScores: 1,
        level: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu facilisis sed. Pharetra massa massa ultricies mi quis hendrerit dolor magna.',
        type: '%',
        title: 'Наценка при продаже'
    }
}