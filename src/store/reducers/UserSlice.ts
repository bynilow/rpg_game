import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IItemInventory } from "../../models/IInventory";
import { IPlayer, IPlayerBaseStats, ISkillUp } from "../../models/IPlayer";
import { IBuyItem, IFullItemWithCount } from "../../models/IAreaItem";

const baseStats: IPlayerBaseStats = {
    baseDamage: {
        baseCount: 5,
        currentScores: 5,
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
        baseCount: 100,
        currentScores: 100,
        countScores: 1,
        level: 1
    },
    maxHealthMultiplier: {
        baseCount: 1,
        currentScores: 1,
        countScores: 0.3,
        level: 1
    },
    healthRegenerationScore: {
        baseCount: 1,
        currentScores: 1,
        countScores: 1.5,
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

interface IUserSlice {
    inventory: IItemInventory[];
    player: IPlayer;
    playerSkills: IPlayerBaseStats;
}

const initialState: IUserSlice = {
    inventory: [],
    player: JSON.parse(localStorage.player),
    playerSkills: JSON.parse(localStorage.skills),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: { 
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
        addXP(state, action: PayloadAction<number>) {
            let gainedXP = action.payload;
            let currentXP = state.player.currentXP;
            let needXP = (state.player.level ** 2.7) + 10;

            while (gainedXP + currentXP >= needXP) {
                state.player.level += 1;
                gainedXP -= needXP;
                needXP = (state.player.level ** 2.7) + 10;
                state.player.skillPoints += 5;
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

            state.inventory = state.inventory.map(i => {
                if(i.item.subType === foundedType || i.item.type === foundedType){
                    if(i.item.id === itemId){
                        return {
                            ...i,
                            isEquipped: !foundedItemIsEquiped
                        }
                    }
                    else{
                        return {
                            ...i,
                            isEquipped: false
                        }
                    }
                }
                else{
                    return i
                }
            })

            const armorStats = foundedItem?.item.armorStats;
            const weaponStats = foundedItem?.item.weaponStats;
            const toolStats = foundedItem?.item.toolStats;

            switch(foundedType){
                case 'helmet':
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
        removeCoins(state, action: PayloadAction<number>) {
            state.player.coins -= action.payload;
            
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
        setHealthPoints(state, action: PayloadAction<number>){
            const payloadHealth = action.payload;
            state.player.health = payloadHealth;

            localStorage.player = JSON.stringify(state.player);
        }
    }
})

export default userSlice.reducer;