import { IActionTexts } from "./IEnemy";

export interface IPlayerBaseStats{
    baseDamage: number;
    damageMultiplier: number;
    critDamageMultiplier: number;
    critChance: number;
    oreSpeedMiningMultiplier: number;
    oreDoubleLootPercentChance: number;
    treeSpeedMiningMultiplier: number;
    treeDoubleLootPercentChance: number;
    capacity: number;

    blockingChancePercent: number;
    blockingMultiplier: number;
    dodgePercentChance: number;
    missPercentChance: number;
    movementSpeed: number;
    attackSpeed: number;
    baseHealth: number;
    maxHealthMultiplier: number;
    healthRegenerationMultiplier: number; 

    experienceMultiplier: number;
    craftSpeedMultiplier: number;
    craftDoubleLootPercentChance: number;
    buyPricePercent: number;
    sellPricePercent: number;
}

export interface IPlayer{
    title: string;
    avatar: string;
    health: number;
    actionText: IActionTexts;
    level: number;
    currentXP: number;
    coins: number;
}
