import axios from "axios";
import { AppDispatch } from "../store";
import { gameSlice } from "./GameSlice";
import { ILocationToMove } from "../../models/IArea";
import { IFullItem, IAreaItem } from "../../models/IAreaItem";
import { useAppSelector } from "../../hooks/redux";
import { IItemInventory } from "../../models/IInventory";

interface IResult {
    results: any[]
}

interface IUpdateAreaItems {
    levelId: string;
    date: string;
    itemsToUpdate: IAreaItem[];
}

const getRandomNumber = (min:number, max:number) => Math.round(Math.random() * max + min);

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

export const setLocationToMove = (location:ILocationToMove) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setLocationToMove(location));
    }
    catch{

    }
}

export const stopMoveToLocation = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.stopMove());
        
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
        dispatch(gameSlice.actions.updateAreaItems({
            levelId: updatedLevel.levelId,
            date: updatedLevel.date,
            items: filteredItems as []
        }));
        
    }
    catch{

    }
}

export const mineItem = (miningItem: IFullItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.mineItem(miningItem));
        dispatch(gameSlice.actions.addItemToInventory(miningItem));
        
    }
    catch{

    }
}

export const stopMineItem = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.stopMine());
        
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

export const addItemToInventory = (item:IFullItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.addItemToInventory(item));
        
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

