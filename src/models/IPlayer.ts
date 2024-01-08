import { IActionTexts } from "./IEnemy";

interface IPlayerStat {
    baseCount: number;
    currentScores: number;
    countScores: number;
    level: number;
}

export interface IPlayerBaseStats{
    baseDamage: IPlayerStat;
    damageMultiplier: IPlayerStat;
    critDamageMultiplier: IPlayerStat;
    critChance: IPlayerStat;
    oreSpeedMiningMultiplier: IPlayerStat;
    oreDoubleLootPercentChance: IPlayerStat;
    treeSpeedMiningMultiplier: IPlayerStat;
    treeDoubleLootPercentChance: IPlayerStat;
    capacity: IPlayerStat;

    blockingChancePercent: IPlayerStat;
    blockingMultiplier: IPlayerStat;
    dodgePercentChance: IPlayerStat;
    missPercentChance: IPlayerStat;
    movementSpeed: IPlayerStat;
    attackSpeed: IPlayerStat;
    baseHealth: IPlayerStat;
    maxHealthMultiplier: IPlayerStat;
    healthRegenerationMultiplier: IPlayerStat; 

    experienceMultiplier: IPlayerStat;
    craftSpeedMultiplier: IPlayerStat;
    craftDoubleLootPercentChance: IPlayerStat;
    buyPricePercent: IPlayerStat;
    sellPricePercent: IPlayerStat;

    [key: string]: any;
}

export interface IPlayer{
    title: string;
    avatar: string;
    health: number;
    actionText: IActionTexts;
    level: number;
    currentXP: number;
    skillPoints: number;
    coins: number;
}

export interface ISkillUp {
    id: string;
    countSkills: number;
    countLevels: number;
    type: 'score' | 'multiplier' | 'percent';
    
}