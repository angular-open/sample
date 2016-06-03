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
    var TitleWithTextAreaComponent;
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
            TitleWithTextAreaComponent = (function () {
                function TitleWithTextAreaComponent(_routeParams, delayAsyn) {
                    this._routeParams = _routeParams;
                    this.delayAsyn = delayAsyn;
                }
                TitleWithTextAreaComponent.prototype.ngOnInit = function () {
                    var id = this._routeParams.get('profileurl');
                    console.log(id);
                };
                TitleWithTextAreaComponent.prototype.focusOn = function (elment) {
                    elment.focus();
                };
                __decorate([
                    core_1.Input('cardEdit'), 
                    __metadata('design:type', Boolean)
                ], TitleWithTextAreaComponent.prototype, "cardEdit", void 0);
                __decorate([
                    core_1.Input('cardMessage'), 
                    __metadata('design:type', String)
                ], TitleWithTextAreaComponent.prototype, "cardMessage", void 0);
                __decorate([
                    core_1.Input('cardTitle'), 
                    __metadata('design:type', String)
                ], TitleWithTextAreaComponent.prototype, "title", void 0);
                TitleWithTextAreaComponent = __decorate([
                    core_1.Component({
                        selector: 'titl-with-text-area',
                        templateUrl: '../app/component/profiler/titlewithtextarea/titlewithtextarea.html',
                        styleUrls: ['../app/component/profiler/titlewithtextarea/titlewithtextarea.css'],
                        providers: [delayService_1.DelayService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, delayService_1.DelayService])
                ], TitleWithTextAreaComponent);
                return TitleWithTextAreaComponent;
            }());
            exports_1("TitleWithTextAreaComponent", TitleWithTextAreaComponent);
        }
    }
});
//# sourceMappingURL=titlewithtextarea.js.map