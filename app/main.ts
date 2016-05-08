import { bootstrap }    from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from './component/app/app.component';
import {HttpServices} from './service/httpServices';


bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(ROUTER_PROVIDERS, { useValue: '/' }), 
    HttpServices,
]);