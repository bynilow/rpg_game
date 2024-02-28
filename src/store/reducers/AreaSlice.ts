import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Items } from "../../data/ItemsData";
import { Enemies } from "../../data/Enemies";
import { Locations } from "../../data/Locations";
import { Paths } from "../../data/Paths";
import { IArea, IAviablePath, IPath } from "../../models/IArea";
import { IBuyItem, IFullItem } from "../../models/IAreaItem";
import { IAreaCurrentEnemy, IEnemy, IEnemyDead } from "../../models/IEnemy";


interface IAreaSlice {
    currentLocation: IArea;
    availablePaths: IAviablePath[];
    areas: IArea[];
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

const initialState: IAreaSlice = {
    currentLocation: localStorage.currentLocation ? JSON.parse(localStorage.currentLocation) : Locations[0],
    availablePaths: [],
    areas: localStorage.areas ? JSON.parse(localStorage.areas) : Locations,
}

export const areaSlice = createSlice({
    name: 'area',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>) {
            state.currentLocation = state.areas.find(p => p.id === action.payload)!;

            localStorage.currentLocation = JSON.stringify(state.currentLocation);
        },
        getAvailablePaths(state, action: PayloadAction<string>) {
            const levelId = action.payload;

            const paths: IAviablePath[] = Paths.filter(p => (p.pathA + ' ' + p.pathB).includes(levelId))
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
                    const foundedItem = Items.find(si => si.id === i.id)!;
                    items.push({ ...foundedItem, idInArea: i.id + j });
                }
            });
            
            state.areas[foundedIndex].currentAreaItems = items!;
            state.currentLocation = state.areas[foundedIndex];

            localStorage.currentLocation = JSON.stringify(state.currentLocation);
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

            localStorage.currentLocation = JSON.stringify(state.currentLocation);
            localStorage.areas = JSON.stringify(state.areas);
        },
        mineItem(state, action: PayloadAction<IFullItem>) {
            const indexLevel = state.areas.findIndex(i => i.id === state.currentLocation?.id);
            const currentAreaItems = state.areas[indexLevel].currentAreaItems;
            const idInArea = action.payload.idInArea;

            state.areas[indexLevel].currentAreaItems = state.areas[indexLevel].currentAreaItems.
                filter(i => i.idInArea !== idInArea);

            state.currentLocation = state.areas[indexLevel];

            localStorage.currentLocation = JSON.stringify(state.currentLocation);
            localStorage.areas = JSON.stringify(state.areas);

        },
        setAreasFromStorage(state) {
            state.areas = JSON.parse(localStorage.areas);
        },
        setEnemyDead(state, action: PayloadAction<IEnemyDead>) {
            const enemyIdInArea = action.payload.enemyIdInArea;
            const foundIndexArea = state.areas.findIndex(a => a.id === action.payload.levelId);
            const foundAreaEnemies = state.areas[foundIndexArea].currentEnemies;
            state.areas[foundIndexArea].currentEnemies =
                foundAreaEnemies.filter(e => e.idInArea !== enemyIdInArea);

            state.currentLocation = state.areas[foundIndexArea];

            localStorage.currentLocation = JSON.stringify(state.currentLocation);
            localStorage.areas = JSON.stringify(state.areas);
        },
        removeItemTrader(state, action: PayloadAction<IBuyItem>){
            const itemId = action.payload.item.id;
            const count = action.payload.item.count;
            const traderId = action.payload.traderId;
            const locationId = action.payload.levelId;
            
            const foundedLocationIndex = state.areas.findIndex(a => a.id === locationId)!;
            const foundedTraderInLocationIndex = state.areas[foundedLocationIndex].currentEnemies.findIndex(e => e.id === traderId)!;
            const foundedTrader = state.areas[foundedLocationIndex].currentEnemies[foundedTraderInLocationIndex];
            let foundedItemIndexInTrader = foundedTrader.traderStats!.tradingItems.findIndex(i => i.id === itemId)!;
            let foundedItemInTrader = foundedTrader.traderStats!.tradingItems.find(i => i.id === itemId)!;

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
        }

    }
})

export default areaSlice.reducer;