import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IItemInventory } from "../../models/IInventory";
import { IPlayer, IPlayerBaseStats, ISkillUp } from "../../models/IPlayer";
import { IBuyItem, IFullItemWithCount } from "../../models/IAreaItem";
import { PlayerBaseStats } from "../../data/PlayerStats";
import { IBuff } from "../../models/IBuff";
import { Models } from "appwrite";
import { BASE_COUNT_SKILL_POINTS } from "../../const/const";

const emptyPlayer: IPlayer = {
    title: 'character player',
    avatar: '',
    health: 100,
    actionText: {
        communicationText: [],
        combatText: ['ударил'],
        critDamageText: 'ударил сильно',
        successBlockingText: 'заблокировал удар',
        successBlockingCritText: 'заблокировал крит',
        failedBlockingText: '',
        dodgeText: 'увернулся',
        missText: 'промахнулся'
    },
    level: 1,
    currentXP: 0,
    skillPoints: BASE_COUNT_SKILL_POINTS,
    coins: 0,
    headStats: {
        health: 0,
        missChance: 0,
        dodgeChance: 0,
        speedMovement: 0,
        speedAttack: 0
    },
    chestStats: {
        health: 0,
        missChance: 0,
        dodgeChance: 0,
        speedMovement: 0,
        speedAttack: 0
    },
    footStats: {
        health: 0,
        missChance: 0,
        dodgeChance: 0,
        speedMovement: 0,
        speedAttack: 0
    },
    weaponStats: {
        damage: 0,
        missChance: 0,
        blockingChancePercent: 0,
        blockingMultiplier: 0,
        critDamageMultiplier: 0,
        critChance: 0,
        speedAttack: 0
    },
    axeStats: {
        miningSpeed: 0,
        doubleChancePercent: 0
    },
    pickaxeStats: {
        miningSpeed: 0,
        doubleChancePercent: 0
    }
}

const testingBuffs: IBuff[] = [
    {
        title: 'Зелье силы',
        description: 'Зелье силы дает силу',
        idStat: 'baseDamage',
        count: 100,
        type: '',
        dateReceived: 'now',
        dateExpires: 'now',
    },
    {
        title: 'Зелье добычи руды',
        description: 'Ускоряет скорость шахтерства',
        idStat: 'oreSpeedMining',
        count: -2.5,
        type: 's',
        dateReceived: 'now',
        dateExpires: 'now',
    },
    {
        title: 'Бафчик уклонения',
        description: 'накидывает шансов уклонения',
        idStat: 'dodgePercentChance',
        count: 35,
        type: '%',
        dateReceived: 'now',
        dateExpires: 'now',
    }
]

interface IUserSlice {
    inventory: IItemInventory[];
    player: IPlayer;
    playerSkills: IPlayerBaseStats;
    buffs: IBuff[];
    userData: Models.User<Models.Preferences>;
    isLoading: boolean;
}

const initialState: IUserSlice = {
    inventory: [],
    player: emptyPlayer,
    playerSkills: PlayerBaseStats,
    buffs: testingBuffs,
    userData: {} as Models.User<Models.Preferences>,
    isLoading: true
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
        setExperience(state, action: PayloadAction<number>){
            state.player.currentXP = action.payload;
        },
        setLevel(state, action: PayloadAction<number>){
            state.player.level = action.payload;
        },
        setSkillPoints(state, action: PayloadAction<number>){
            state.player.skillPoints = action.payload;
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
        addSkillPoints(state, action: PayloadAction<number>){
            state.player.skillPoints += action.payload;
        },
        decrementSkillPoints(state, action: PayloadAction<number>) {
            state.player.skillPoints -= action.payload;
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
                            health: 0,
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
                            health: 0,
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
                            health: 0,
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

            localStorage.player = JSON.stringify(state.player);
        },
        removeCoins(state, action: PayloadAction<number>) {
            state.player.coins -= action.payload;
            
            localStorage.player = JSON.stringify(state.player);
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
        },
        setHealthPoints(state, action: PayloadAction<number>){
            const payloadHealth = action.payload;
            state.player.health = payloadHealth;

            localStorage.player = JSON.stringify(state.player);
        },
        setUser(state, action: PayloadAction<Models.User<Models.Preferences>>){
            state.userData = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload;
        },
        addCoins(state, action: PayloadAction<number>){
            state.player.coins += action.payload;
        },
        setCoins(state, action: PayloadAction<number>){
            state.player.coins = action.payload;
        }
    }
})

export default userSlice.reducer;