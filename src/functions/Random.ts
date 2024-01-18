export const getChance = (chance: number) => {
    const randomNumber = Math.round(Math.random() * 100);
    if (randomNumber <= chance) return true
    else return false
}

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * max + min);

export const getRandomNumberForLoot = (chancePercent: number) => {
    const baseLootMultiplier = parseInt( String(chancePercent / 100) ) + 1; /// 1
    const percentOfExtraLoot = parseInt( String(chancePercent % 100) );  /// 35
    const isExtraLoot = Number(getChance(percentOfExtraLoot)); 
    
    return baseLootMultiplier + isExtraLoot
}