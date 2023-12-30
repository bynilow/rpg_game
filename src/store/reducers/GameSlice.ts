import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAreaFullItem, IAreaItem } from "../../models/IAreaItem";
import { IPath, IArea, ILocationToMove, IAviablePath } from "../../models/IArea";
import { IInventory, IItemInventory } from "../../models/IInventory";





interface GameSlice {
    currentLocationId: string;
    availablePaths: IAviablePath[];
    paths: IPath[];
    areas: IArea[];
    areaItems: IAreaFullItem[];
    currentAreaItem: IAreaFullItem | {};
    currentAreaItemMiningTime: number;
    currentAreaToMove: ILocationToMove;
    inventory: IItemInventory[];
}

interface IUpdateAreaItems {
    levelId: string;
    date: string;
    items: {
        id: string;
        count: number
    }[];
}


const initialState: GameSlice = {
    currentLocationId: 'south_beach',
    availablePaths: [],
    paths: [
        {
            pathA: 'south_beach',
            pathB: 'low_hills',
            time: 5
        },
        {
            pathA: 'low_hills',
            pathB: 'sharp_mountains',
            time: 6.5
        },
        {
            pathA: 'sharp_mountains',
            pathB: 'fish_ponds',
            time: 5.5
        },
        {
            pathA: 'south_beach',
            pathB: 'forgotten_road',
            time: 4.6
        },
        {
            pathA: 'forgotten_road',
            pathB: 'central_castle',
            time: 5.25
        },
        {
            pathA: 'forgotten_road',
            pathB: 'bloody_forest',
            time: 6.4
        },
        {
            pathA: 'central_castle',
            pathB: 'fish_ponds',
            time: 5.3
        },

    ],
    areas: localStorage.areas ? JSON.parse(localStorage.areas) : [],
    areaItems: [
        {
            "id": "birch_tree",
            "idInArea": "",
            "title": "Обычная Береза",
            "avatar": "icons/items/birch_tree.png",
            "description": "",
            "timeToMining": 7.0,
            "type": "tree",
            "rare": "common",
            "dateReceiving": "",
            "cost": 3
        },
        {
            "id": "oak_tree",
            "idInArea": "",
            "title": "Крепкий Дуб",
            "avatar": "icons/items/oak_tree.png",
            "description": "",
            "timeToMining": 10.0,
            "type": "tree",
            "rare": "uncommon",
            "dateReceiving": "",
            "cost": 7
        },
        {
            "id": "willow_tree",
            "idInArea": "",
            "title": "Плакучая Ива",
            "avatar": "icons/items/willow_tree.png",
            "description": "",
            "timeToMining": 16.0,
            "type": "tree",
            "rare": "rare",
            "dateReceiving": "",
            "cost": 18
        },
        {
            "id": "cedar_tree",
            "idInArea": "",
            "title": "Вечнозеленный Кедр",
            "avatar": "icons/items/cedar_tree.png",
            "description": "",
            "timeToMining": 20.0,
            "type": "tree",
            "rare": "mythical",
            "dateReceiving": "",
            "cost": 35
        },
        {
            "id": "teak_tree",
            "idInArea": "",
            "title": "Долговечный Тик",
            "avatar": "icons/items/teak_tree.png",
            "description": "",
            "timeToMining": 26.0,
            "type": "tree",
            "rare": "legendary",
            "dateReceiving": "",
            "cost": 70
        },
        {
            "id": "iron_ore",
            "idInArea": "",
            "title": "Железная руда",
            "avatar": "icons/items/iron_ore.png",
            "description": "",
            "timeToMining": 8.0,
            "type": "ore",
            "rare": "common",
            "dateReceiving": "",
            "cost": 5
        },
        {
            "id": "tungsten_ore",
            "idInArea": "",
            "title": "Вольфрамовая руда",
            "avatar": "icons/items/tungsten_ore.png",
            "description": "",
            "timeToMining": 14.0,
            "type": "ore",
            "rare": "uncommon",
            "dateReceiving": "",
            "cost": 13
        },
        {
            "id": "platinum_ore",
            "idInArea": "",
            "title": "Платиновая руда",
            "avatar": "icons/items/platinum_ore.png",
            "description": "",
            "timeToMining": 21.0,
            "type": "ore",
            "rare": "rare",
            "dateReceiving": "",
            "cost": 34
        },
        {
            "id": "titanium_ore",
            "idInArea": "",
            "title": "Титановая руда",
            "avatar": "icons/items/titanium_ore.png",
            "description": "",
            "timeToMining": 26.0,
            "type": "ore",
            "rare": "mythical",
            "dateReceiving": "",
            "cost": 65
        },
        {
            "id": "adamantite_ore",
            "idInArea": "",
            "title": "Адамантитовая руда",
            "avatar": "icons/items/adamantite_ore.png",
            "description": "",
            "timeToMining": 31.0,
            "type": "ore",
            "rare": "legendary",
            "dateReceiving": "",
            "cost": 93
        }
    ],
    currentAreaToMove: {
        time: 0,
        locationId: 'south_beach'
    },
    currentAreaItem: {},
    currentAreaItemMiningTime: 0,
    inventory: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>){
            state.currentLocationId = state.areas.find(p => p.id === action.payload)!.id;
            // state.currentAreaToMove.time = 0;
        },
        getAvailablePaths(state, action: PayloadAction<string>){
            const levelId = action.payload;
            // if(state.currentAreaToMove.locationId !== ''){
            //     state.availablePaths = state.paths.filter(p => (p.pathA+' '+p.pathB).includes(levelId));
            // }
            const paths:IAviablePath[] = state.paths.filter(p => (p.pathA+' '+p.pathB).includes(levelId))
                .map(i => ({
                    pathId: i.pathA !== levelId ? i.pathA : i.pathB,
                    time: i.time}))
            state.availablePaths = paths;
        },
        setLocationToMove(state, action: PayloadAction<ILocationToMove>){
            state.currentAreaToMove = action.payload;
        },
        stopMove(state){
            state.currentAreaToMove = {
                time: 0,
                locationId: ''
            }
        },
        updateAreaItems(state, action: PayloadAction<IUpdateAreaItems>){
            const payloadItems = action.payload.items;
            const payloadDate = action.payload.date;
            const payloadDateDate = new Date(payloadDate);
            const payloadLevelId = action.payload.levelId;

            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);

            state.areas[foundedIndex].lastRespawnAreaItems = payloadDate;

            let changedStorage:IArea[] = state.areas;
            changedStorage[foundedIndex].lastRespawnAreaItems = payloadDate;
            

            let items:IAreaFullItem[] = [];
            payloadItems.forEach(i => {
                for(let j = 0; j < i.count; j++){
                    const foundedItem = state.areaItems.find(si => si.id === i.id)!;
                    items.push({...foundedItem, idInArea: i.id + j});
                }
            });

            state.areas[foundedIndex].currentAreaItems = items!;

            changedStorage[foundedIndex].currentAreaItems = items!;

            localStorage.areas = JSON.stringify(state.areas);
        },
        mineItem(state, action: PayloadAction<IAreaFullItem>){
            const indexLevel = state.areas.findIndex(i => i.id === state.currentLocationId);
            const currentAreaItems = state.areas[indexLevel].currentAreaItems;
            const idInArea = action.payload.idInArea;

            state.areas[indexLevel].currentAreaItems = state.areas[indexLevel].currentAreaItems.
                filter(i => i.idInArea !== idInArea);

            localStorage.areas = JSON.stringify(state.areas);
            
        },
        stopMine(state){
            state.currentAreaItem = {};
            state.currentAreaItemMiningTime = 0;
        },
        setAreasFromStorage(state){
            state.areas = JSON.parse(localStorage.areas);
            // if(JSON.stringify(state.currentLocation) !== localStorage.areas[0]){
            //     state.currentLocation = JSON.parse(localStorage.areas)[0];
            //     console.log("TRUE")
            //     console.log(JSON.parse(localStorage.areas)[0])
            // }
        },
        addItemToInventory(state, action: PayloadAction<IAreaFullItem>){
            const foundedItemIndex = state.inventory.findIndex(i => i.item.id === action.payload.id);
            const date = new Date().toISOString();
            if(foundedItemIndex !== -1){
                state.inventory[foundedItemIndex].count += 1;
                state.inventory[foundedItemIndex].item.dateReceiving = date;
            }
            else{
                state.inventory.push({
                    item: {...action.payload, dateReceiving: date},
                    count: 1
                })
            }
            localStorage.inventory = JSON.stringify(state.inventory);
        },
        setInventory(state, action: PayloadAction<IItemInventory[]>){
            state.inventory = action.payload;
        }


    }
})

export default gameSlice.reducer;