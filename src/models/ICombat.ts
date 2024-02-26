export interface ICombatHistory {
    isEnemyAttack: boolean;
    isMissed: boolean;
    isCrit: boolean;
    isSay: boolean;
    isDodged: boolean;
    isBlocked: boolean;
    avatar: string;
    text: string;
    damage: number;
    characterName: string;
    hurtName: string;
    date: string;
}