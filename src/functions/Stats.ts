import { IBuff } from "../models/IBuff";
import { IPlayer, IPlayerBaseStats } from "../models/IPlayer";


export interface IStats {
    baseDamage: number,
    damageMultiplier: number,
    critDamageMultiplier: number,
    critChance: number,
    oreSpeedMining: number,
    oreDoubleLootPercentChance: number,
    treeSpeedMining: number,
    treeDoubleLootPercentChance: number,
    capacity: number,

    blockingChancePercent: number,
    blockingMultiplier: number,
    dodgePercentChance: number,
    missPercentChance: number,
    movementSpeed: number,
    attackSpeed: number,
    baseHealth: number,
    maxHealthMultiplier: number,
    healthRegenerationScore: number,

    experienceMultiplier: number,
    craftSpeed: number,
    craftDoubleLootPercentChance: number,
    buyPricePercent: number,
    sellPricePercent: number
}

export const getStats = (playerSkills: IPlayerBaseStats, player: IPlayer, buffs: IBuff[]): IStats => ({
    baseDamage: 
        Number(((
            playerSkills.baseDamage.currentScores
            + player.weaponStats.damage)
            * playerSkills.damageMultiplier.currentScores).toFixed(2)),
    damageMultiplier:
        Number((
            playerSkills.damageMultiplier.currentScores).toFixed(2)),
    critDamageMultiplier:
        Number((
            playerSkills.critDamageMultiplier.currentScores
            + player.weaponStats.critDamageMultiplier).toFixed(2)),
    critChance:
        Number((
            playerSkills.critChance.currentScores
            + player.weaponStats.critChance).toFixed(2)),
    oreSpeedMining:
        Number((
            playerSkills.oreSpeedMining.currentScores
            + buffs.filter(i => i.idStat === 'oreSpeedMining').reduce<number>((ac, pv) => pv.count + ac, 0)
            + player.pickaxeStats.miningSpeed).toFixed(2)),
    oreDoubleLootPercentChance:
        Number((
            playerSkills.oreDoubleLootPercentChance.currentScores
            + player.pickaxeStats.doubleChancePercent).toFixed(2)),
    treeSpeedMining:
        Number((
            playerSkills.treeSpeedMining.currentScores
            + player.axeStats.miningSpeed).toFixed(2)),
    treeDoubleLootPercentChance:
        Number((
            playerSkills.treeDoubleLootPercentChance.currentScores
            + player.axeStats.doubleChancePercent).toFixed(2)),
    capacity:
        Number((
            playerSkills.capacity.currentScores).toFixed(0)),

    blockingChancePercent:
        Number((
            playerSkills.blockingChancePercent.currentScores
            + player.weaponStats.blockingChancePercent).toFixed(2)),
    blockingMultiplier:
        Number((
            playerSkills.blockingMultiplier.currentScores
            + player.weaponStats.blockingMultiplier).toFixed(2)),
    dodgePercentChance:
        Number((
            playerSkills.dodgePercentChance.currentScores
            + player.headStats.dodgeChance
            + player.chestStats.dodgeChance
            + player.footStats.dodgeChance).toFixed(2)),
    missPercentChance:
        Number((
            playerSkills.missPercentChance.currentScores
            + player.headStats.missChance
            + player.chestStats.missChance
            + player.footStats.missChance
            + player.weaponStats.missChance).toFixed(2)),
    movementSpeed:
        Number((
            playerSkills.movementSpeed.currentScores
            + player.headStats.speedMovement
            + player.chestStats.speedMovement
            + player.footStats.speedMovement).toFixed(2)),
    attackSpeed:
        Number((
            playerSkills.attackSpeed.currentScores
            + player.headStats.speedAttack
            + player.chestStats.speedAttack
            + player.footStats.speedAttack
            + player.weaponStats.speedAttack).toFixed(2)),
    baseHealth:
        Number((
            playerSkills.baseHealth.currentScores
            * (playerSkills.maxHealthMultiplier.currentScores
                + player.headStats.healthMultiplier
                + player.chestStats.healthMultiplier
                + player.footStats.healthMultiplier)).toFixed(1)),
    maxHealthMultiplier:
        Number((
            playerSkills.maxHealthMultiplier.currentScores).toFixed(2)),
    healthRegenerationScore:
        Number((
            playerSkills.healthRegenerationScore.currentScores).toFixed(0)),

    experienceMultiplier:
        Number((
            playerSkills.experienceMultiplier.currentScores).toFixed(2)),
    craftSpeed:
        Number((
            playerSkills.craftSpeed.currentScores).toFixed(2)),
    craftDoubleLootPercentChance:
        Number((
            playerSkills.craftDoubleLootPercentChance.currentScores).toFixed(2)),
    buyPricePercent:
        Number((
            playerSkills.buyPricePercent.currentScores).toFixed(2)),
    sellPricePercent:
        Number((
            playerSkills.sellPricePercent.currentScores).toFixed(2))
})