import {Component, Input, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {DelayService} from '../../../service/delayService';

@Component({
    selector: 'titl-with-text-area',
    templateUrl: '../app/component/profiler/titlewithtextarea/titlewithtextarea.html',
    styleUrls: ['../app/component/profiler/titlewithtextarea/titlewithtextarea.css'],
    providers: [DelayService],
    directives: [ROUTER_DIRECTIVES]
})
export class TitleWithTextAreaComponent implements OnInit {
    @Input('cardEdit') cardEdit: boolean;
    @Input('cardMessage') cardMessage: string;
    @Input('cardTitle') title: string;

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