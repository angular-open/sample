class ProfileData {
    public searchUrl: string;
    public basicInfo: BasicInfo;
    public objective: string;
    public about: string;
    public knowledge: Knowledge[];
    public skill: Skill[];
    public exprience: CardInfo[];
    public education: CardInfo[];
}

class CardInfo {
    public from: number;
    public to: number;
    public title: string;
    public subTitle: string;
    public editInfo: boolean;
    public addAnim: boolean;
    public removeAnim: boolean;
}

class Year {
    public from: number;
    public to: number;
}

class BasicInfo {
    public profileImage: string;
    public title: string;
    public name: string;
    public phoneNumber: number;
    public address: string;
    public currentProfession: string;
}

class Skill {
    public title: string;
    public percentage: number;
}

class Knowledge {
    public title: string;
    public editStatus: boolean;
}

declare module 'cardinfo' {
    export = CardInfo;
}

declare module 'profileData' {
    export = ProfileData;
}

declare module 'knowledge' {
    export = Knowledge;
}

declare module 'skill' {
    export = Skill;
}