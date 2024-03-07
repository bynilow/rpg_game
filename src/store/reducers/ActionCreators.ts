import { Items } from "../../data/ItemsData";
import { Enemies } from "../../data/Enemies";
import { getChance, getRandomNumber } from "../../functions/Random";
import { IAreaItem, IBuyItem, IFullItemWithCount } from "../../models/IAreaItem";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemyDead } from "../../models/IEnemy";
import { IPlayer, ISkillUp } from "../../models/IPlayer";
import { AppDispatch } from "../store";
import { areaSlice } from "./AreaSlice";
import { userSlice } from "./UserSlice";
import { account, client, databases } from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { Databases, ID, Query } from "appwrite";
import { inventoryCollection, statsCollection } from "../../appwrite/databaseConfig";
import { getExistsItem } from "../../appwrite/api/inventory/getExistsItem";
import { addItemsToInventory } from "../../appwrite/api/inventory/addItemsToInventory";
import { removeItemsFromInventory } from "../../appwrite/api/inventory/removeItemsFromInventory";
import { getUserStats } from "../../appwrite/api/stats/getUserStats";
import { BASE_COUNT_SKILL_POINTS, MULTIPLIER_NEED_EXPERIENCE } from "../../const/const";
import { addCoins } from "../../appwrite/api/stats/addCoins";
import { removeCoins } from "../../appwrite/api/stats/removeCoins";
import { addExperience } from "../../appwrite/api/stats/addExperience";
import { removeSkillPoints } from "../../appwrite/api/stats/changeSkillPoints";
import { addSkill } from "../../appwrite/api/skills/addSkill";

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
        
        await addItemsToInventory([{id: miningItem.id, count: miningItem.count}]);

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

export const addItemsToInventoryAC = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        items = items.filter(item => item.id !== 'coin' && item.id !== 'experience');
        await addItemsToInventory(items.map(item => ({id: item.id, count: item.count})));
        dispatch(userSlice.actions.addItemsToInventory(items));
    }
    catch(e){
        console.error(e)
    }
}

export const removeItemsFromInventoryAC = (items:IFullItemWithCount[]) => async (dispatch: AppDispatch) => {
    try{
        await removeItemsFromInventory(items.map(item => ({id: item.id, count: item.count})));

        dispatch(userSlice.actions.removeItemsFromInventory(items));
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

export const addXPAC = (xp: number) => async (dispatch: AppDispatch) => {
    try {
        console.log('закинуто опыта: ', xp)
        await addExperience(xp);
        dispatch(userSlice.actions.addXP(xp));
    }
    catch(e){
        console.error(e)
    }
}

export const addSkillsAC = (skills: ISkillUp[]) => async (dispatch: AppDispatch) => {
    try{
        skills.forEach(async (skill) => {
            await addSkill(skill.id, skill.countLevels);
        })
        dispatch(userSlice.actions.addSkills(skills));
    }
    catch(e){
        console.error(e)
    }
}

export const addSkillPointsAC = (points: number) => async (dispatch: AppDispatch) => {
    try{
        await addSkillPointsAC(points);
        dispatch(userSlice.actions.addSkillPoints(points));
    }
    catch(e){
        console.error(e)
    }
}

export const decrementSkillPoints = (points: number) => async (dispatch: AppDispatch) => {
    try{
        await removeSkillPoints(points);
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

export const addCoinsAC = (coins: number) => async (dispatch: AppDispatch) => {
    try{
        await addCoins(coins);
        dispatch(userSlice.actions.addCoins(coins));
    }
    catch (e){
        console.error(e)
    }
}

export const removeCoinsAC = (coins: number) => async (dispatch: AppDispatch) => {
    try{
        await removeCoins(coins);
        dispatch(userSlice.actions.removeCoins(coins));
    }
    catch (e){
        console.error(e)
    }
}

export const buyItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(areaSlice.actions.removeItemTrader(buyingItem));
        await dispatch(addItemsToInventoryAC([buyingItem.item]));
        await dispatch(removeCoinsAC(buyingItem.item.cost * buyingItem.item.count));
    }
    catch (e){
        console.error(e)
    }
}

export const sellItem = (buyingItem: IBuyItem) => async (dispatch: AppDispatch) => {
    try{
        await dispatch(removeItemsFromInventoryAC([buyingItem.item]));
        dispatch(addCoinsAC(buyingItem.item.cost * buyingItem.item.count));
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

export const authUserAC = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.setIsLoading(true));
        const userData = await account.get();
        sessionStorage.user = JSON.stringify(userData);
        dispatch(userSlice.actions.setUser(userData));

        const items = await databases.listDocuments(
            inventoryCollection.databaseId,
            inventoryCollection.collectionId,
            [
                Query.equal('user_id', userData.$id)
            ]
        );
        const finalItems = items.documents.map(item => ({
            item: Items.find(i => i.id === item.item_id)!,
            count: item.item_count,
            isEquipped: item.is_equipped
        }));
        dispatch(userSlice.actions.setInventory(finalItems));

        const stats = await getUserStats();
        console.log(stats)
        if(stats){
            dispatch(userSlice.actions.setCoins(stats.coins));
            dispatch(userSlice.actions.setExperience(stats.experience));
            dispatch(userSlice.actions.setLevel(stats.level));
            dispatch(userSlice.actions.setSkillPoints(stats.skill_points));
        } else{ 
            await databases.createDocument(
                statsCollection.databaseId,
                statsCollection.collectionId,
                ID.unique(),
                {
                    user_id: userData.$id,
                    coins: 0,
                    experience: 0,
                    skill_points: BASE_COUNT_SKILL_POINTS
                }
            )
        }
        

        dispatch(userSlice.actions.setIsLoading(false));
        return true
    }
    catch(e){
        console.error(e);
        return false
    }
}

export const logoutUserAC = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(userSlice.actions.setIsLoading(true));
        await account.deleteSession('current');
        dispatch(userSlice.actions.setUser({} as any))
        dispatch(userSlice.actions.setIsLoading(false));
    }
    catch(e){
        console.error(e);
    }
}
