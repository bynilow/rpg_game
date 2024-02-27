import { IEnemy } from "../../models/IEnemy";
import { IPlayer } from "../../models/IPlayer";
import { getChance, getRandomNumber } from "../Random";
import { IStats } from "../Stats";

interface IGetAttackData {
    isEnemyAttack: boolean;
    enemy: IEnemy;
    player: IPlayer;
    playerStats: IStats;
}

export const getAttackData = ({
    isEnemyAttack, enemy, player, playerStats
}: IGetAttackData) => {

    const playerCurrentDamage = playerStats.baseDamage;

    const avatar = isEnemyAttack
        ? enemy.avatar
        : player.avatar

    const title = isEnemyAttack
        ? enemy.title
        : player.title

    let textDamage = isEnemyAttack
        ? enemy.actionText.combatText[getRandomNumber(0, enemy.actionText.combatText.length - 1)]
        : player.actionText.combatText[getRandomNumber(0, player.actionText.combatText.length - 1)]

    let isCrit = getChance(isEnemyAttack
        ? enemy.stats.critChance
        : playerStats.critChance
    );

    let isMissed = getChance(isEnemyAttack
        ? enemy.stats.missChance
        : playerStats.missPercentChance
        );

    let isOpponentDodged = getChance(isEnemyAttack
        ? playerStats.dodgePercentChance
        : enemy.stats.dodgeChance
    );

    let isOpponentBlocked = getChance(isEnemyAttack
        ? playerStats.blockingChancePercent
        : enemy.stats.blockingChancePercent
    );

    let damage = isEnemyAttack
        ? enemy.stats.damage
        : playerCurrentDamage

    let critDamage = isEnemyAttack
        ? Number((enemy.stats.damage * enemy.stats.critDamageMultiplier).toFixed(1))
        : Number((playerCurrentDamage * playerStats.critDamageMultiplier).toFixed(1))

    let blockedCritDamage = Number(
        (damage / (isEnemyAttack 
            ? playerStats.blockingMultiplier 
            : enemy.stats.blockingMultiplier))
                .toFixed(1));

    if (isCrit) {
        isMissed = false;
        isOpponentDodged = false;

        textDamage = isEnemyAttack
            ? enemy.actionText.critDamageText
            : player.actionText.critDamageText

        damage = critDamage;

        if (isOpponentBlocked) {
            textDamage = isEnemyAttack
                ? enemy.actionText.successBlockingCritText
                : player.actionText.successBlockingCritText

            damage = blockedCritDamage;
        }
    }
    if (isMissed) {
        isOpponentDodged = false;
        isOpponentBlocked = false;

        textDamage = isEnemyAttack
            ? enemy.actionText.missText
            : player.actionText.missText

        damage = 0
    }
    if (isOpponentDodged) {
        isOpponentBlocked = false;

        textDamage = isEnemyAttack
            ? player.actionText.dodgeText
            : enemy.actionText.dodgeText;
        damage = 0;
    }
    if (isOpponentBlocked) {
        textDamage = isEnemyAttack
            ? enemy.actionText.successBlockingText
            : player.actionText.successBlockingText
        damage = blockedCritDamage;
    }

    return {
        avatar,
        title,
        hurtCharacter: isEnemyAttack ? player.title : enemy.title,
        damage,
        isMissed,
        isCrit,
        isOpponentBlocked,
        isOpponentDodged,
        textDamage,
        date: new Date().toLocaleTimeString() 
    }
};