import axios from "axios";
import { AppDispatch } from "../store";
import { gameSlice } from "./GameSlice";
import { ILocationToMove } from "../../models/IArea";
import { IFullItem, IAreaItem, IFullItemWithCount, IBuyItem } from "../../models/IAreaItem";
import { useAppSelector } from "../../hooks/redux";
import { IItemInventory } from "../../models/IInventory";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemyDead } from "../../models/IEnemy";
import { IPlayer, ISkillUp } from "../../models/IPlayer";
import { getChance, getRandomNumber } from "../../functions/Random";
import { Enemies } from "../../data/Enemies";
import { Items } from "../../data/AreaItems";

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
    catch{

    }
}

export const getAvailablePaths = (levelId:string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.getAvailablePaths(levelId));
    }
    catch{

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
        console.log('wtf')
        dispatch(gameSlice.actions.updateAreaItems({
            levelId: updatedLevel.levelId,
            date: updatedLevel.date,
            items: filteredItems as []
        }));
        
    }
    catch(e){
        console.log(e)
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
    catch{

    }
}

export const addMinedItem = (miningItem: IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.mineItem(miningItem));
        dispatch(gameSlice.actions.addItemToInventory(miningItem));
        
    }
    catch{

    }
}

export const setAreasFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setAreasFromStorage());
    }
    catch{

    }
}

export const addItemToInventory = (item:IFullItemWithCount) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addItemToInventory(item));
    }
    catch{

    }
}

export const addItemsToInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addItemsToInventory(items));
    }
    catch{

    }
}

export const removeItemsFromInventory = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.removeItemsFromInventory(items));
    }
    catch{

    }
}

export const setInventoryFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        const items = JSON.parse(localStorage.inventory);
        dispatch(gameSlice.actions.setInventory(items));
        
    }
    catch{

    }
}

export const setDeadEnemy = ({...enemy}: IEnemyDead) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setEnemyDead(enemy));
    }
    catch{

    }
}

export const setPlayerFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        const player = JSON.parse(localStorage.player);
        dispatch(gameSlice.actions.setPlayerFromStorage(player));
    }
    catch{

    }
}

export const setPlayer = (player: IPlayer) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setPlayer(player));
    }
    catch{

    }
}

export const addXP = (xp: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addXP(xp));
    }
    catch{

    }
}

export const addSkills = (skills: ISkillUp[]) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addSkills(skills));
    }
    catch{

    }
}

export const setSkillsFromStorage = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setSkills());
    }
    catch{

    }
}

export const decrementSkillPoints = (points: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.decrementSkillPoints(points));
    }
    catch{

    }
}

export const equipItem = (id: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.equipItem(id));
    }
    catch{

    }
}

export const buyItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.buyItem(buyingItem));
    }
    catch (e){
        console.log(e)
    }
}

export const sellItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.sellItem(buyingItem));
    }
    catch (e){
        console.log(e)
    }
}

export const setHealthPoints = (health: number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setHealthPoints(health));
    }
    catch{

    }
}




