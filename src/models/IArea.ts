import { IFullItem, IAreaItem } from "./IAreaItem";
import { IEnemy } from "./IEnemy";

export interface IArea {
    id: string;
    avatar: string;
    title: string;
    color: string;
    description: string;
    areaItems: IAreaItem[];
    currentAreaItems: IFullItem[];
    enemies: IEnemy[];
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

export interface IChangeInfo {
    area?: IArea;
    itemId?: string;
    whatInfo: string;
  }