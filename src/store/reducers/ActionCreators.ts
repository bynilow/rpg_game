import axios from "axios";
import { AppDispatch } from "../store";
import { gameSlice } from "./GameSlice";
import { ILocationToMove } from "../../models/IArea";
import { IAreaFullItem, IAreaItem } from "../../models/IAreaItem";
import { useAppSelector } from "../../hooks/redux";

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
        const timer = setInterval(() => {
            
            dispatch(decrementTimeToMove(0.05))
        }, 50);
        setTimeout(() => {
            clearInterval(timer);
            dispatch(gameSlice.actions.goLevel(location.locationId));
            dispatch(gameSlice.actions.getAvailablePaths(location.locationId));
        }, location.time * 1000);
    }
    catch{

    }
}

export const decrementTimeToMove = (time:number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.decrementTimeToMove(time));
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

export const setItemToMine = (miningItem: IAreaFullItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.setItemToMine(miningItem));
        const timer = setInterval(() => {
            dispatch(decrementTimeToMine(0.05));
            
        }, 50);
        const timeout = setTimeout(() => {
            clearInterval(timer);
            dispatch(gameSlice.actions.mineItem(miningItem));
        }, miningItem.timeToMining * 1000);
    }
    catch{

    }
}

export const decrementTimeToMine = (time:number) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.decrementTimeToMine(time));
    }
    catch{

    }
}

export const mineItem = (miningItem: IAreaFullItem) => async (dispatch: AppDispatch) => {
    try{
        dispatch(gameSlice.actions.mineItem(miningItem));
        
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

