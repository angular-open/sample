import {Component, Input, Output, EventEmitter} from 'angular2/core';
import { FORM_DIRECTIVES, NgControlGroup, Control, FormBuilder, ControlGroup, Validators, AbstractControl  } from 'angular2/common';
import {DelayService} from '../../../../service/delayService';
import {RouteConfig, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';
import {User} from '../../../../modal/user.modal';

@Component({
    selector: 'Sign-Up-View',
    templateUrl: '../app/component/home/login.component/signup/signup.html',
    styleUrls: ['../app/component/home/login.component/login.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class SignUpComponent {
    @Input('signup') signUp: boolean;
    @Output('closesignup') closeSignUp = new EventEmitter();
    @Output('createuser') createUser = new EventEmitter();
    private signUpForm: ControlGroup;
    private active: boolean = true;
    private controlsName: string[] = ["username", "email", "password", "conformpassword"];

    constructor(private delayAsyn: DelayService,
        private route: Router,
        builder: FormBuilder) {
        this.signUpForm = builder.group(
            {
                username: ["", Validators.required],
                email: ['', Validators.compose([Validators.required, this.emailValidator])],
                password: ["", Validators.required],
                conformpassword: ["", Validators.required]
            },
            {
                validator: this.matchingPasswords('password', 'conformpassword')
            });
    }

    closePanel(form: any) {
        this.controlsName.forEach(function (params: string) {
            let control = form.controls[params];
            if (control) {
                control.updateValue('');
            };
        });
        this.closeSignUp.emit("event");
    }

    onSubmit(form: any) {
        console.log("FORM", form.value);
        this.createUser.emit("event");
    }

    emailValidator(control: Control): { [key: string]: any } {
        var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control && "value" in control) {
            if (control.value && !emailRegexp.test(control.value)) {
                return { invalidEmail: true };
            }
        }
    }
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: ControlGroup): { [key: string]: any } => {
            if (group && "controls" in group) {
                let password = group.controls[passwordKey];
                let confirmPassword = group.controls[confirmPasswordKey];

                if (password && confirmPassword) {
                    if (password.value != confirmPassword.value) {
                        return {
                            mismatchedPasswords: true
                        };
                    }
                }
            }
        }
    }

}