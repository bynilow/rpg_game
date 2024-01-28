import { Items } from "../../data/AreaItems";
import { Enemies } from "../../data/Enemies";
import { getChance, getRandomNumber } from "../../functions/Random";
import { IAreaItem, IBuyItem, IFullItemWithCount } from "../../models/IAreaItem";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemyDead } from "../../models/IEnemy";
import { IPlayer, ISkillUp } from "../../models/IPlayer";
import { AppDispatch } from "../store";
import { gameSlice } from "./GameSlice";

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
        dispatch(gameSlice.actions.goLevel(levelId));
        dispatch(gameSlice.actions.getAvailablePaths(levelId));
    }
    catch(e){
        console.error(e)
    }
}

export const getAvailablePaths = (levelId:string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.getAvailablePaths(levelId));
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
        dispatch(gameSlice.actions.updateAreaItems({
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
        dispatch(gameSlice.actions.updateAreaEnemies(enemiesData));
        
    }
    catch(e){
        console.error(e)
    }
}

export const addMinedItem = (miningItem: IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.mineItem(miningItem));
        dispatch(gameSlice.actions.addItemToInventory(miningItem));
        
    }
    catch(e){
        console.error(e)
    }
}

export const setAreasFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setAreasFromStorage());
    }
    catch(e){
        console.error(e)
    }
}

export const addItemToInventory = (item:IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addItemToInventory(item));
    }
    catch(e){
        console.error(e)
    }
}

export const addItemsToInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addItemsToInventory(items));
    }
    catch(e){
        console.error(e)
    }
}

export const removeItemsFromInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.removeItemsFromInventory(items));
    }
    catch(e){
        console.error(e)
    }
}

export const setInventoryFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        const items = JSON.parse(localStorage.inventory);
        dispatch(gameSlice.actions.setInventory(items));
        
    }
    catch(e){
        console.error(e)
    }
}

export const setDeadEnemy = ({...enemy}: IEnemyDead) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setEnemyDead(enemy));
    }
    catch(e){
        console.error(e)
    }
}

export const setPlayerFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        const player = JSON.parse(localStorage.player);
        dispatch(gameSlice.actions.setPlayerFromStorage(player));
    }
    catch(e){
        console.error(e)
    }
}

export const setPlayer = (player: IPlayer) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setPlayer(player));
    }
    catch(e){
        console.error(e)
    }
}

export const addXP = (xp: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addXP(xp));
    }
    catch(e){
        console.error(e)
    }
}

export const addSkills = (skills: ISkillUp[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addSkills(skills));
    }
    catch(e){
        console.error(e)
    }
}

export const setSkillsFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setSkills());
    }
    catch(e){
        console.error(e)
    }
}

export const decrementSkillPoints = (points: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.decrementSkillPoints(points));
    }
    catch(e){
        console.error(e)
    }
}

export const equipItem = (id: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.equipItem(id));
    }
    catch(e){
        console.error(e)
    }
}

export const buyItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.buyItem(buyingItem));
    }
    catch (e){
        console.error(e)
    }
}

export const sellItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.sellItem(buyingItem));
    }
    catch (e){
        console.error(e)
    }
}

export const setHealthPoints = (health: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setHealthPoints(health));
    }
    catch(e){
        console.error(e)
    }
}

export const removeItemFromInventory = (item: IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.removeItemFromInventory(item));
    }
    catch(e){
        console.error(e)
    }
}