import { IActionTexts } from "./IEnemy";
import { IArmor, ITool, IWeapon } from "./IEquipment";

interface IPlayerStat {
    title: string;
    baseCount: number;
    currentScores: number;
    level: number;
    givesScores: number;
    type: '' | 'x' | '%' | 's' | 'kg';
    description: string;
}

export interface IPlayerBaseStats{
    damage: IPlayerStat;
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
    health: IPlayerStat;
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