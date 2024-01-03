import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFullItem, IAreaItem } from "../../models/IAreaItem";
import { IPath, IArea, ILocationToMove, IAviablePath } from "../../models/IArea";
import { IInventory, IItemInventory } from "../../models/IInventory";
import { IEnemy, IEnemyType } from "../../models/IEnemy";





interface GameSlice {
    currentLocationId: string;
    availablePaths: IAviablePath[];
    paths: IPath[];
    areas: IArea[];
    enemies: IEnemy[];
    areaItems: IFullItem[];
    currentAreaItem: IFullItem | {};
    currentAreaItemMiningTime: number;
    currentAreaToMove: ILocationToMove;
    inventory: IItemInventory[];
    coins: number;
}

interface IUpdateAreaItems {
    levelId: string;
    date: string;
    items: {
        id: string;
        count: number
    }[];
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
            "level": 1,
            "attackSpeed": 8,
            "currentAttackTime": 8,
            "damage": 5,
            "critDamageMultiplier": 1.3,
            "critChance": 15,
            "maxHealth": 70,
            "health": 70,
            "dodgeChance": 15,
            "blockingChance": 20,
            "blockingMultiplier": 2.5,
            "missChance": 10,
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
            "cost": 1
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
            "cost": 3
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
            "cost": 7
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
            "cost": 18
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
            "cost": 35
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
            "cost": 70
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
            "cost": 5
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
            "cost": 13
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
            "cost": 34
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
            "cost": 65
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
            "cost": 93
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
            "cost": 8
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
            "cost": 3
        }
    ],
    currentAreaToMove: {
        time: 0,
        locationId: 'south_beach'
    },
    currentAreaItem: {},
    currentAreaItemMiningTime: 0,
    inventory: [],
    coins: 0
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>){
            state.currentLocationId = state.areas.find(p => p.id === action.payload)!.id;
            // state.currentAreaToMove.time = 0;
        },
        getAvailablePaths(state, action: PayloadAction<string>){
            const levelId = action.payload;
            // if(state.currentAreaToMove.locationId !== ''){
            //     state.availablePaths = state.paths.filter(p => (p.pathA+' '+p.pathB).includes(levelId));
            // }
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
            // if(JSON.stringify(state.currentLocation) !== localStorage.areas[0]){
            //     state.currentLocation = JSON.parse(localStorage.areas)[0];
            //     console.log("TRUE")
            //     console.log(JSON.parse(localStorage.areas)[0])
            // }
        },
        addItemToInventory(state, action: PayloadAction<IFullItem>){
            const foundedItemIndex = state.inventory.findIndex(i => i.item.id === action.payload.id);
            const date = new Date().toISOString();
            if(foundedItemIndex !== -1){
                state.inventory[foundedItemIndex].count += 1;
                state.inventory[foundedItemIndex].item.dateReceiving = date;
            }
            else{
                state.inventory.push({
                    item: {...action.payload, dateReceiving: date},
                    count: 1
                })
            }
            localStorage.inventory = JSON.stringify(state.inventory);
        },
        setInventory(state, action: PayloadAction<IItemInventory[]>){
            state.inventory = action.payload;
        }


    }
})

export default gameSlice.reducer;