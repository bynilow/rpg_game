import { IFullItem } from "./IAreaItem";

interface IEnemyLoot{
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

export interface IEnemy{
    id: string;
    idInArea: string;
    title: string;
    description: string;
    avatar: string;
    level: number;
    currentAttackTime: number;
    attackSpeed: number;
    damage: number;
    critDamageMultiplier: number;
    critChance: number;
    maxHealth: number;
    health: number;
    dodgeChance: number;
    blockingChance: number;
    blockingMultiplier: number;
    missChance: number;
    possibleLoot: IEnemyLoot[];
    actionText: IActionTexts;
}