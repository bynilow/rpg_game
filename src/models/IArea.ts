import { IFullItem, IAreaItem } from "./IAreaItem";
import { IAreaCurrentEnemy, IAreaEnemy, IEnemy } from "./IEnemy";

export type IAreaColor = 'green' | 'yellow' | 'red'


export interface IArea {
    id: string;
    color: IAreaColor;
    avatar: string;
    title: string;
    description: string;
    areaItems: IAreaItem[];
    currentAreaItems: IFullItem[];
    enemies: IAreaEnemy[];
    currentEnemies: IAreaCurrentEnemy[];
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
    enemyId?: string;
    whatInfo: string;
  }