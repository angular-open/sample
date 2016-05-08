import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DelayService} from '../../../../service/delayService';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';

@Component({
    selector: 'Sign-In-View',
    templateUrl: '../app/component/home/login.component/signin/signin.html',
    styleUrls: ['../app/component/home/login.component/login.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class SignInComponent {
    @Input('signin') signIn: boolean;
    @Output('closesignin') closeSignIn = new EventEmitter();

    constructor(private delayAsyn: DelayService,
        private route: Router) {
    }
    
    closePanel(){
        this.closeSignIn.emit("event");
    }
}