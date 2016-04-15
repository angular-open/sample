class CardInfo {
    public from: number;
    public to: number;
    public headingOne: string;
    public headingTwo: string;
}

declare module 'cardinfo' {
    export = CardInfo;
}