import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {CardComponent} from './cards/cards';
import {TitleWithTextAreaComponent} from './titlewithtextarea/titlewithtextarea';
import {DelayService} from '../../service/delayService';
import {ProfileService} from '../../service/profileService/profileService';
import CardInfo = require("cardinfo");
import Profile = require("profileData");

@Component({
    templateUrl: '../app/component/profiler/profiler.html',
    directives: [ROUTER_DIRECTIVES, CardComponent, TitleWithTextAreaComponent],
    providers: [DelayService, ProfileService]
})

export class ProfilerComponent implements OnInit {
    private editStatus: boolean = false;
    private userUrl: string;
    private expList: CardInfo[];
    private eduList: CardInfo[];
    private profile: Profile[];
    private workExperienceTitle: string;
    private educationTitle: string;
    private aboutTitle: string;
    private aboutMessage: string;
    private objectiveTitle: string;
    private objectiveMessage: string;

    constructor(private _routeParams: RouteParams,
        private delayAsyn: DelayService,
        private profileService: ProfileService) {
    }

    ngOnInit() {
        var self = this;
        self.userUrl = self._routeParams.get('profileurl');

        if (self._routeParams.get('edit')) {
            self.editStatus = self._routeParams.get('edit') == "edit" ? true : false;
        }

        self.profileService.getProfile(self.userUrl).subscribe(
            data => self.successOn(data),
            error => console.log(error));

        self.workExperienceTitle = "Work Experience";
        self.educationTitle = "Education Value";
        self.objectiveTitle = "Objective";
        self.aboutTitle = "About";
    }

    public successOn(result: Profile) {
        this.expList = result.exprience;
        this.eduList = result.education;
        this.aboutMessage = result.about;
        this.objectiveMessage = result.objective;
    }
}