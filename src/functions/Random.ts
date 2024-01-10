export const getChance = (chance: number) => {
    const randomNumber = Math.round(Math.random() * 100);
    if (randomNumber <= chance) return true
    else return false
}

export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * max + min);

export const getRandomNumberForLoot = (num: number) => {
    const baseLootMultiplier = parseInt( String(num / 100) ) + 1; /// 1
    const percentOfExtraLoot = parseInt( String(num % 100) );  /// 35
    const isExtraLoot = Number(getChance(percentOfExtraLoot)); 
    
    return baseLootMultiplier + isExtraLoot
}