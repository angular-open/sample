import {Component, Input, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import CardInfo = require("cardinfo");

@Component({
    selector: 'card-with-title',
    templateUrl: '../app/component/profiler/cards/cards.html',
    directives: [ROUTER_DIRECTIVES]
})
export class CardComponent implements OnInit {
    @Input('cardEdit') cardEdit: boolean;

    private cardEditUi: boolean = false;
    private title: string;
    private editStatus: boolean = false;
    private arrayData;
    private cardInfo = {};
    private card = {};
    private year = [];

    constructor(private _routeParams: RouteParams) {
        var today = new Date();
        for (var i = 1930; i <= today.getFullYear() + 1; i++) {
            this.year.push(i);
        }
        this.cardInfo = {
            from: 0,
            to: 0,
            headingOne: "",
            headingTwo: ""
        };

        this.title = "5 Years of Experience";
        this.arrayData = [
            {
                year: {
                    from: 2015,
                    to: 2016
                },
                title: "Senior web&ux Designer",
                subTitle: "Company name"
            },
            {
                year: {
                    from: 2016,
                    to: 2017
                },
                title: "Senior web&ux Designer",
                subTitle: "Company name"
            },
        ];
    }

    ngOnInit() {
        let id = this._routeParams.get('profileurl');
        console.log(id)
    }

    public OpenEdit() {
        this.editStatus = this.editStatus ? false : true;
        this.cardEditUi = this.cardEditUi ? false : true;
    }

    public onSubmit(cardInfo: CardInfo) {
        console.log(cardInfo);
        var datas = {
            year: {
                from: cardInfo.from,
                to: cardInfo.to
            },
            title: cardInfo.headingOne,
            subTitle: cardInfo.headingTwo
        }

        this.arrayData.unshift(datas);
        this.cardInfo = {
            from: 0,
            to: 0,
            headingOne: "",
            headingTwo: ""
        };
    }

    public onKey(event: any) {
        return event;
    }

    public selectionChange(e) {
        console.log(e);
        this.cardInfo = {
            from: e.year.from,
            to: e.year.to,
            headingOne: e.title,
            headingTwo: e.subTitle
        };
    }
}