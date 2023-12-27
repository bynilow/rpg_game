export interface IProduct {
    id: number,
    avatar: string,
    title: string,
    weight: number,
    description: string,
    priceWithoutDiscount: number,
    currentPrice: number,
    type: string
}