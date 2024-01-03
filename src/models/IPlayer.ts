import { IActionTexts } from "./IEnemy";

export interface IPlayer {
    title: string;
    avatar: string;
    maxHealth: number;
    health: number;
    attackSpeed: number;
    currentAttackTime: number;
    damage: number;
    critDamageMultiplier: number;
    critChance: number;
    dodgeChance: number;
    blockingChance: number;
    blockingMultiplier: number;
    missChance: number;
    actionText: IActionTexts;
    level: number;
    currentXP: number;
}