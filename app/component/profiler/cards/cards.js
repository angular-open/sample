System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var CardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            CardComponent = (function () {
                function CardComponent(_routeParams) {
                    this._routeParams = _routeParams;
                    this.cardEditUi = false;
                    this.editStatus = false;
                    this.cardInfo = {};
                    this.card = {};
                    this.year = [];
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
                CardComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('profileurl');
                    console.log(id);
                };
                CardComponent.prototype.OpenEdit = function () {
                    this.editStatus = this.editStatus ? false : true;
                    this.cardEditUi = this.cardEditUi ? false : true;
                };
                CardComponent.prototype.onSubmit = function (cardInfo) {
                    console.log(cardInfo);
                    var datas = {
                        year: {
                            from: cardInfo.from,
                            to: cardInfo.to
                        },
                        title: cardInfo.headingOne,
                        subTitle: cardInfo.headingTwo
                    };
                    this.arrayData.unshift(datas);
                    this.cardInfo = {
                        from: 0,
                        to: 0,
                        headingOne: "",
                        headingTwo: ""
                    };
                };
                CardComponent.prototype.onKey = function (event) {
                    return event;
                };
                CardComponent.prototype.selectionChange = function (e) {
                    console.log(e);
                    this.cardInfo = {
                        from: e.year.from,
                        to: e.year.to,
                        headingOne: e.title,
                        headingTwo: e.subTitle
                    };
                };
                __decorate([
                    core_1.Input('cardEdit'), 
                    __metadata('design:type', Boolean)
                ], CardComponent.prototype, "cardEdit", void 0);
                CardComponent = __decorate([
                    core_1.Component({
                        selector: 'card-with-title',
                        templateUrl: '../app/component/profiler/cards/cards.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], CardComponent);
                return CardComponent;
            }());
            exports_1("CardComponent", CardComponent);
        }
    }
});
//# sourceMappingURL=cards.js.map