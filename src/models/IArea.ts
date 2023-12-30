import { IAreaFullItem, IAreaItem } from "./IAreaItem";

export interface IArea {
    id: string;
    avatar: string;
    title: string;
    color: string;
    description: string;
    areaItems: IAreaItem[];
    currentAreaItems: IAreaFullItem[];
    enemies: any;
    timeToRespawnAreaItems: number;
    timeToRespawnAreaEnemies: number;
    lastRespawnAreaItems: string;
    lastRespawnAreaEnemies: string;
}

export interface IPath {
    pathA: string;
    pathB: string;
    time: number;
}

export interface IAviablePath{
    pathId: string;
    time: number;
}

export interface ILocationToMove {
    time: number;
    locationId: string;
}