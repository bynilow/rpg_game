import { Items } from "../../data/ItemsData";
import { Enemies } from "../../data/Enemies";
import { getChance, getRandomNumber } from "../../functions/Random";
import { IAreaItem, IBuyItem, IFullItemWithCount } from "../../models/IAreaItem";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemyDead } from "../../models/IEnemy";
import { IPlayer, ISkillUp } from "../../models/IPlayer";
import { AppDispatch } from "../store";
import { areaSlice } from "./AreaSlice";
import { userSlice } from "./UserSlice";

interface IResult {
    results: any[]
}

interface IUpdateAreaItems {
    levelId: string;
    date: string;
    itemsToUpdate: IAreaItem[];
}

interface IUpdateAreaEnemies {
    enemies: IAreaEnemy[];
    levelId: string;
}

export const goLevel = (levelId:string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.goLevel(levelId));
        dispatch(areaSlice.actions.getAvailablePaths(levelId));
    }
    catch(e){
        console.error(e)
    }
}

export const getAvailablePaths = (levelId:string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.getAvailablePaths(levelId));
    }
    catch(e){
        console.error(e)
    }
}

export const updateAreaItems = (updatedLevel: IUpdateAreaItems) => async (dispatch: AppDispatch) => {
    try{
        const items = updatedLevel.itemsToUpdate.map(i => {
            const count = getRandomNumber(i.countMin, i.countMax);
            if (count !== 0) {
                return {
                    id: i.id,
                    count
                }
            }
        });
        const filteredItems = items.filter(i => i !== undefined)!;
        dispatch(areaSlice.actions.updateAreaItems({
            levelId: updatedLevel.levelId,
            date: updatedLevel.date,
            items: filteredItems as []
        }));
        
    }
    catch(e){
        console.error(e)
    }
}

export const updateAreaEnemies = (updatedLevel: IUpdateAreaEnemies) => async (dispatch: AppDispatch) => {
    try{
        interface IEnemiesData{
            date: string;
            enemies: IAreaCurrentEnemy[];
            levelId: string;
        }
        let enemiesData:IEnemiesData = {
            date: new Date().toISOString(),
            enemies: [],
            levelId: updatedLevel.levelId
        };

        let enemies: IAreaCurrentEnemy[] = [];

        updatedLevel.enemies.forEach((e, ind) => {
            const count =
                e.countMax === e.countMin
                    ? e.countMax
                    : getRandomNumber(e.countMin, e.countMax);

            const currentEnemy = Enemies.find(ef => ef.id === e.id)!;
            const isSpawned = getChance(e.spawnChance);

            if (isSpawned) {
                for(let j = 0; j < count; j++){
                    switch (currentEnemy.type) {
                        case 'trader':
                            const possibleItems = currentEnemy.possibleLoot;
                            const items: IFullItemWithCount[] = [];
                            possibleItems.forEach(i => {
                                if (getChance(i.dropChance)) {
                                    const foundedItem = Items.find(fi => fi.id === i.id)!;
                                    let count = getRandomNumber(i.countMin, i.countMax);;
                                    items.push({ ...foundedItem, count })
                                }
                            })
                            enemies.push({
                                id: e.id,
                                idInArea: e.id + j,
                                level: 1,
                                levelId: enemiesData.levelId,
                                traderStats: {
                                    ...currentEnemy.traderStats!,
                                    tradingItems: items
                                }
                            })
                            break;

                        case 'enemy':
                            enemies.push({
                                id: e.id,
                                idInArea: e.id + j,
                                level: getRandomNumber(e.levelMin, e.levelMax),
                                levelId: enemiesData.levelId
                            })
                            break;

                        default:
                            enemies.push({
                                id: e.id,
                                idInArea: e.id + j,
                                level: getRandomNumber(e.levelMin, e.levelMax),
                                levelId: enemiesData.levelId
                            })
                            break;

                    }
                }
            }
        });
        enemiesData.enemies = enemies;
        dispatch(areaSlice.actions.updateAreaEnemies(enemiesData));
        
    }
    catch(e){
        console.error(e)
    }
}

export const mineItemAC = (miningItem: IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.mineItem(miningItem));
        dispatch(userSlice.actions.addItemsToInventory([miningItem]));
        
    }
    catch(e){
        console.error(e)
    }
}

export const setAreasFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.setAreasFromStorage());
    }
    catch(e){
        console.error(e)
    }
}

export const addItemsToInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.addItemsToInventory(items));
    }
    catch(e){
        console.error(e)
    }
}

export const removeItemsFromInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.removeItemsFromInventory(items));
    }
    catch(e){
        console.error(e)
    }
}

export const setInventoryFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        const items = JSON.parse(localStorage.inventory);
        dispatch(userSlice.actions.setInventory(items));
        
    }
    catch(e){
        console.error(e)
    }
}

export const setDeadEnemy = ({...enemy}: IEnemyDead) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.setEnemyDead(enemy));
    }
    catch(e){
        console.error(e)
    }
}

export const addXP = (xp: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.addXP(xp));
    }
    catch(e){
        console.error(e)
    }
}

export const addSkills = (skills: ISkillUp[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.addSkills(skills));
    }
    catch(e){
        console.error(e)
    }
}

export const decrementSkillPoints = (points: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.decrementSkillPoints(points));
    }
    catch(e){
        console.error(e)
    }
}

export const equipItem = (id: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.equipItem(id));
    }
    catch(e){
        console.error(e)
    }
}

export const buyItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.removeItemTrader(buyingItem));
        
        dispatch(userSlice.actions.addItemsToInventory([buyingItem.item]));
        dispatch(userSlice.actions.removeCoins(buyingItem.item.cost * buyingItem.item.count));
    }
    catch (e){
        console.error(e)
    }
}

export const sellItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.sellItem(buyingItem));
    }
    catch (e){
        console.error(e)
    }
}

export const setHealthPoints = (health: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.setHealthPoints(health));
    }
    catch(e){
        console.error(e)
    }
}
