import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';

import {AppComponent} from './component/app/app.component';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(ROUTER_PROVIDERS, { useValue: '/' }),
]);