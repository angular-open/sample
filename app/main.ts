import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {AppComponent} from './component/app/app.component';
import {HttpServices} from './service/httpServices';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(ROUTER_PROVIDERS, { useValue: '/' }),
    HttpServices,
]);