import { IActionTexts } from "./IEnemy";
import { IArmor, ITool, IWeapon } from "./IEquipment";

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
    oreSpeedMining: IPlayerStat;
    oreDoubleLootPercentChance: IPlayerStat;
    treeSpeedMining: IPlayerStat;
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
    healthRegenerationScore: IPlayerStat; 

    experienceMultiplier: IPlayerStat;
    craftSpeed: IPlayerStat;
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
    headStats: IArmor;
    chestStats: IArmor;
    footStats: IArmor;
    weaponStats: IWeapon;
    axeStats: ITool;
    pickaxeStats: ITool;
}

export interface ISkillUp {
    id: string;
    countSkills: number;
    countLevels: number;
    type: 'score' | 'multiplier' | 'percent';
    
}