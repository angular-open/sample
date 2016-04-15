import {Component, OnInit} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {CardComponent} from './cards/cards';

@Component({
    templateUrl: '../app/component/profiler/profiler.html',
    directives: [ROUTER_DIRECTIVES, CardComponent]
})
export class ProfilerComponent implements OnInit {
    private editStatus: boolean = false;
    private userUrl: string;

    constructor(private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.userUrl = this._routeParams.get('profileurl');
        if (this._routeParams.get('edit')) {
            this.editStatus = this._routeParams.get('edit') == "edit" ? true : false;
        }
        console.log(this.userUrl);
    }
}