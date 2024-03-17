import { IBuff } from "../models/IBuff";
import { IPlayer, IPlayerBaseStats } from "../models/IPlayer";


export interface IStats {
    damage: number,
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
    health: number,
    healthRegenerationScore: number,

    experienceMultiplier: number,
    craftSpeed: number,
    craftDoubleLootPercentChance: number,
    buyPricePercent: number,
    sellPricePercent: number
}

const getStatNumber = (num: number) => {
    return Number(num.toFixed(2));
}

export const getStats = (playerSkills: IPlayerBaseStats, player: IPlayer, buffs: IBuff[]): IStats => ({
    damage: 
        getStatNumber(
            playerSkills.damage.level * playerSkills.damage.givesScores
            + player.weaponStats.damage
            + (buffs.find(buff => buff.idStat === 'damage')?.count || 0)
        ),

    critDamageMultiplier:
        getStatNumber(
            playerSkills.critDamageMultiplier.level * playerSkills.critDamageMultiplier.givesScores
            + player.weaponStats.critDamageMultiplier
            + (buffs.find(buff => buff.idStat === 'critDamageMultiplier')?.count || 0)
        ),

    critChance:
        getStatNumber(
            playerSkills.critChance.level * playerSkills.critChance.givesScores
            + player.weaponStats.critChance
            + (buffs.find(buff => buff.idStat === 'critChance')?.count || 0)
        ),

    oreSpeedMining:
        getStatNumber(
            playerSkills.oreSpeedMining.level * playerSkills.oreSpeedMining.givesScores
            + buffs.filter(i => i.idStat === 'oreSpeedMining').reduce<number>((ac, pv) => pv.count + ac, 0)
            + player.pickaxeStats.miningSpeed
            + (buffs.find(buff => buff.idStat === 'oreSpeedMining')?.count || 0)
        ),

    oreDoubleLootPercentChance:
        getStatNumber(
            playerSkills.oreDoubleLootPercentChance.level * playerSkills.oreDoubleLootPercentChance.givesScores
            + player.pickaxeStats.doubleChancePercent
            + (buffs.find(buff => buff.idStat === 'oreDoubleLootPercentChance')?.count || 0)
        ),

    treeSpeedMining:
        getStatNumber(
            playerSkills.treeSpeedMining.level * playerSkills.treeSpeedMining.givesScores
            + player.axeStats.miningSpeed
            + (buffs.find(buff => buff.idStat === 'treeSpeedMining')?.count || 0)
        ),

    treeDoubleLootPercentChance:
        getStatNumber(
            playerSkills.treeDoubleLootPercentChance.level * playerSkills.treeDoubleLootPercentChance.givesScores
            + player.axeStats.doubleChancePercent
            + (buffs.find(buff => buff.idStat === 'treeDoubleLootPercentChance')?.count || 0)
        ),

    capacity:
        getStatNumber(
            playerSkills.capacity.level * playerSkills.capacity.givesScores
            + (buffs.find(buff => buff.idStat === 'capacity')?.count || 0)
        ),

    blockingChancePercent:
        getStatNumber(
            playerSkills.blockingChancePercent.level * playerSkills.blockingChancePercent.givesScores
            + player.weaponStats.blockingChancePercent
            + (buffs.find(buff => buff.idStat === 'blockingChancePercent')?.count || 0)
        ),

    blockingMultiplier:
        getStatNumber(
            playerSkills.blockingMultiplier.level * playerSkills.blockingMultiplier.givesScores
            + player.weaponStats.blockingMultiplier
            + (buffs.find(buff => buff.idStat === 'blockingMultiplier')?.count || 0)
        ),

    dodgePercentChance:
        getStatNumber(
            playerSkills.dodgePercentChance.level * playerSkills.dodgePercentChance.givesScores
            + player.headStats.dodgeChance
            + player.chestStats.dodgeChance
            + player.footStats.dodgeChance
            + (buffs.find(buff => buff.idStat === 'dodgePercentChance')?.count || 0)
        ),

    missPercentChance:
        getStatNumber(
            playerSkills.missPercentChance.level * playerSkills.missPercentChance.givesScores
            + player.headStats.missChance
            + player.chestStats.missChance
            + player.footStats.missChance
            + player.weaponStats.missChance
            + (buffs.find(buff => buff.idStat === 'missPercentChance')?.count || 0)
        ),

    movementSpeed:
        getStatNumber(
            playerSkills.movementSpeed.level * playerSkills.movementSpeed.givesScores
            + player.headStats.speedMovement
            + player.chestStats.speedMovement
            + player.footStats.speedMovement
            + (buffs.find(buff => buff.idStat === 'movementSpeed')?.count || 0)
        ),

    attackSpeed:
        getStatNumber(
            playerSkills.attackSpeed.level * playerSkills.attackSpeed.givesScores
            + player.headStats.speedAttack
            + player.chestStats.speedAttack
            + player.footStats.speedAttack
            + player.weaponStats.speedAttack
            + (buffs.find(buff => buff.idStat === 'attackSpeed')?.count || 0)
        ),

    health:
        getStatNumber(
            playerSkills.health.level * playerSkills.health.givesScores
            * (+ player.headStats.health
                + player.chestStats.health
                + player.footStats.health
                + (buffs.find(buff => buff.idStat === 'health')?.count || 0)
            )),

    healthRegenerationScore:
        getStatNumber(
            playerSkills.healthRegenerationScore.level * playerSkills.healthRegenerationScore.givesScores
            + (buffs.find(buff => buff.idStat === 'healthRegenerationScore')?.count || 0)
        ),

    experienceMultiplier:
        getStatNumber(
            playerSkills.experienceMultiplier.level * playerSkills.experienceMultiplier.givesScores
            + (buffs.find(buff => buff.idStat === 'experienceMultiplier')?.count || 0)
        ),

    craftSpeed:
        getStatNumber(
            playerSkills.craftSpeed.level * playerSkills.craftSpeed.givesScores
            + (buffs.find(buff => buff.idStat === 'craftSpeed')?.count || 0)
        ),

    craftDoubleLootPercentChance:
        getStatNumber(
            playerSkills.craftDoubleLootPercentChance.level * playerSkills.craftDoubleLootPercentChance.givesScores
            + (buffs.find(buff => buff.idStat === 'craftDoubleLootPercentChance')?.count || 0)
        ),

    buyPricePercent:
        getStatNumber(
            playerSkills.buyPricePercent.level * playerSkills.buyPricePercent.givesScores
            + (buffs.find(buff => buff.idStat === 'buyPricePercent')?.count || 0)
        ),

    sellPricePercent:
        getStatNumber(
            playerSkills.sellPricePercent.level * playerSkills.sellPricePercent.givesScores
            + (buffs.find(buff => buff.idStat === 'sellPricePercent')?.count || 0)
        )
})