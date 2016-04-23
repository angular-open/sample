import {Component, Injectable} from 'angular2/core';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {HttpServices} from '../httpServices';
import {User} from '../../modal/user.modal';
import 'rxjs/Rx';

@Component({
    providers: [HttpServices]
})

@Injectable()
export class UserService {
    private dataCreateUser = 'createUser';
   
    constructor(private httpServices: HttpServices) { }

    createUser(user: User) {
        var self = this;
        return self.httpServices.PostHttp(JSON.stringify(user), self.dataCreateUser).map(res => <User>res.json());
    }
  
}