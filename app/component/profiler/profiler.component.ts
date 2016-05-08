import {Component, OnInit} from '@angular/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {CardComponent} from './cards/cards.component';
import {TitleWithTextAreaComponent} from './titlewithtextarea/titlewithtextarea.component';
import {ListComponent} from './list/list.component';
import {ListWithProgressComponent} from './listwithprogressbar/listwithprogressbar.component';
import {DelayService} from '../../service/delayService';
import {ProfileService} from '../../service/profileService/profileService';
import {ProfileStorage} from '../../shared/profile.storage';
import CardInfo = require("cardinfo");
import Profile = require("profileData");
import Knowledge = require("knowledge")

@Component({
    templateUrl: '../app/component/profiler/profiler.html',
    directives: [ROUTER_DIRECTIVES, CardComponent, TitleWithTextAreaComponent, ListComponent, ListWithProgressComponent],
    providers: [DelayService, ProfileService, ProfileStorage]
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
    private knowledgeTitle: string;
    private knowledgeList: Knowledge[];
    private skillTitle: string;
    private skillList: Skill[];

    constructor(private _routeParams: RouteParams,
        private delayAsyn: DelayService,
        private profileService: ProfileService,
        private route: Router,
        private profileStorage: ProfileStorage) {
    }

    ngOnInit() {
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
        self.profileService.getProfile(self.userUrl).subscribe(
            data => self.SuccessOn(data),
            error => self.ErrorOn(error, this.route));
    }

    public SuccessOn(result: Profile) {
        console.log(result);
        this.expList = result.exprience;
        this.eduList = result.education;
        this.aboutMessage = result.about;
        this.objectiveMessage = result.objective;
        this.knowledgeList = result.knowledge;
        this.skillList = result.skill;
    }

    public ErrorOn(err: any, router: Router) {
        var customError = err;
        if (customError) {
            if (customError && customError.status == "1020") {
                router.navigate(["Home"]);
            }
        }
    }
}