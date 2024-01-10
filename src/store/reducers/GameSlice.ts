import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IArea, IAviablePath, ILocationToMove, IPath } from "../../models/IArea";
import { ICraftItem, IFullItem, IFullItemWithCount } from "../../models/IAreaItem";
import { IAreaCurrentEnemy, IEnemy, IEnemyDead } from "../../models/IEnemy";
import { IItemInventory } from "../../models/IInventory";
import { IPlayer, IPlayerBaseStats, ISkillUp } from "../../models/IPlayer";



const baseStats: IPlayerBaseStats = {
    baseDamage: {
        baseCount: 50,
        currentScores: 50,
        countScores: 1,
        level: 1
    },
    damageMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.15,
        level: 1
    },
    critDamageMultiplier: {
        baseCount: 1.5,
        countScores: 0.2,
        currentScores: 1.5,
        level: 1
    },
    critChance: {
        baseCount: 3,
        currentScores: 3,
        countScores: 0.5,
        level: 1
    },
    oreSpeedMining: {
        baseCount: 0,
        currentScores: 0,
        countScores: 0.1,
        level: 1
    },
    oreDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        countScores: 3,
        level: 1
    },
    treeSpeedMining: {
        baseCount: 0,
        currentScores: 0,
        countScores: 0.1,
        level: 1
    },
    treeDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        countScores: 3,
        level: 1
    },
    capacity: {
        baseCount: 150,
        currentScores: 150,
        countScores: 20,
        level: 1
    },

    blockingChancePercent: {
        baseCount: 3,
        currentScores: 3,
        countScores: 0.25,
        level: 1
    },
    blockingMultiplier: {
        baseCount: 1.5,
        currentScores: 1.5,
        countScores: 0.25,
        level: 1
    },
    dodgePercentChance: {
        baseCount: 3,
        currentScores: 3,
        countScores: 0.1,
        level: 1
    },
    missPercentChance: {
        baseCount: 5,
        currentScores: 5,
        countScores: 0.1,
        level: 1
    },
    movementSpeed: {
        baseCount: 0,
        currentScores: 0,
        countScores: 0.1,
        level: 1
    },
    attackSpeed: {
        baseCount: 6,
        currentScores: 6,
        countScores: 0.1,
        level: 1
    },
    baseHealth: {
        baseCount: 150,
        currentScores: 150,
        countScores: 1,
        level: 1
    },
    maxHealthMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.3,
        level: 1
    },
    healthRegenerationMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.5,
        level: 1
    }, 

    experienceMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.15,
        level: 1
    },
    craftSpeedMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.01,
        level: 1
    },
    craftDoubleLootPercentChance: {
        baseCount: 0,
        currentScores: 0,
        countScores: 3,
        level: 1
    },
    buyPricePercent: {
        baseCount: 0,
        currentScores: 0,
        countScores: 0.5,
        level: 1
    },
    sellPricePercent: {
        baseCount: 0,
        currentScores: 0,
        countScores: 1,
        level: 1
    }
}

const craftItems: ICraftItem[] = [
    {
        id: 'birch_plank',
        itemsNeed: [
            {
                id: 'birch_tree',
                count: 1
            }
        ]
    },
    {
        id: 'oak_plank',
        itemsNeed: [
            {
                id: 'oak_tree',
                count: 1
            }
        ]
    },
    {
        id: 'willow_plank',
        itemsNeed: [
            {
                id: 'willow_tree',
                count: 1
            }
        ]
    },
    {
        id: 'cedar_plank',
        itemsNeed: [
            {
                id: 'cedar_tree',
                count: 1
            }
        ]
    },
    {
        id: 'teak_plank',
        itemsNeed: [
            {
                id: 'teak_tree',
                count: 1
            }
        ]
    },
]

