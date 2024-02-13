import { IFullItem, IFullItemWithCount } from "./IAreaItem";

export type IEnemyType = 'enemy' | 'neutral' | 'boss' | 'trader'

export interface IEnemyDead {
    levelId: string;
    enemyIdInArea: string;
}

export interface IEnemyLoot{
    id: string,
    countMin: number;
    countMax: number;
    dropChance: number;
}

export interface IActionTexts {
    communicationText: string[];
    combatText: string[];
    critDamageText: string;
    successBlockingText: string;
    successBlockingCritText: string;
    failedBlockingText: string;
    dodgeText: string;
    missText: string;
}

interface IEnemyStats {
    attackSpeed: number;
    damage: number;
    critDamageMultiplier: number;
    critChance: number;
    baseHealth: number;
    dodgeChance: number;
    blockingChancePercent: number;
    blockingMultiplier: number;
    missChance: number;
}

export interface IEnemy{
    id: string;
    type: IEnemyType;
    idInArea: string;
    title: string;
    description: string;
    avatar: string;
    level: number;
    stats: IEnemyStats;
    possibleLoot: IEnemyLoot[];
    actionText: IActionTexts;
    baseCountXP: number;
    traderStats?: ITrader;
}

export interface IAreaEnemy{
    id: string;
    levelMin: number;
    levelMax: number;
    countMin: number;
    countMax: number;
    spawnChance: number;
    traderStats?: ITrader;
}

export interface IAreaCurrentEnemy{
    id: string;
    idInArea: string;
    level: number;
    levelId: string;
    traderStats?: ITrader;
}

export interface ITrader {
    extraPriceMultiplier: number;
    updateTimeInMinutes?: number;
    tradingItems: IFullItemWithCount[];
}