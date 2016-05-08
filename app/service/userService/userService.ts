import {Component, Injectable} from '@angular/core';
import {Response} from '@angular/http';
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
    private dataLinkedIn = 'auth/google';
   
    constructor(private httpServices: HttpServices) { }

    createUser(user: User) {
        var self = this;
        return self.httpServices.PostHttp(JSON.stringify(user), self.dataCreateUser).map(res => <User>res.json());
    }
    
    linkedInUser() {
        var self = this;
        return self.httpServices.GetHttp(self.dataLinkedIn).map(res => res.json());
    }
  
}