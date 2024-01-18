import axios from "axios";
import { AppDispatch } from "../store";
import { gameSlice } from "./GameSlice";
import { ILocationToMove } from "../../models/IArea";
import { IFullItem, IAreaItem, IFullItemWithCount } from "../../models/IAreaItem";
import { useAppSelector } from "../../hooks/redux";
import { IItemInventory } from "../../models/IInventory";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemyDead } from "../../models/IEnemy";
import { IPlayer, ISkillUp } from "../../models/IPlayer";
import { getChance, getRandomNumber } from "../../functions/Random";

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
            const count = getRandomNumber(e.countMin, e.countMax);
            const isSpawned = getChance(e.spawnChance);
            if (isSpawned) {
                for(let j = 0; j <= count; j++){
                    enemies.push({
                        id: e.id,
                        idInArea: e.id + j,
                        level: getRandomNumber(e.levelMin, e.levelMax),
                        levelId: enemiesData.levelId
                    })
                }
            }
        });
        enemiesData.enemies = enemies;
        dispatch(gameSlice.actions.updateAreaEnemies(enemiesData));
        
    }
    catch{

    }
}

export const mineItem = (miningItem: IFullItemWithCount) => async (dispatch: AppDispatch) => {
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




