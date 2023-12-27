import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAreaFullItem, IAreaItem } from "../../models/IAreaItem";
import { IAPath, IArea, ILocationToMove } from "../../models/IArea";





interface GameSlice {
    currentLocationId: string;
    availablePaths: IAPath[];
    paths: IAPath[];
    areas: IArea[];
    areaItems: IAreaFullItem[];
    currentAreaItem: IAreaFullItem | {};
    currentAreaItemMiningTime: number;
    currentAreaToMove: ILocationToMove;
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
    areas: [{
        "id": "south_beach",
        "avatar": "",
        "title": "Южный пляж",
        "description": "",
        "areaItems": [
          {
            "id": "birch_tree",
            "countMin": 1,
            "countMax": 2
          },
          {
            "id": "iron_ore",
            "countMin": 0,
            "countMax": 1
          }
        ],
        "currentAreaItems": [

        ],
        "enemies": [],
        "timeToRespawnAreaItems": 120,
        "timeToRespawnAreaEnemies": 180,
        "lastRespawnAreaItems": "2970-02-17T11:25:33.715Z",
        "lastRespawnAreaEnemies": "2970-02-17T11:25:33.715Z"
      }],
    areaItems: [
        {
            "id": "birch_tree",
            "idInArea": "",
            "title": "Обычная Береза",
            "avatar": "",
            "description": "",
            "timeToMining": 7.0,
            "type": "tree",
            "rare": "common"
        },
        {
            "id": "oak_tree",
            "idInArea": "",
            "title": "Крепкий Дуб",
            "avatar": "",
            "description": "",
            "timeToMining": 10.0,
            "type": "tree",
            "rare": "uncommon"
        },
        {
            "id": "willow_tree",
            "idInArea": "",
            "title": "Плакучая Ива",
            "avatar": "",
            "description": "",
            "timeToMining": 16.0,
            "type": "tree",
            "rare": "rare"
        },
        {
            "id": "cedar_tree",
            "idInArea": "",
            "title": "Вечнозеленный Кедр",
            "avatar": "",
            "description": "",
            "timeToMining": 20.0,
            "type": "tree",
            "rare": "mythical"
        },
        {
            "id": "teak_tree",
            "idInArea": "",
            "title": "Долговечный Тик",
            "avatar": "",
            "description": "",
            "timeToMining": 26.0,
            "type": "tree",
            "rare": "legendary"
        },
        {
            "id": "iron_ore",
            "idInArea": "",
            "title": "Железная руда",
            "avatar": "",
            "description": "",
            "timeToMining": 8.0,
            "type": "ore",
            "rare": "common"
        },
        {
            "id": "tungsten_ore",
            "idInArea": "",
            "title": "Вольфрамовая руда",
            "avatar": "",
            "description": "",
            "timeToMining": 14.0,
            "type": "ore",
            "rare": "uncommon"
        },
        {
            "id": "platinum_ore",
            "idInArea": "",
            "title": "Платиновая руда",
            "avatar": "",
            "description": "",
            "timeToMining": 21.0,
            "type": "ore",
            "rare": "rare"
        },
        {
            "id": "titanium_ore",
            "idInArea": "",
            "title": "Титановая руда",
            "avatar": "",
            "description": "",
            "timeToMining": 26.0,
            "type": "ore",
            "rare": "mythical"
        },
        {
            "id": "adamantite_ore",
            "idInArea": "",
            "title": "Адамантитовая руда",
            "avatar": "",
            "description": "",
            "timeToMining": 31.0,
            "type": "ore",
            "rare": "legendary"
        }
    ],
    currentAreaToMove: {
        time: 0,
        locationId: 'south_beach',
        currentTimeToMove: 0
    },
    currentAreaItem: {},
    currentAreaItemMiningTime: 0,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        goLevel(state, action: PayloadAction<string>){
            if(state.currentAreaToMove.locationId !== ''){
                state.currentLocationId = state.areas.find(p => p.id === action.payload)!.id;
                state.currentAreaToMove.time = 0;
            }
        },
        getAvailablePaths(state, action: PayloadAction<string>){
            if(state.currentAreaToMove.locationId !== ''){
                state.availablePaths = state.paths.filter(p => (p.pathA+' '+p.pathB).includes(action.payload));
            }
        },
        setLocationToMove(state, action: PayloadAction<ILocationToMove>){
            state.currentAreaToMove = action.payload;
        },
        stopMove(state){
            state.currentAreaToMove = {
                time: 0,
                locationId: '',
                currentTimeToMove: 0
            }
        },
        decrementTimeToMove(state, action: PayloadAction<number>){
            if(state.currentAreaToMove.locationId !== ''){
                state.currentAreaToMove.currentTimeToMove -= action.payload;
            }
        },
        updateAreaItems(state, action: PayloadAction<IUpdateAreaItems>){
            const payloadItems = action.payload.items;
            const payloadDate = action.payload.date;
            const payloadDateDate = new Date(payloadDate);
            const payloadLevelId = action.payload.levelId;

            const foundedIndex = state.areas.findIndex(e => e.id === payloadLevelId);

            state.areas[foundedIndex].lastRespawnAreaItems = payloadDate;

            let changedStorage:IArea[] = JSON.parse(localStorage.areas);
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


            localStorage.areas = JSON.stringify(changedStorage);
        },
        mineItem(state, action: PayloadAction<IAreaFullItem>){
            const indexLevel = state.areas.findIndex(i => i.id === state.currentLocationId);
            const currentAreaItems = state.areas[indexLevel].currentAreaItems;
            const idInArea = action.payload.idInArea;

            if(Object.keys(state.currentAreaItem).length){
                state.areas[indexLevel].currentAreaItems = state.areas[indexLevel].currentAreaItems.filter(i => i.idInArea !== idInArea);
            }
            state.currentAreaItem = {};
            state.currentAreaItemMiningTime = 0;
        },
        setItemToMine(state, action: PayloadAction<IAreaFullItem>){
            state.currentAreaItemMiningTime = action.payload.timeToMining;
            state.currentAreaItem = action.payload;
        },
        decrementTimeToMine(state, action: PayloadAction<number>){
            if(Object.keys(state.currentAreaItem).length){
                state.currentAreaItemMiningTime -= action.payload;
            }
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
                
            
        }

    }
})

export default gameSlice.reducer;