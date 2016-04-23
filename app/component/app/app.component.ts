import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '../home/home.component';
import {ProfilerComponent} from '../profiler/profiler.component';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
    selector: 'my-app',
    templateUrl: '../app/component/app/app.html', 
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/registration', name: 'Registration', component: RegistrationComponent },
    { path: '/profiler/:profileurl', name: 'Profiler', component: ProfilerComponent },
    { path: '/profiler/:profileurl/:edit', name: 'ProfilerEdit', component: ProfilerComponent }
])

export class AppComponent { }