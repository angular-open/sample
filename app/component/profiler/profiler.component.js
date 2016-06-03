System.register(['angular2/core', 'angular2/router', './cards/cards', './titlewithtextarea/titlewithtextarea', '../../service/delayService', '../../service/profileService/profileService'], function(exports_1, context_1) {
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
    var core_1, router_1, cards_1, titlewithtextarea_1, delayService_1, profileService_1;
    var ProfilerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cards_1_1) {
                cards_1 = cards_1_1;
            },
            function (titlewithtextarea_1_1) {
                titlewithtextarea_1 = titlewithtextarea_1_1;
            },
            function (delayService_1_1) {
                delayService_1 = delayService_1_1;
            },
            function (profileService_1_1) {
                profileService_1 = profileService_1_1;
            }],
        execute: function() {
            ProfilerComponent = (function () {
                function ProfilerComponent(_routeParams, delayAsyn, profileService) {
                    this._routeParams = _routeParams;
                    this.delayAsyn = delayAsyn;
                    this.profileService = profileService;
                    this.editStatus = false;
                }
                ProfilerComponent.prototype.ngOnInit = function () {
                    var self = this;
                    self.userUrl = self._routeParams.get('profileurl');
                    if (self._routeParams.get('edit')) {
                        self.editStatus = self._routeParams.get('edit') == "edit" ? true : false;
                    }
                    self.profileService.getProfile(self.userUrl).subscribe(function (data) { return self.successOn(data); }, function (error) { return console.log(error); });
                    self.workExperienceTitle = "Work Experience";
                    self.educationTitle = "Education Value";
                    self.objectiveTitle = "Objective";
                    self.aboutTitle = "About";
                };
                ProfilerComponent.prototype.successOn = function (result) {
                    this.expList = result.exprience;
                    this.eduList = result.education;
                    this.aboutMessage = result.about;
                    this.objectiveMessage = result.objective;
                };
                ProfilerComponent = __decorate([
                    core_1.Component({
                        templateUrl: '../app/component/profiler/profiler.html',
                        directives: [router_1.ROUTER_DIRECTIVES, cards_1.CardComponent, titlewithtextarea_1.TitleWithTextAreaComponent],
                        providers: [delayService_1.DelayService, profileService_1.ProfileService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, delayService_1.DelayService, profileService_1.ProfileService])
                ], ProfilerComponent);
                return ProfilerComponent;
            }());
            exports_1("ProfilerComponent", ProfilerComponent);
        }
    }
});
//# sourceMappingURL=profiler.component.js.map