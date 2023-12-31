
const baseBackgroundColor = '#fff';
const baseHoveredBackgroundColor = '#e6e6e6';

export const getItemBackground = (rare: string) => {
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

export const getItemHoveredBackground = (rare: string) => {
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

export const getRareColor = (rare: string) => {
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

export const getRareTimerBackgroundColor = (rare: string) => {
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

export const getAreaBackground = (color: string) => {
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

export const getHoveredAreaBackground = (color: string) => {
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

export const getAreaColor = (color: string) => {
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