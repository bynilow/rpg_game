
export interface IArmor {
    health: number;
    missChance: number;
    dodgeChance: number;
    speedMovement: number;
    speedAttack: number;
}

export interface ITool {
    miningSpeed: number;
    doubleChancePercent: number;
}

export interface IWeapon {
    damage: number;
    missChance: number;
    blockingChancePercent: number;
    blockingMultiplier: number;
    critDamageMultiplier: number;
    critChance: number;
    speedAttack: number;
}