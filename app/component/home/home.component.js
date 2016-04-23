System.register(['angular2/core', 'angular2/router', './modal/urlform.model', '../../service/delayService', '../../service/profileService/profileService', '../../shared/profile.storage'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, urlform_model_1, delayService_1, profileService_1, profile_storage_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (urlform_model_1_1) {
                urlform_model_1 = urlform_model_1_1;
            },
            function (delayService_1_1) {
                delayService_1 = delayService_1_1;
            },
            function (profileService_1_1) {
                profileService_1 = profileService_1_1;
            },
            function (profile_storage_1_1) {
                profile_storage_1 = profile_storage_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(delayAsyn, profileService, route, profileStorage) {
                    this.delayAsyn = delayAsyn;
                    this.profileService = profileService;
                    this.route = route;
                    this.profileStorage = profileStorage;
                    this.urlModel = new urlform_model_1.UrlForm("");
                    this.active = true;
                    this.errorMessage = "";
                }
                HomeComponent.prototype.ngOnInit = function () {
                };
                HomeComponent.prototype.addAndRemoveAnimation = function (classStatus, topElement, bottomElement, errorElement) {
                    console.log(classStatus);
                    if (topElement.classList.contains("add-info-up")) {
                        topElement.classList.remove("add-info-up");
                        topElement.classList.add("add-info-down");
                    }
                    else {
                        topElement.classList.remove("add-info-down");
                        topElement.classList.add("add-info-up");
                    }
                    if (bottomElement.classList.contains("add-info-down")) {
                        bottomElement.classList.remove("add-info-down");
                        bottomElement.classList.add("add-info-up");
                    }
                    else {
                        bottomElement.classList.remove("add-info-up");
                        bottomElement.classList.add("add-info-down");
                    }
                    this.errorMessage = "";
                    if (errorElement.classList.contains("error-message-show")) {
                        errorElement.classList.remove("error-message-show");
                    }
                };
                HomeComponent.prototype.onSubmit = function (formData, upProgressElement, downProgressElement, errorElement) {
                    var _this = this;
                    console.log(formData);
                    if (formData.infoURL.trim()) {
                        upProgressElement.classList.add("loading-progress-up");
                        downProgressElement.classList.add("loading-progress-down");
                        var self = this;
                        self.profileService.checkProfile(self.urlModel.infoURL.trim()).subscribe(function (data) { return self.SuccessOn(data, _this.route, _this.profileStorage, formData.infoURL.trim()); }, function (error) { return self.ErrorOn(error, _this.route, upProgressElement, downProgressElement, errorElement); });
                    }
                    else {
                        this.errorMessage = "Please write the url ...!";
                        if (errorElement.classList.contains("error-message-show")) {
                            errorElement.classList.remove("error-message-show");
                            errorElement.classList.add("error-message-show");
                        }
                        else {
                            errorElement.classList.add("error-message-show");
                        }
                    }
                };
                HomeComponent.prototype.SuccessOn = function (result, router, profileStorage, url) {
                    profileStorage.SetProfile(result);
                    router.navigate(['Profiler', { profileurl: url }]);
                };
                HomeComponent.prototype.ErrorOn = function (err, router, upProgressElement, downProgressElement, errorElement) {
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
                            }
                            else {
                                errorElement.classList.add("error-message-show");
                            }
                        }
                    }
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'Home-View',
                        templateUrl: '../app/component/home/home.html',
                        styleUrls: ['../app/component/home/home.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [delayService_1.DelayService, profileService_1.ProfileService, profile_storage_1.ProfileStorage]
                    }), 
                    __metadata('design:paramtypes', [delayService_1.DelayService, profileService_1.ProfileService, router_1.Router, profile_storage_1.ProfileStorage])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map