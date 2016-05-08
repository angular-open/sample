import {Component, Input} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {DelayService} from '../../../service/delayService';
import {SignInComponent} from './signin/signin.component';
import {SignUpComponent} from './signup/signup.component';
import {UserService} from '../../../service/userService/userService';
import {User} from '../../../modal/user.modal';


@Component({
    selector: 'Login-View',
    templateUrl: '../app/component/home/login.component/login.html',
    styleUrls: ['../app/component/home/login.component/login.css'],
    providers: [UserService],
    directives: [ROUTER_DIRECTIVES, SignInComponent, SignUpComponent]
})
export class LoginComponent {
    private signIn: boolean = false;
    private signUp: boolean = false;

    constructor(private delayAsyn: DelayService,
        private route: Router,
        private UserService: UserService) {
    }

    public CreateUser() {
        var self = this;
        //self.UserService.createUser();
    }

    public openSignIn(btnSignInSignUpPanel: any, signInSignUpContiner: any, signInPanel: any) {
        this.signIn = true;
        this.signUp = false;
        if (signInSignUpContiner.classList.contains("open-sing-in-up-panel")) {
            signInSignUpContiner.classList.remove("open-sing-in-up-panel");
        } else {
            signInSignUpContiner.classList.add("open-sing-in-up-panel");
        }

        if (btnSignInSignUpPanel.classList.contains("btn-sign-in-up-panel-close")) {
            btnSignInSignUpPanel.classList.remove("btn-sign-in-up-panel-close");
        } else {
            btnSignInSignUpPanel.classList.add("btn-sign-in-up-panel-close");
        }
    }

    public openSignUp(btnSignInSignUpPanel: any, signInSignUpContiner: any, signUpPanel: any, url: string) {
        var self = this;
        //var data = self.UserService.linkedInUser();
        window.addEventListener('message', function (e) {
            console.log(e);
            if (e.origin === 'http://localhost:9080') {
                console.log(e.data);
            }
        }, false);
        window.open(url, "_blank", "toolbar=No, scrollbars=No, resizable=yes, top=200, left=300, width=600, height=500");
        // this.signIn = false;
        // this.signUp = true;
        // if (signInSignUpContiner.classList.contains("open-sing-in-up-panel")) {
        //     signInSignUpContiner.classList.remove("open-sing-in-up-panel");
        // } else {
        //     signInSignUpContiner.classList.add("open-sing-in-up-panel");
        // }
        // if (btnSignInSignUpPanel.classList.contains("btn-sign-in-up-panel-close")) {
        //     btnSignInSignUpPanel.classList.remove("btn-sign-in-up-panel-close");
        // } else {
        //     btnSignInSignUpPanel.classList.add("btn-sign-in-up-panel-close");
        // }
    }

    public closePanel(btnSignInSignUpPanel: any, signInSignUpContiner: any, event: any) {
        console.log(event);
        if (btnSignInSignUpPanel.classList.contains("btn-sign-in-up-panel-close")) {
            btnSignInSignUpPanel.classList.remove("btn-sign-in-up-panel-close");
        } else {
            btnSignInSignUpPanel.classList.add("btn-sign-in-up-panel-close");
        }
        if (signInSignUpContiner.classList.contains("open-sing-in-up-panel")) {
            signInSignUpContiner.classList.remove("open-sing-in-up-panel");
        } else {
            signInSignUpContiner.classList.add("open-sing-in-up-panel");
        }
    }
}