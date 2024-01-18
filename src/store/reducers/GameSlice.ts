import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Items } from "../../data/AreaItems";
import { Enemies } from "../../data/Enemies";
import { Locations } from "../../data/Locations";
import { IArea, IAviablePath, IPath } from "../../models/IArea";
import { IBuyItem, IFullItem, IFullItemWithCount } from "../../models/IAreaItem";
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
    craftSpeed: {
        baseCount: 0,
        currentScores: 0,
        countScores: 0.1,
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

interface GameSlice {
    currentLocation: IArea;
    availablePaths: IAviablePath[];
    paths: IPath[];
    areas: IArea[];
    enemies: IEnemy[];
    areaItems: IFullItem[];
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
    currentLocation: localStorage.areas ? JSON.parse(localStorage.areas)[0] : Locations[0],
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
            pathA: 'central_castle',
            pathB: 'central_castle_shopping_street',
            time: 2.3
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
    areas: localStorage.areas ? JSON.parse(localStorage.areas) : Locations,
    enemies: Enemies,
    areaItems: Items,
    inventory: [],
    player: {
        title: 'peesoos',
        health: 150,
        avatar: '',
        coins: 100,
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
        },
        headStats: {
            speedMovement: 0,
            dodgeChance: 0,
            healthMultiplier: 0,
            missChance: 0,
            speedAttack: 0
        },
        chestStats: {
            speedMovement: 0,
            dodgeChance: 0,
            healthMultiplier: 0,
            missChance: 0,
            speedAttack: 0
        },
        footStats: {
            speedMovement: 0,
            dodgeChance: 0,
            healthMultiplier: 0,
            missChance: 0,
            speedAttack: 0
        },
        weaponStats: {
            damage: 0,
            critChance: 0,
            critDamageMultiplier: 0,
            blockingChancePercent: 0,
            blockingMultiplier: 0,
            missChance: 0,
            speedAttack: 0
        },
        axeStats: {
            doubleChancePercent: 0,
            miningSpeed: 0
        },
        pickaxeStats: {
            doubleChancePercent: 0,
            miningSpeed: 0
        }
    },
    playerSkills: baseStats,

}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>) {
            state.currentLocation = state.areas.find(p => p.id === action.payload)!;
        },
        getAvailablePaths(state, action: PayloadAction<string>) {
            const levelId = action.payload;

            const paths: IAviablePath[] = state.paths.filter(p => (p.pathA + ' ' + p.pathB).includes(levelId))
                .map(i => ({
                    pathId: i.pathA !== levelId ? i.pathA : i.pathB,
                    time: i.time
                }))
            state.availablePaths = paths;
        },
        updateAreaItems(state, action: PayloadAction<IUpdateAreaItems>) {
            const payloadLevelId = action.payload.levelId;
            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);
            const payloadItems = action.payload.items;

            const payloadDate = action.payload.date;
            const nextRespawn = new Date(new Date(payloadDate).setMinutes(
                new Date(payloadDate).getMinutes() + state.areas[foundedIndex].timeToRespawnAreaItems)).toISOString();

            state.areas[foundedIndex].lastRespawnAreaItems = payloadDate;
            state.areas[foundedIndex].nextRespawnAreaItems = nextRespawn;

            let items: IFullItem[] = [];
            payloadItems.forEach(i => {
                for (let j = 0; j < i.count; j++) {
                    const foundedItem = state.areaItems.find(si => si.id === i.id)!;
                    items.push({ ...foundedItem, idInArea: i.id + j });
                }
            });
            
            state.areas[foundedIndex].currentAreaItems = items!;
            state.currentLocation = state.areas[foundedIndex];
            localStorage.areas = JSON.stringify(state.areas);
        },
        updateAreaEnemies(state, action: PayloadAction<IUpdateAreaEnemies>) {
            const payloadEnemies = action.payload.enemies;
            const payloadDate = action.payload.date;
            const payloadLevelId = payloadEnemies[0].levelId;
            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);

            const nextRespawn = new Date(new Date(payloadDate).setMinutes(
                new Date(payloadDate).getMinutes() + state.areas[foundedIndex].timeToRespawnAreaEnemies)).toISOString();

            state.areas[foundedIndex].lastRespawnAreaEnemies = payloadDate;
            state.areas[foundedIndex].nextRespawnAreaEnemies = nextRespawn;

            let enemies: IAreaCurrentEnemy[] = [];
            payloadEnemies.forEach((e) => {
                enemies.push(e);
            });

            state.areas[foundedIndex].currentEnemies = enemies!;
            state.currentLocation = state.areas[foundedIndex];
            localStorage.areas = JSON.stringify(state.areas);
        },
        mineItem(state, action: PayloadAction<IFullItem>) {
            const indexLevel = state.areas.findIndex(i => i.id === state.currentLocation?.id);
            const currentAreaItems = state.areas[indexLevel].currentAreaItems;
            const idInArea = action.payload.idInArea;

            state.areas[indexLevel].currentAreaItems = state.areas[indexLevel].currentAreaItems.
                filter(i => i.idInArea !== idInArea);

            state.currentLocation = state.areas[indexLevel];
            localStorage.areas = JSON.stringify(state.areas);

        },
        setAreasFromStorage(state) {
            state.areas = JSON.parse(localStorage.areas);
        },
        addItemToInventory(state, action: PayloadAction<IFullItemWithCount>) {
            const foundedItemIndex = state.inventory.findIndex(i => i.item.id === action.payload.id);
            const date = new Date().toISOString();
            const count = action.payload.count;

            if (foundedItemIndex !== -1) {
                state.inventory[foundedItemIndex].count += count;
                state.inventory[foundedItemIndex].item.dateReceiving = date;
            }
            else {
                state.inventory.push({
                    item: { ...action.payload, dateReceiving: date },
                    count
                })
            }
            localStorage.inventory = JSON.stringify(state.inventory);
        },
        addItemsToInventory(state, action: PayloadAction<IFullItemWithCount[]>) {
            const date = new Date().toISOString();
            const items = action.payload;

            items.forEach(i => {
                if (i.id === 'coin') {
                    state.player.coins += i.count;
                }
                else {
                    const foundedItemIndex = state.inventory.findIndex(si => si.item.id === i.id);
                    if (foundedItemIndex !== -1) {
                        state.inventory[foundedItemIndex].count += i.count;
                        state.inventory[foundedItemIndex].item.dateReceiving = date;
                    }
                    else if (i.id !== 'experience') {
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
        removeItemsFromInventory(state, action: PayloadAction<IFullItemWithCount[]>) {
            const items = action.payload;

            items.forEach(i => {
                const foundedItem = state.inventory.find(fi => fi.item.id === i.id)!;
                if (foundedItem.count === i.count) {
                    state.inventory = state.inventory.filter(fi => fi.item.id !== i.id);
                }
                else {
                    const foundedIndex = state.inventory.findIndex(fi => fi.item.id === i.id)!;
                    state.inventory[foundedIndex].count -= i.count;
                }
            })

            localStorage.inventory = JSON.stringify(state.inventory);
        },
        setInventory(state, action: PayloadAction<IItemInventory[]>) {
            state.inventory = action.payload;
        },
        setEnemyDead(state, action: PayloadAction<IEnemyDead>) {
            const enemyIdInArea = action.payload.enemyIdInArea;
            const foundIndexArea = state.areas.findIndex(a => a.id === action.payload.levelId);
            const foundAreaEnemies = state.areas[foundIndexArea].currentEnemies;
            state.areas[foundIndexArea].currentEnemies =
                foundAreaEnemies.filter(e => e.idInArea !== enemyIdInArea);

            state.currentLocation = state.areas[foundIndexArea];
            localStorage.areas = JSON.stringify(state.areas);
        },
        setPlayerFromStorage(state, action: PayloadAction<IPlayer>) {
            state.player = action.payload;
        },
        setPlayer(state, action: PayloadAction<IPlayer>) {
            state.player = action.payload;

            localStorage.player = JSON.stringify(state.player);
        },
        addXP(state, action: PayloadAction<number>) {
            let gainedXP = action.payload;
            let currentXP = state.player.currentXP;
            let needXP = (state.player.level ** 2.7) + 10;

            while (gainedXP + currentXP >= needXP) {
                state.player.level += 1;
                gainedXP -= needXP;
                needXP = (state.player.level ** 2.7) + 10;
                state.player.skillPoints += 5;
                console.log(state.player.level, gainedXP)
            }

            state.player.currentXP += gainedXP;

            localStorage.player = JSON.stringify(state.player);
        },
        addSkills(state, action: PayloadAction<ISkillUp[]>) {
            const skills = action.payload;
            skills.forEach(s => {
                if (s.id === 'missPercentChance' ||
                    s.id === 'attackSpeed' ||
                    s.id === 'movementSpeed' ||
                    s.id === 'treeSpeedMining' ||
                    s.id === 'oreSpeedMining') {
                    state.playerSkills[s.id]['level'] += s.countLevels;
                    state.playerSkills[s.id]['currentScores'] -= s.countSkills;
                }
                else {
                    state.playerSkills[s.id]['level'] += s.countLevels;
                    state.playerSkills[s.id]['currentScores'] += s.countSkills;
                }
            });

            localStorage.skills = JSON.stringify(state.playerSkills);
        },
        setSkills(state) {
            state.playerSkills = JSON.parse(localStorage.skills);
        },
        decrementSkillPoints(state, action: PayloadAction<number>) {
            state.player.skillPoints -= action.payload;
            localStorage.player = JSON.stringify(state.player);
        },
        equipItem(state, action: PayloadAction<string>){
            const itemId = action.payload;
            const foundedIndex = state.inventory.findIndex(i => i.item.id === itemId)!;
            const foundedItem = state.inventory.find(i => i.item.id === itemId);
            const foundedItemIsEquiped = state.inventory.find(i => i.item.id === itemId)!.isEquipped;
            const foundedType = foundedItem?.item.subType || foundedItem?.item.type;

            state.inventory = state.inventory.map(i =>
                i.item.subType === foundedType || i.item.type === foundedType
                    ? i.item.id === itemId
                        ? {
                            ...i,
                            isEquipped: !foundedItemIsEquiped
                        }
                        : {
                            ...i,
                            isEquipped: false
                        }
                    : i)

            const armorStats = foundedItem?.item.armorStats;
            const weaponStats = foundedItem?.item.weaponStats;
            const toolStats = foundedItem?.item.toolStats;


            switch(foundedType){
                case 'head':
                    if(!foundedItemIsEquiped){
                        state.player.headStats = { ...armorStats! }
                    }
                    else{
                        state.player.headStats = {
                            dodgeChance: 0,
                            healthMultiplier: 0,
                            missChance: 0,
                            speedAttack: 0,
                            speedMovement: 0,
                        }
                    }
                    break;
                case 'chest':
                    if(!foundedItemIsEquiped){
                        state.player.chestStats = { ...armorStats! }
                    }
                    else{
                        state.player.chestStats = {
                            dodgeChance: 0,
                            healthMultiplier: 0,
                            missChance: 0,
                            speedAttack: 0,
                            speedMovement: 0,
                        }
                    }
                    break;
                case 'foot':
                    if(!foundedItemIsEquiped){
                        state.player.footStats = { ...armorStats! }
                    }
                    else{
                        state.player.footStats = {
                            dodgeChance: 0,
                            healthMultiplier: 0,
                            missChance: 0,
                            speedAttack: 0,
                            speedMovement: 0,
                        }
                    }
                    break;
                case 'weapon':
                    if(!foundedItemIsEquiped){
                        state.player.weaponStats = { ...weaponStats! }
                    }
                    else{
                        state.player.weaponStats = {
                            blockingChancePercent: 0,
                            blockingMultiplier: 0,
                            critChance: 0,
                            critDamageMultiplier: 0,
                            damage: 0,
                            missChance: 0,
                            speedAttack: 0
                        }
                    }
                    break;
                case 'axe':
                    if(!foundedItemIsEquiped){
                        state.player.axeStats = { ...toolStats! }
                    }
                    else{
                        state.player.axeStats = {
                            doubleChancePercent: 0,
                            miningSpeed: 0
                        }
                    }
                    break;
                case 'pickaxe':
                    if(!foundedItemIsEquiped){
                        state.player.pickaxeStats = { ...toolStats! }
                    }
                    else{
                        state.player.pickaxeStats = {
                            doubleChancePercent: 0,
                            miningSpeed: 0
                        }
                    }
                    break;
            }

            localStorage.inventory = JSON.stringify(state.inventory);
            localStorage.player = JSON.stringify(state.player);
        },
        buyItem(state, action: PayloadAction<IBuyItem>) {
            const itemId = action.payload.item.id;
            const foundedItemIndex = state.inventory.findIndex(i => i.item.id === itemId);
            const date = new Date().toISOString();
            const count = action.payload.item.count;
            const costPerUnit = action.payload.buyingCostPerUnit;
            const traderId = action.payload.traderId;
            const locationId = action.payload.levelId;

            if (foundedItemIndex !== -1) {
                state.inventory[foundedItemIndex].count += count;
                state.inventory[foundedItemIndex].item.dateReceiving = date;
            }
            else {
                state.inventory.push({
                    item: { ...action.payload.item, dateReceiving: date },
                    count
                })
            }
            state.player.coins -= count * costPerUnit;
            state.player.coins = Number(state.player.coins.toFixed(1));
            
            const foundedLocationIndex = state.areas.findIndex(a => a.id === locationId)!;
            const foundedTraderInLocationIndex = state.areas[foundedLocationIndex].currentEnemies.findIndex(e => e.id === traderId)!;
            const foundedTrader = state.areas[foundedLocationIndex].currentEnemies[foundedTraderInLocationIndex];
            let foundedItemIndexInTrader = foundedTrader.traderStats!.tradingItems.findIndex(i => i.id === itemId)!;
            let foundedItemInTrader = foundedTrader.traderStats!.tradingItems.find(i => i.id === itemId)!;
            
            console.log("foundedLocationIndex", foundedLocationIndex)
            console.log("foundedTraderInLocationIndex", foundedTraderInLocationIndex)
            console.log("foundedTrader", foundedTrader)
            if(foundedItemInTrader.count - count > 0){
                foundedItemInTrader.count -= count;
                state.areas[foundedLocationIndex]
                    .currentEnemies[foundedTraderInLocationIndex]
                        .traderStats!.tradingItems[foundedItemIndexInTrader] = foundedItemInTrader;
            }
            else{
                state.areas[foundedLocationIndex]
                    .currentEnemies[foundedTraderInLocationIndex]
                        .traderStats!.tradingItems.splice(foundedItemIndexInTrader, 1);
            }

            
            localStorage.areas = JSON.stringify(state.areas);
            localStorage.player = JSON.stringify(state.player);
            localStorage.inventory = JSON.stringify(state.inventory);
        },
        sellItem(state, action: PayloadAction<IBuyItem>) {
            const itemId = action.payload.item.id;
            const itemIndex = state.inventory.findIndex(i => i.item.id === itemId);
            const count = action.payload.item.count;
            const costPerUnit = action.payload.buyingCostPerUnit;

            if(state.inventory[itemIndex].count - count > 0){
                state.inventory[itemIndex].count -= count;
            }
            else{
                state.inventory.splice(itemIndex, 1)
            }

            state.player.coins += count * costPerUnit;

            localStorage.player = JSON.stringify(state.player);
            localStorage.inventory = JSON.stringify(state.inventory);
        },

    }
})

export default gameSlice.reducer;