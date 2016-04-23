import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router, Location} from 'angular2/router';
import {UrlForm}    from './modal/urlform.model';
import {DelayService} from '../../service/delayService';
import {ProfileService} from '../../service/profileService/profileService';
import {ProfileStorage} from '../../shared/profile.storage';
import Profile = require("profileData");

@Component({
    selector: 'Home-View',
    templateUrl: '../app/component/home/home.html',
    styleUrls: ['../app/component/home/home.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [DelayService, ProfileService, ProfileStorage]
})

export class HomeComponent implements OnInit {
    private urlModel = new UrlForm("");
    private active = true;
    private errorMessage: string;


    constructor(private delayAsyn: DelayService,
        private profileService: ProfileService,
        private route: Router,
        private profileStorage: ProfileStorage) {
        this.errorMessage = "";
    }

    ngOnInit() {

    }

    private addAndRemoveAnimation(classStatus: boolean, topElement: any, bottomElement: any, errorElement: any) {
        console.log(classStatus);
        if (topElement.classList.contains("add-info-up")) {
            topElement.classList.remove("add-info-up");
            topElement.classList.add("add-info-down");
        } else {
            topElement.classList.remove("add-info-down");
            topElement.classList.add("add-info-up");
        }
        if (bottomElement.classList.contains("add-info-down")) {
            bottomElement.classList.remove("add-info-down");
            bottomElement.classList.add("add-info-up");
        } else {
            bottomElement.classList.remove("add-info-up");
            bottomElement.classList.add("add-info-down");
        }

        this.errorMessage = "";
        if (errorElement.classList.contains("error-message-show")) {
            errorElement.classList.remove("error-message-show");
        }
    }

    private onSubmit(formData: UrlForm, upProgressElement: any, downProgressElement: any, errorElement: any) {
        console.log(formData);
        if (formData.infoURL.trim()) {
            upProgressElement.classList.add("loading-progress-up");
            downProgressElement.classList.add("loading-progress-down");
            var self = this;
            self.profileService.checkProfile(self.urlModel.infoURL.trim()).subscribe(
                data => self.SuccessOn(data, this.route, this.profileStorage, formData.infoURL.trim()),
                error => self.ErrorOn(error, this.route, upProgressElement, downProgressElement, errorElement));
        } else {
            this.errorMessage = "Please write the url ...!";
            if (errorElement.classList.contains("error-message-show")) {
                errorElement.classList.remove("error-message-show");
                errorElement.classList.add("error-message-show");
            } else {
                errorElement.classList.add("error-message-show");
            }
        }
    }

    public SuccessOn(result: Profile, router: Router, profileStorage: ProfileStorage, url: string) {
        profileStorage.SetProfile(result);
        router.navigate(['Profiler', { profileurl: url }]);
    }

    public ErrorOn(err: any, router: Router, upProgressElement: any, downProgressElement: any, errorElement: any) {
        console.log(err);
        upProgressElement.classList.remove("loading-progress-up");
        downProgressElement.classList.remove("loading-progress-down");
        var customError = err;
        if (customError) {
            if (customError && customError.status == "1020") {
                this.errorMessage = "Create Url";
                if (errorElement.classList.contains("error-message-show")) {
                    errorElement.classList.remove("error-message-show");
                    errorElement.classList.add("error-message-show");
                } else {
                    errorElement.classList.add("error-message-show");
                }
            }
        }
    }

}