System.register(['angular2/core', 'angular2/router', './cards/cards.component', './titlewithtextarea/titlewithtextarea.component', './list/list.component', './listwithprogressbar/listwithprogressbar.component', '../../service/delayService', '../../service/profileService/profileService', '../../shared/profile.storage'], function(exports_1, context_1) {
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
    var core_1, router_1, cards_component_1, titlewithtextarea_component_1, list_component_1, listwithprogressbar_component_1, delayService_1, profileService_1, profile_storage_1;
    var ProfilerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cards_component_1_1) {
                cards_component_1 = cards_component_1_1;
            },
            function (titlewithtextarea_component_1_1) {
                titlewithtextarea_component_1 = titlewithtextarea_component_1_1;
            },
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            },
            function (listwithprogressbar_component_1_1) {
                listwithprogressbar_component_1 = listwithprogressbar_component_1_1;
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
            ProfilerComponent = (function () {
                function ProfilerComponent(_routeParams, delayAsyn, profileService, route, profileStorage) {
                    this._routeParams = _routeParams;
                    this.delayAsyn = delayAsyn;
                    this.profileService = profileService;
                    this.route = route;
                    this.profileStorage = profileStorage;
                    this.editStatus = false;
                }
                ProfilerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var self = this;
                    self.userUrl = self._routeParams.get('profileurl');
                    if (self._routeParams.get('edit')) {
                        var paramsValue = self._routeParams.get('edit');
                        self.editStatus = (paramsValue == "edit" || paramsValue == "create") ? true : false;
                    }
                    self.workExperienceTitle = "Work Experience";
                    self.educationTitle = "Education Value";
                    self.objectiveTitle = "Objective";
                    self.aboutTitle = "About";
                    self.knowledgeTitle = "Knowledge";
                    self.skillTitle = "Skill";
                    self.profileService.getProfile(self.userUrl).subscribe(function (data) { return self.SuccessOn(data); }, function (error) { return self.ErrorOn(error, _this.route); });
                };
                ProfilerComponent.prototype.SuccessOn = function (result) {
                    console.log(result);
                    this.expList = result.exprience;
                    this.eduList = result.education;
                    this.aboutMessage = result.about;
                    this.objectiveMessage = result.objective;
                    this.knowledgeList = result.knowledge;
                    this.skillList = result.skill;
                };
                ProfilerComponent.prototype.ErrorOn = function (err, router) {
                    var customError = err;
                    if (customError) {
                        if (customError && customError.status == "1020") {
                            router.navigate(["Home"]);
                        }
                    }
                };
                ProfilerComponent = __decorate([
                    core_1.Component({
                        templateUrl: '../app/component/profiler/profiler.html',
                        directives: [router_1.ROUTER_DIRECTIVES, cards_component_1.CardComponent, titlewithtextarea_component_1.TitleWithTextAreaComponent, list_component_1.ListComponent, listwithprogressbar_component_1.ListWithProgressComponent],
                        providers: [delayService_1.DelayService, profileService_1.ProfileService, profile_storage_1.ProfileStorage]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, delayService_1.DelayService, profileService_1.ProfileService, router_1.Router, profile_storage_1.ProfileStorage])
                ], ProfilerComponent);
                return ProfilerComponent;
            }());
            exports_1("ProfilerComponent", ProfilerComponent);
        }
    }
});
//# sourceMappingURL=profiler.component.js.map