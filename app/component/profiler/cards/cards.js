System.register(['angular2/core', 'angular2/router', '../../../service/delayService'], function(exports_1, context_1) {
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
    var core_1, router_1, delayService_1;
    var CardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (delayService_1_1) {
                delayService_1 = delayService_1_1;
            }],
        execute: function() {
            CardComponent = (function () {
                function CardComponent(_routeParams, delayAsyn) {
                    this._routeParams = _routeParams;
                    this.delayAsyn = delayAsyn;
                    this.cardEditUi = false;
                    this.editStatus = false;
                    this.year = [];
                    this.editOpen = false;
                    this.today = new Date();
                }
                CardComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('profileurl');
                    console.log(id);
                    for (var i = 1930; i <= this.today.getFullYear() + 1; i++) {
                        this.year.push(i);
                    }
                };
                CardComponent.prototype.AddCard = function () {
                    if (this.cardArray.length > 0) {
                        this.cardArray[0].addAnim = false;
                    }
                    this.cardArray.forEach(function (element) {
                        element.removeAnim = false;
                    });
                    var card = {
                        from: 0,
                        to: 0,
                        title: "",
                        subTitle: "",
                        editInfo: true,
                        addAnim: true,
                        removeAnim: false
                    };
                    this.cardArray.unshift(card);
                };
                CardComponent.prototype.OpenEdit = function (event, model, editStatus) {
                    model.editInfo = editStatus;
                };
                CardComponent.prototype.DeleteCard = function (event, index, model) {
                    model.removeAnim = true;
                    var array = this.cardArray;
                    this.delayAsyn.Delay(300, function (i) {
                        array.splice(index, 1);
                        this.cardArray = array;
                    }, index);
                };
                __decorate([
                    core_1.Input('cardEdit'), 
                    __metadata('design:type', Boolean)
                ], CardComponent.prototype, "cardEdit", void 0);
                __decorate([
                    core_1.Input('cardArray'), 
                    __metadata('design:type', Array)
                ], CardComponent.prototype, "cardArray", void 0);
                __decorate([
                    core_1.Input('cardTitle'), 
                    __metadata('design:type', String)
                ], CardComponent.prototype, "title", void 0);
                CardComponent = __decorate([
                    core_1.Component({
                        selector: 'card-with-title',
                        templateUrl: '../app/component/profiler/cards/cards.html',
                        styleUrls: ['../app/component/profiler/cards/card.css'],
                        providers: [delayService_1.DelayService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, delayService_1.DelayService])
                ], CardComponent);
                return CardComponent;
            }());
            exports_1("CardComponent", CardComponent);
        }
    }
});
//# sourceMappingURL=cards.js.map