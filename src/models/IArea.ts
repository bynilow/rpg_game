import { IAreaFullItem, IAreaItem } from "./IAreaItem";

export interface IArea {
    id: string;
    avatar: string;
    title: string;
    description: string;
    areaItems: IAreaItem[];
    currentAreaItems: IAreaFullItem[];
    enemies: any;
    timeToRespawnAreaItems: number;
    timeToRespawnAreaEnemies: number;
    lastRespawnAreaItems: string;
    lastRespawnAreaEnemies: string;
}

export interface IAPath {
    pathA: string;
    pathB: string;
    time: number;
}

export interface ILocationToMove {
    time: number;
    locationId: string;
    currentTimeToMove: number;
}