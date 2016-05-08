import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DelayService} from '../../../service/delayService';

import Knowledge = require("knowledge");

@Component({
    selector: 'list-item',
    templateUrl: '../app/component/profiler/list/list.html',
    styleUrls: ['../app/component/profiler/list/list.css'],
    providers: [DelayService],
    directives: [ROUTER_DIRECTIVES]
})
export class ListComponent implements OnInit {
    @Input('cardEdit') cardEdit: boolean;
    @Input('listItem') listItem: Knowledge[];
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