import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import Profile = require("profileData");

@Injectable()
export class ProfileService {
    private dataUrl = 'http://localhost:9080/api/getProfile';

    constructor(private http: Http) { }

    getProfile() {
        return this.http.get(this.dataUrl)
            .map(res => <Profile>res.json())
            .catch(this.handleError);
    }
    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}