interface GameSlice {
    currentLocationId: string;
    availablePaths: IAviablePath[];
    paths: IPath[];
    areas: IArea[];
    enemies: IEnemy[];
    areaItems: IFullItem[];
    craftItems: ICraftItem[];
    currentAreaItem: IFullItem | {};
    currentAreaItemMiningTime: number;
    currentAreaToMove: ILocationToMove;
    inventory: IItemInventory[];
    player: IPlayer;
    playerSkills: IPlayerBaseStats;
}

interface IUpdateAreaItems {
    levelId: string;
    date: string;
    items: {
        id: string;
        count: number
    }[];
}

interface IUpdateAreaEnemies {
    enemies: IAreaCurrentEnemy[];
    levelId: string;
    date: string;
}

const initialState: GameSlice = {
    currentLocationId: 'south_beach',
    availablePaths: [],
    paths: [
        {
            pathA: 'south_beach',
            pathB: 'low_hills',
            time: 5
        },
        {
            pathA: 'low_hills',
            pathB: 'sharp_mountains',
            time: 6.5
        },
        {
            pathA: 'sharp_mountains',
            pathB: 'fish_ponds',
            time: 5.5
        },
        {
            pathA: 'south_beach',
            pathB: 'forgotten_road',
            time: 4.6
        },
        {
            pathA: 'forgotten_road',
            pathB: 'central_castle',
            time: 5.25
        },
        {
            pathA: 'forgotten_road',
            pathB: 'bloody_forest',
            time: 6.4
        },
        {
            pathA: 'central_castle',
            pathB: 'fish_ponds',
            time: 5.3
        },

    ],
    areas: localStorage.areas ? JSON.parse(localStorage.areas) : [],
    enemies: [
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
                    "id": "birch_tree",
                    "countMin": 1,
                    "countMax": 1,
                    "dropChance": 10
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
    ],
    areaItems: [
        {
            "id": "coin",
            "idInArea": "",
            "title": "Монета",
            "avatar": "icons/items/other/coin.png",
            "description": "Золотая монетка.",
            "timeToMining": 0,
            "type": "other",
            "rare": "common",
            "dateReceiving": "",
            "cost": 1,
            "baseCountXP": 1,
            "weight": 0
        },
        {
            "id": "experience",
            "idInArea": "",
            "title": "Опыт",
            "avatar": "icons/items/other/experience.png",
            "description": "Опыт.",
            "timeToMining": 0,
            "type": "other",
            "rare": "common",
            "dateReceiving": "",
            "cost": 1,
            "baseCountXP": 1,
            "weight": 0
        },
        {
            "id": "birch_tree",
            "idInArea": "",
            "title": "Обычная Береза",
            "avatar": "icons/items/tree/birch_tree.png",
            "description": "Обычная Береза, растущая в лесу. Ее ствол высокий и прямой, а листья светло-зеленые и деликатные. Она служит великолепным источником древесины для строительства или ремонта.",
            "timeToMining": 7.0,
            "type": "tree",
            "rare": "common",
            "dateReceiving": "",
            "cost": 3,
            "baseCountXP": 3,
            "weight": 2
        },
        {
            "id": "oak_tree",
            "idInArea": "",
            "title": "Крепкий Дуб",
            "avatar": "icons/items/tree/oak_tree.png",
            "description": "Могучий крепкий Дуб, растущий где-то в дремучем лесу. Его ствол густой и отлично служит для создания прочных и надежных предметов. Листья дуба крупные и густые, создавая плотную тень под его кроной.",
            "timeToMining": 10.0,
            "type": "tree",
            "rare": "uncommon",
            "dateReceiving": "",
            "cost": 7,
            "baseCountXP": 7.5,
            "weight": 3.5
        },
        {
            "id": "willow_tree",
            "idInArea": "",
            "title": "Плакучая Ива",
            "avatar": "icons/items/tree/willow_tree.png",
            "description": "Ветви Плакучей Ивы создают глубокую и таинственную атмосферу. Листья ивы светло-зеленые и изящные, словно особенные пряди мягкого платья.",
            "timeToMining": 16.0,
            "type": "tree",
            "rare": "rare",
            "dateReceiving": "",
            "cost": 18,
            "baseCountXP": 18.7,
            "weight": 5
        },
        {
            "id": "cedar_tree",
            "idInArea": "",
            "title": "Вечнозеленый Кедр",
            "avatar": "icons/items/tree/cedar_tree.png",
            "description": "Могучий Вечнозеленый Кедр. Его ствол глубокого коричневого цвета и способен выдерживать сильные ветры и морозы. Кедр имеет густую хвою, которая всегда остается зеленой, даже в самые суровые времена.",
            "timeToMining": 20.0,
            "type": "tree",
            "rare": "mythical",
            "dateReceiving": "",
            "cost": 35,
            "baseCountXP": 46.8,
            "weight": 6.5
        },
        {
            "id": "teak_tree",
            "idInArea": "",
            "title": "Долговечный Тик",
            "avatar": "icons/items/tree/teak_tree.png",
            "description": "Долговечный Тик, найти который практически невозможно. Его ствол экстраординарно прочный и способен выдержать даже самые страшные бури. Листья тика тонкие и опадают лишь раз в несколько лет, создавая ощущение вечной зелени.",
            "timeToMining": 26.0,
            "type": "tree",
            "rare": "legendary",
            "dateReceiving": "",
            "cost": 70,
            "baseCountXP": 117.1,
            "weight": 8
        },
        {
            "id": "iron_ore",
            "idInArea": "",
            "title": "Железная руда",
            "avatar": "icons/items/ores/iron_ore.png",
            "description": "Обычный кусок породы, наполненный железом. Встречается повсеместно и является основным материалом для создания прочных и надежных предметов.",
            "timeToMining": 8.0,
            "type": "ore",
            "rare": "common",
            "dateReceiving": "",
            "cost": 5,
            "baseCountXP": 5,
            "weight": 3.5
        },
        {
            "id": "tungsten_ore",
            "idInArea": "",
            "title": "Вольфрамовая руда",
            "avatar": "icons/items/ores/tungsten_ore.png",
            "description": "Необычный минерал, добытый в глубинах земли. Известна своей высокой плотностью и прочностью. Широко используется для создания оружия и брони, обладающих улучшенными по сравнению с предметами из железа характеристиками.",
            "timeToMining": 14.0,
            "type": "ore",
            "rare": "uncommon",
            "dateReceiving": "",
            "cost": 13,
            "baseCountXP": 11.5,
            "weight": 5
        },
        {
            "id": "platinum_ore",
            "idInArea": "",
            "title": "Платиновая руда",
            "avatar": "icons/items/ores/platinum_ore.png",
            "description": "Редкая руда с благородным блеском. Из нее изготавливаются предметы высочайшего качества, используемые главными обладателями силы и богатства. Благодаря своей прочности и эстетичности, платина стала символом роскоши.",
            "timeToMining": 21.0,
            "type": "ore",
            "rare": "rare",
            "dateReceiving": "",
            "cost": 34,
            "baseCountXP": 26.4,
            "weight": 6.5
        },
        {
            "id": "titanium_ore",
            "idInArea": "",
            "title": "Титановая руда",
            "avatar": "icons/items/ores/titanium_ore.png",
            "description": "Мифическая руда, драгоценность для всего цивилизованного мира. Обладает невероятной прочностью и легкостью, что делает ее идеальной для создания предметов около легендарного качества. Лишь немногие мастера способны воплотить в жизнь потенциал этой руды.",
            "timeToMining": 26.0,
            "type": "ore",
            "rare": "mythical",
            "dateReceiving": "",
            "cost": 65,
            "baseCountXP": 60.8,
            "weight": 8
        },
        {
            "id": "adamantite_ore",
            "idInArea": "",
            "title": "Адамантитовая руда",
            "avatar": "icons/items/ores/adamantite_ore.png",
            "description": "Легендарная руда, которая считается самым редким и ценным материалом в мире. Покоится на границе человеческого понимания о прочности и обладает сверхъестественной износостойкостью. Из нее можно создать оружие или броню, способные выдержать самые сильные и суровые испытания.",
            "timeToMining": 31.0,
            "type": "ore",
            "rare": "legendary",
            "dateReceiving": "",
            "cost": 93,
            "baseCountXP": 139.9,
            "weight": 9.5
        },
        {
            "id": "wool",
            "idInArea": "",
            "title": "Шерсть",
            "avatar": "icons/items/materials/wool.png",
            "description": "Шерсть - это натуральное волокно, получаемое от различных животных. Это мягкое, теплое и уютное волокно, которое используется для изготовления широкого спектра предметов.",
            "timeToMining": 0,
            "type": "materials",
            "rare": "common",
            "dateReceiving": "",
            "cost": 8,
            "baseCountXP": 1,
            "weight": 1.5
        },
        {
            "id": "bottle",
            "idInArea": "",
            "title": "Бутылка",
            "avatar": "icons/items/other/bottle.png",
            "description": "Предмет, который обычно используется для хранения и транспортировки различных жидкостей.",
            "timeToMining": 0,
            "type": "other",
            "rare": "common",
            "dateReceiving": "",
            "cost": 3,
            "baseCountXP": 1,
            "weight": 0.5
        },
        {
            "id": "birch_plank",
            "idInArea": "",
            "title": "Доска из Березы",
            "avatar": "icons/items/materials/wood_plank.png",
            "description": "",
            "timeToMining": 6.0,
            "type": "material",
            "rare": "common",
            "dateReceiving": "",
            "cost": 5,
            "baseCountXP": 2,
            "weight": 1
        },
        {
            "id": "oak_plank",
            "idInArea": "",
            "title": "Доска из Дуба",
            "avatar": "icons/items/materials/wood_plank.png",
            "description": "",
            "timeToMining": 10.0,
            "type": "material",
            "rare": "uncommon",
            "dateReceiving": "",
            "cost": 9,
            "baseCountXP": 3.5,
            "weight": 1.7
        },
        {
            "id": "willow_plank",
            "idInArea": "",
            "title": "Доска из Ивы",
            "avatar": "icons/items/materials/wood_plank.png",
            "description": "",
            "timeToMining": 16.0,
            "type": "material",
            "rare": "rare",
            "dateReceiving": "",
            "cost": 20,
            "baseCountXP": 9.3,
            "weight": 2.5
        },
        {
            "id": "cedar_plank",
            "idInArea": "",
            "title": "Доска из Кедра",
            "avatar": "icons/items/materials/wood_plank.png",
            "description": "",
            "timeToMining": 20.0,
            "type": "material",
            "rare": "mythical",
            "dateReceiving": "",
            "cost": 39,
            "baseCountXP": 23.4,
            "weight": 3.2
        },
        {
            "id": "teak_plank",
            "idInArea": "",
            "title": "Доска из Тика",
            "avatar": "icons/items/materials/wood_plank.png",
            "description": "",
            "timeToMining": 26.0,
            "type": "material",
            "rare": "legendary",
            "dateReceiving": "",
            "cost": 80,
            "baseCountXP": 55,
            "weight": 4
        }
    ],
    craftItems: craftItems,
    currentAreaToMove: {
        time: 0,
        locationId: 'south_beach'
    },
    currentAreaItem: {},
    currentAreaItemMiningTime: 0,
    inventory: [],
    player: {
        title: 'peesoos',
        health: 150,
        avatar: '',
        coins: 0,
        level: 1,
        currentXP: 0,
        skillPoints: 20,
        actionText: {
            combatText: [
                "Сжимает свой кулак и бьет #name прямо по лицу нанеся #damage урона."
            ],
            communicationText: [""],
            critDamageText: "Глубоко вдохнув и ударив кулаком по #name попал в глаз нанеся критические #damage урона!",
            missText: "Рассек воздух своим кулаком, не нанеся никакого урона.",
            dodgeText: "#name Применяет уловку и уклоняется от удара.",
            failedBlockingText: "Блок не удался, и удар #name наносит #damage! Это было больно...",
            successBlockingCritText: "Совершенное владение щитом оказывает эффект! #name блокирует критический урон и получает всего #damage урона!",
            successBlockingText: "Совершенное владение щитом оказывает эффект! #name получает всего #damage урона!"
        }
    },
    playerSkills: baseStats,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>){
            state.currentLocationId = state.areas.find(p => p.id === action.payload)!.id;
        },
        getAvailablePaths(state, action: PayloadAction<string>){
            const levelId = action.payload;

            const paths:IAviablePath[] = state.paths.filter(p => (p.pathA+' '+p.pathB).includes(levelId))
                .map(i => ({
                    pathId: i.pathA !== levelId ? i.pathA : i.pathB,
                    time: i.time}))
            state.availablePaths = paths;
        },
        setLocationToMove(state, action: PayloadAction<ILocationToMove>){
            state.currentAreaToMove = action.payload;
        },
        stopMove(state){
            state.currentAreaToMove = {
                time: 0,
                locationId: ''
            }
        },
        updateAreaItems(state, action: PayloadAction<IUpdateAreaItems>){
            const payloadItems = action.payload.items;
            const payloadDate = action.payload.date;
            const payloadDateDate = new Date(payloadDate);
            const payloadLevelId = action.payload.levelId;

            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);

            state.areas[foundedIndex].lastRespawnAreaItems = payloadDate;

            let changedStorage:IArea[] = state.areas;
            changedStorage[foundedIndex].lastRespawnAreaItems = payloadDate;
            

            let items:IFullItem[] = [];
            payloadItems.forEach(i => {
                for(let j = 0; j < i.count; j++){
                    const foundedItem = state.areaItems.find(si => si.id === i.id)!;
                    items.push({...foundedItem, idInArea: i.id + j});
                }
            });

            state.areas[foundedIndex].currentAreaItems = items!;

            changedStorage[foundedIndex].currentAreaItems = items!;

            localStorage.areas = JSON.stringify(state.areas);
        },
        updateAreaEnemies(state, action: PayloadAction<IUpdateAreaEnemies>){
            const payloadEnemies = action.payload.enemies;
            const payloadDate = action.payload.date;
            const payloadLevelId = payloadEnemies[0].levelId;

            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);

            state.areas[foundedIndex].lastRespawnAreaEnemies = payloadDate;            

            let enemies: IAreaCurrentEnemy[] = [];
            payloadEnemies.forEach((e) => {
                enemies.push(e);
            });

            state.areas[foundedIndex].currentEnemies = enemies!;

            localStorage.areas = JSON.stringify(state.areas);
        },
        mineItem(state, action: PayloadAction<IFullItem>){
            const indexLevel = state.areas.findIndex(i => i.id === state.currentLocationId);
            const currentAreaItems = state.areas[indexLevel].currentAreaItems;
            const idInArea = action.payload.idInArea;

            state.areas[indexLevel].currentAreaItems = state.areas[indexLevel].currentAreaItems.
                filter(i => i.idInArea !== idInArea);

            localStorage.areas = JSON.stringify(state.areas);
            
        },
        stopMine(state){
            state.currentAreaItem = {};
            state.currentAreaItemMiningTime = 0;
        },
        setAreasFromStorage(state){
            state.areas = JSON.parse(localStorage.areas);
        },
        addItemToInventory(state, action: PayloadAction<IFullItemWithCount>){
            const foundedItemIndex = state.inventory.findIndex(i => i.item.id === action.payload.id);
            const date = new Date().toISOString();
            const count = action.payload.count;

            if(foundedItemIndex !== -1){
                state.inventory[foundedItemIndex].count += count;
                state.inventory[foundedItemIndex].item.dateReceiving = date;
            }
            else{
                state.inventory.push({
                    item: {...action.payload, dateReceiving: date},
                    count
                })
            }
            localStorage.inventory = JSON.stringify(state.inventory);
        },
        addItemsToInventory(state, action: PayloadAction<IFullItemWithCount[]>){
            const date = new Date().toISOString();
            const items = action.payload;

            items.forEach( i => {
                if( i.id === 'coin'){
                    state.player.coins += i.count;
                }
                else {
                    const foundedItemIndex = state.inventory.findIndex(si => si.item.id === i.id);
                    if (foundedItemIndex !== -1) {
                        state.inventory[foundedItemIndex].count += i.count;
                        state.inventory[foundedItemIndex].item.dateReceiving = date;
                    }
                    else if(i.id !== 'experience') { 
                        state.inventory.push({
                            item: { ...i, dateReceiving: date },
                            count: i.count
                        })
                    }
                }
            })
            
            localStorage.inventory = JSON.stringify(state.inventory);
            localStorage.player = JSON.stringify(state.player);
        },
        setInventory(state, action: PayloadAction<IItemInventory[]>){
            state.inventory = action.payload;
        },
        setEnemyDead(state, action: PayloadAction<IEnemyDead>) {
            const enemyIdInArea = action.payload.enemyIdInArea;
            const foundIndexArea = state.areas.findIndex(a => a.id === action.payload.levelId);
            const foundAreaEnemies = state.areas[foundIndexArea].currentEnemies;
            state.areas[foundIndexArea].currentEnemies =
                foundAreaEnemies.filter(e => e.idInArea !== enemyIdInArea);

            localStorage.areas = JSON.stringify(state.areas);
        },
        setPlayerFromStorage(state, action: PayloadAction<IPlayer>) {
            state.player = action.payload;
        },
        setPlayer(state, action: PayloadAction<IPlayer>) {
            state.player = action.payload;

            localStorage.player = JSON.stringify(state.player);
        },
        addXP(state, action: PayloadAction<number>){
            let gainedXP = action.payload;
            let currentXP = state.player.currentXP + gainedXP;
            let needXP = (state.player.level ** 2.7) + 10;

            while (gainedXP >= needXP) {
                state.player.level += 1;
                gainedXP -= needXP;
                needXP = (state.player.level ** 2.7) + 10;
                state.player.skillPoints += 5;
                console.log(state.player.level, gainedXP)
            }

            state.player.currentXP = gainedXP;

            localStorage.player = JSON.stringify(state.player);
        },
        addSkills(state, action: PayloadAction<ISkillUp[]>) {
            const skills = action.payload;
            skills.forEach(s => {
                if(s.id === 'missPercentChance' ||
                    s.id === 'attackSpeed' ||
                    s.id === 'movementSpeed' ||
                    s.id === 'treeSpeedMining' ||
                    s.id === 'oreSpeedMining'){
                    state.playerSkills[s.id]['level'] += s.countLevels;
                    state.playerSkills[s.id]['currentScores'] -= s.countSkills;
                }
                else{
                    state.playerSkills[s.id]['level'] += s.countLevels;
                    state.playerSkills[s.id]['currentScores'] += s.countSkills;
                }
            });

            localStorage.skills = JSON.stringify(state.playerSkills);
        },
        setSkills(state) {
            state.playerSkills = JSON.parse(localStorage.skills);
        },
        decrementSkillPoints(state, action: PayloadAction<number>){
            state.player.skillPoints -= action.payload;
            localStorage.player = JSON.stringify(state.player);
        }
        
    }
})

export default gameSlice.reducer;