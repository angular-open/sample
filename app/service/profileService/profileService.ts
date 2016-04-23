import {Component, Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {HttpServices} from '../httpServices';
import 'rxjs/Rx';
import Profile = require("profileData");

@Component({
    providers: [HttpServices]
})

@Injectable()
export class ProfileService {
    private dataGetProfileUrl = 'getProfile';
    private dataCheckAndGetProfileUrl = 'checkProfile';

    constructor(private httpServices: HttpServices) { }

    getProfile(profileUrl: string) {
        var self = this;
        var data = {
            profileUrl: profileUrl
        };

        return this.httpServices.PostHttp(JSON.stringify(data), this.dataGetProfileUrl).map(res => <Profile>res.json());
    }
    
    checkProfile(profileUrl: string){
        var self = this;
        var data = {
            profileUrl: profileUrl
        };

        return this.httpServices.PostHttp(JSON.stringify(data), this.dataCheckAndGetProfileUrl).map(res => <Profile>res.json());
    }
}