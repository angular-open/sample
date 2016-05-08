import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

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
    { path: '/:profileurl', name: 'Profiler', component: ProfilerComponent },
    { path: '/:profileurl/:edit', name: 'ProfilerEdit', component: ProfilerComponent }
])

export class AppComponent { }