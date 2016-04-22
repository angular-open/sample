import {Component, Input, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {DelayService} from '../../../service/delayService';

import Skill = require("skill");

@Component({
    selector: 'list-item-with-progress',
    templateUrl: '../app/component/profiler/listwithprogressbar/listwithprogressbar.html',
    styleUrls: ['../app/component/profiler/listwithprogressbar/listwithprogressbar.css'],
    providers: [DelayService],
    directives: [ROUTER_DIRECTIVES]
})
export class ListWithProgressComponent implements OnInit {
    @Input('cardEdit') cardEdit: boolean;
    @Input('listItem') listItem: Skill[];
    @Input('listTitle') listTitle: string;

    constructor(private _routeParams: RouteParams, private delayAsyn: DelayService) {

    }

    ngOnInit() {
        let id = this._routeParams.get('profileurl');
        console.log(id);
    }
    
    private focusOn(elment){
        elment.focus();
    }

}