export interface IBuff {
    title: string;
    description: string;
    idStat: string;
    count: number;
    type: 'x' | '%' | 's' | '';
    dateReceived: string;
    dateExpires: string;
}