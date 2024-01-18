import { IAreaColor } from "../models/IArea";
import { IRare } from "../models/IAreaItem";
import { IEnemyType } from "../models/IEnemy";

const baseBackgroundColor = '#fff';
const baseHoveredBackgroundColor = '#e6e6e6';


export const getItemBackground = (rare: IRare) => {
    switch (rare) {
        case 'common':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #a4a4ab 95%)`
        case 'uncommon':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #59c87f 95%)`
        case 'rare':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #4d69cd 95%)`
        case 'mythical':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #d42be6 95%)`
        case 'legendary':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #caab05 95%)`
        default:
            return ``
    }
}

export const getItemHoveredBackground = (rare: IRare) => {
    switch (rare) {
        case 'common':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #a4a4ab 95%)`
        case 'uncommon':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #59c87f 95%)`
        case 'rare':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #4d69cd 95%)`
        case 'mythical':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #d42be6 95%)`
        case 'legendary':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #caab05 95%)`
        default:
            return ``
    }
}

export const getRareColor = (rare: IRare) => {
    switch (rare) {
        case 'common':
            return `#a4a4ab`
        case 'uncommon':
            return `#59c87f`
        case 'rare':
            return `#4d69cd`
        case 'mythical':
            return `#d42be6`
        case 'legendary':
            return `#caab05`
        default:
            return ``
    }
}

export const getRareTimerBackgroundColor = (rare: IRare) => {
    switch (rare) {
        case 'common':
            return `#7a7a80`
        case 'uncommon':
            return `#499b65`
        case 'rare':
            return `#3e539e`
        case 'mythical':
            return `#8a2496`
        case 'legendary':
            return `#978414`
        default:
            return ``
    }
}

export const getAreaBackground = (color: IAreaColor) => {
    switch (color) {
        case 'green':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #51973f 95%)`
        case 'yellow':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #b9ae4b 95%)`
        case 'red':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #cd4d4d 95%)`
        default:
            return ``
    }
}

export const getHoveredAreaBackground = (color: IAreaColor) => {
    switch (color) {
        case 'green':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #51973f 95%)`
        case 'yellow':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #b9ae4b 95%)`
        case 'red':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #cd4d4d 95%)`
        default:
            return ``
    }
}

export const getAreaColor = (color: IAreaColor) => {
    switch (color) {
        case 'green':
            return `#51973f`
        case 'yellow':
            return `#b9ae4b`
        case 'red':
            return `#cd4d4d`
        default:
            return ``
    }
}


export const getEnemyBackground = (type: IEnemyType) => {
    switch (type) {
        case 'enemy':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #b6b6b6 95%)`
        case 'neutral':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #70b5d1 95%)`
        case 'boss':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #cf6060 95%)`
        case 'trader':
            return `linear-gradient(225deg, ${baseBackgroundColor} 95%, #e7b13d 95%)`
        default:
            return ``
    }
}

export const getHoveredEnemyBackground = (type: IEnemyType) => {
    switch (type) {
        case 'enemy':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #b6b6b6 95%)`
        case 'neutral':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #70b5d1 95%)`
        case 'boss':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #cf6060 95%)`
        case 'trader':
            return `linear-gradient(225deg, ${baseHoveredBackgroundColor} 95%, #e7b13d 95%)`
        default:
            return ``
    }
}

export const getEnemyColor = (type: IEnemyType) => {
    switch (type) {
        case 'enemy':
            return `#b6b6b6`
        case 'neutral':
            return `#70b5d1`
        case 'boss':
            return `#cf6060`
        case 'trader':
            return `#e7b13d`
        default:
            return ``
    }
}