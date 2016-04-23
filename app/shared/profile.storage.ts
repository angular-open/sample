import {Injectable} from 'angular2/core';
import Profile = require("profileData");

@Injectable()
export class ProfileStorage {
    public localProfile;
    constructor() { }

    SetProfile(data: Profile) {
        this.localProfile = {
            "searchUrl": data.searchUrl,
            "about": data.about,
            "basicInfo": data.basicInfo,
            "education": data.education,
            "exprience": data.exprience,
            "knowledge": data.knowledge,
            "objective": data.objective,
            "skill": data.skill,
        };
    };

    GetProfile() {
        return this.localProfile;
    };
}