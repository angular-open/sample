import {Injectable} from 'angular2/core';
import Profile = require("profileData");

@Injectable()
export class ProfileStorage {
    constructor() { }

    SetProfile(data: Profile) {
        localStorage.setItem("profile",JSON.stringify(data));
    };

    GetProfile() {
        return localStorage.getItem("profile");
    };
}